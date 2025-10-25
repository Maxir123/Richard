// lib/paystack-server.ts
import { paystackClient } from "./paystack"; // your axios client in lib/paystack.ts
// or import your fetchProduct helper if you already have one

type PaystackProduct = {
  id: string | number;
  name: string;
  description?: string;
  price?: number | null;
  currency?: string | null;
  metadata?: any;
  image?: string | null;
  images?: string[] | null;
  // ...other paystack fields
};

function pickImageFromPaystackProduct(p: any): string | null {
  try {
    if (!p) return null;
    const meta = typeof p.metadata === "string" ? JSON.parse(p.metadata || "{}") : (p.metadata ?? {});

    if (meta?.image && typeof meta.image === "string") return meta.image;
    if (Array.isArray(meta?.images) && meta.images.length > 0) {
      const first = meta.images[0];
      if (typeof first === "string") return first;
      if (first?.url && typeof first.url === "string") return first.url;
    }
    if (p.image && typeof p.image === "string") return p.image;
    if (Array.isArray(p.images) && p.images.length > 0) {
      const first = p.images[0];
      if (typeof first === "string") return first;
      if (first?.url && typeof first.url === "string") return first.url;
    }
    if (Array.isArray(meta?.files) && meta.files.length > 0) {
      const f0 = meta.files[0];
      if (f0?.url && typeof f0.url === "string") return f0.url;
    }
    return null;
  } catch (e) {
    console.warn("pickImageFromPaystackProduct error:", e);
    return null;
  }
}

/**
 * Fetch a single product from Paystack and map to the UI product shape
 */
export async function getProductById(id: string) {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    console.warn("Missing PAYSTACK_SECRET_KEY");
    return null;
  }

  try {
    // Paystack product endpoint: GET /product/:id
    const res = await paystackClient.get(`/product/${id}`);

    // Paystack returns res.data.data (the product)
    const p: PaystackProduct = res.data?.data;
    if (!p) return null;

    const image = pickImageFromPaystackProduct(p);

    return {
      id: p.id,
      name: p.name,
      description: p.description ?? null,
      price: typeof p.price === "number" ? p.price : null, // subunit (kobo)
      currency: p.currency ?? "NGN",
      metadata: p.metadata ?? null,
      images: p.images ?? (p.metadata?.images ?? null),
      image,
      // if you need sizes/colors/sku/tag, you can try reading from metadata here
      // e.g. sizes: p.metadata?.sizes ?? null
    };
  } catch (err: any) {
    console.error("getProductById error:", err?.response?.data ?? err?.message ?? err);
    // If Paystack responds 404, return null so page shows notFound()
    return null;
  }
}
