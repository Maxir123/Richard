// lib/paystack-utils.ts
export function pickImageFromPaystackProduct(p: any): string | null {
  if (!p) return null;

  // metadata may be stringified JSON or an object
  let meta: any = p.metadata ?? {};
  if (typeof meta === "string") {
    try {
      meta = JSON.parse(meta);
    } catch {
      meta = {};
    }
  }

  // 1) metadata.image (string)
  if (meta?.image && typeof meta.image === "string" && isValidHttpUrl(meta.image)) {
    return meta.image;
  }

  // 2) metadata.images (array) — accept strings or objects with url
  if (Array.isArray(meta?.images) && meta.images.length > 0) {
    const candidate = meta.images[0];
    if (typeof candidate === "string" && isValidHttpUrl(candidate)) return candidate;
    if (candidate?.url && typeof candidate.url === "string" && isValidHttpUrl(candidate.url)) return candidate.url;
  }

  // 3) top-level product.image (string)
  if (p.image && typeof p.image === "string" && isValidHttpUrl(p.image)) {
    return p.image;
  }

  // 4) top-level product.images (array)
  if (Array.isArray(p.images) && p.images.length > 0) {
    const candidate = p.images[0];
    if (typeof candidate === "string" && isValidHttpUrl(candidate)) return candidate;
    if (candidate?.url && typeof candidate.url === "string" && isValidHttpUrl(candidate.url)) return candidate.url;
  }

  // 5) metadata.files (array of objects with url)
  if (Array.isArray(meta?.files) && meta.files.length > 0) {
    const f = meta.files[0];
    if (f?.url && typeof f.url === "string" && isValidHttpUrl(f.url)) return f.url;
  }

  // fallback
  return null;
}

function isValidHttpUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
