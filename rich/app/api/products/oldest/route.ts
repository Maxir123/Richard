// app/api/products/oldest/route.ts
import { NextRequest, NextResponse } from "next/server";
import { listProducts } from "@/lib/paystack";

type MetadataObj = Record<string, unknown>;
type PaystackRaw = Record<string, unknown>;

/** Utilities (unchanged semantics, safer types) */
function readTotalFromMeta(meta: unknown): number | null {
  if (!meta || typeof meta !== "object") return null;
  const m = meta as Record<string, unknown>;
  const maybe = m.total ?? m.total_count ?? m.pagination ?? m.count ?? null;
  if (maybe == null && typeof m.pagination === "object" && m.pagination !== null) {
    const p = m.pagination as Record<string, unknown>;
    return (typeof p.total === "number" && p.total) || (typeof p.total_count === "number" && p.total_count) || null;
  }
  if (typeof maybe === "number") return maybe;
  if (typeof maybe === "string" && !Number.isNaN(Number(maybe))) return Number(maybe);
  return null;
}

function getString(val: unknown): string | null {
  return typeof val === "string" && val.trim() !== "" ? val : null;
}
function getArray(val: unknown): unknown[] | null {
  return Array.isArray(val) ? val : null;
}

function pickImageFromPaystackProduct(p: unknown): string | null {
  try {
    if (!p || typeof p !== "object") return null;
    const prod = p as PaystackRaw;

    let meta: MetadataObj = {};
    if (typeof prod.metadata === "string") {
      try {
        const parsed = JSON.parse(prod.metadata as string);
        if (parsed && typeof parsed === "object") meta = parsed as MetadataObj;
      } catch {
        meta = {};
      }
    } else if (typeof prod.metadata === "object" && prod.metadata !== null) {
      meta = prod.metadata as MetadataObj;
    }

    const metaImage = getString(meta.image);
    if (metaImage) return metaImage;

    const metaImages = getArray(meta.images);
    if (metaImages && metaImages.length > 0) {
      const first = metaImages[0];
      const s = getString(first);
      if (s) return s;
      if (first && typeof first === "object") {
        const f = first as Record<string, unknown>;
        const url = getString(f.url) ?? getString(f.path);
        if (url) return url;
      }
    }

    const metaFiles = getArray(meta.files);
    if (metaFiles && metaFiles.length > 0) {
      const f0 = metaFiles[0];
      if (f0 && typeof f0 === "object") {
        const fobj = f0 as Record<string, unknown>;
        const url = getString(fobj.url) ?? getString(fobj.path);
        if (url) return url;
      }
    }

    const prodImage = getString(prod.image);
    if (prodImage) return prodImage;

    const prodImages = getArray(prod.images);
    if (prodImages && prodImages.length > 0) {
      const first = prodImages[0];
      const s = getString(first);
      if (s) return s;
      if (first && typeof first === "object") {
        const f = first as Record<string, unknown>;
        const url = getString(f.url) ?? getString(f.path);
        if (url) return url;
      }
    }

    return null;
  } catch (err) {
    console.warn("pickImageFromPaystackProduct error:", err);
    return null;
  }
}

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null) {
    const maybe = (err as { message?: unknown }).message;
    if (typeof maybe === "string") return maybe;
    const resp = (err as unknown as { response?: unknown }).response;
    if (resp && typeof resp === "object") {
      const status = (resp as Record<string, unknown>).status;
      const data = (resp as Record<string, unknown>).data;
      if (typeof data === "object" && data !== null && "message" in (data as Record<string, unknown>)) {
        const dm = (data as Record<string, unknown>).message;
        if (typeof dm === "string") return dm;
      }
      if (typeof status === "number") return `HTTP error ${status}`;
    }
  }
  return "Failed to fetch oldest products";
}

/** Safely extract data array from various Paystack shapes */
function extractData(res: unknown): unknown[] {
  if (!res) return [];
  // If object with .data array
  if (typeof res === "object" && res !== null) {
    const r = res as Record<string, unknown>;
    if (Array.isArray(r.data)) return r.data as unknown[];
  }
  // If response itself is array
  if (Array.isArray(res)) return res as unknown[];
  return [];
}

/**
 * GET /api/products/oldest?count=3
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const count = Math.max(1, Number(url.searchParams.get("count") ?? 3));

    // Probe page 1 to try to read meta
    const probePerPage = 50;
    const probe = await listProducts({ perPage: probePerPage, page: 1 });

    const meta = (probe && typeof probe === "object")
      ? ((probe as Record<string, unknown>).meta ?? (probe as Record<string, unknown>).pagination ?? null)
      : null;

    const total = readTotalFromMeta(meta);

    let collected: unknown[] = [];

    if (typeof total === "number" && total > 0) {
      const perPage = probePerPage;
      const lastPage = Math.max(1, Math.ceil(total / perPage));
      let page = lastPage;
      while (page >= 1 && collected.length < count) {
        const res = page === 1 ? probe : await listProducts({ perPage, page });
        const arr = extractData(res);
        // Prepend because iterating from last page backward
        collected = [...arr, ...collected];
        page -= 1;
      }
    } else {
      // Fallback: try to get many items from first page and sort locally
      const fallbackPerPage = Math.max(count, 100);
      const res = await listProducts({ perPage: fallbackPerPage, page: 1 });
      const arr = extractData(res);
      collected = arr;
    }

    // normalize
    const normalized = collected.map((p) => {
      const obj = p && typeof p === "object" && p !== null ? (p as PaystackRaw) : {};
      const createdAt = obj.createdAt ?? obj.created_at ?? null;
      return {
        raw: obj,
        id: obj.id ?? null,
        name: obj.name ?? null,
        description: obj.description ?? null,
        price:
          typeof obj.price === "number"
            ? obj.price
            : (typeof obj.price === "string" && !Number.isNaN(Number(obj.price)) ? Number(obj.price) : null),
        currency: typeof obj.currency === "string" ? obj.currency : "NGN",
        image: pickImageFromPaystackProduct(obj),
        metadata: obj.metadata ?? null,
        createdAt,
      };
    });

    const hasCreatedAt = normalized.some((x) => x.createdAt != null);
    const sorted = hasCreatedAt
      ? normalized
          .filter((x) => x.createdAt != null)
          .sort((a, b) => {
            const da = new Date(String(a.createdAt)).getTime();
            const db = new Date(String(b.createdAt)).getTime();
            return da - db;
          })
      : normalized;

    const oldest = sorted.slice(0, count).map((x) => ({
      id: x.id,
      name: x.name,
      description: x.description,
      price: x.price,
      currency: x.currency,
      image: x.image,
      metadata: x.metadata,
      createdAt: x.createdAt,
    }));

    return NextResponse.json({ success: true, products: oldest });
  } catch (err: unknown) {
    console.error("GET /api/products/oldest error:", getErrorMessage(err));
    const message = getErrorMessage(err);
    const status = (() => {
      if (typeof err === "object" && err !== null) {
        const resp = (err as Record<string, unknown>).response;
        if (resp && typeof resp === "object" && typeof (resp as Record<string, unknown>).status === "number") {
          return (resp as Record<string, unknown>).status as number;
        }
      }
      return 500;
    })();
    return NextResponse.json({ success: false, message }, { status });
  }
}
