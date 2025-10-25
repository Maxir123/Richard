// utils/paystack.ts
export function extractImageFromProduct(product: any, metadata: any): string | null {
  try {
    // 1. product.files (Paystack)
    if (Array.isArray(product.files) && product.files.length > 0) {
      for (let file of product.files) {
        if (file?.type === "image" && file?.path) return file.path;
        if (file?.path) return file.path;
        if (file?.url) return file.url;
      }
    }

    // 2. product.images
    if (Array.isArray(product.images) && product.images.length > 0) {
      for (let img of product.images) {
        if (typeof img === "string" && img.trim()) return img;
        if (img?.url) return img.url;
        if (img?.path) return img.path;
      }
    }

    // 3. product.image
    if (product.image && typeof product.image === "string" && product.image.trim()) return product.image;

    // 4. metadata.files / metadata.images / metadata.image
    if (metadata) {
      if (Array.isArray(metadata.files)) {
        for (const f of metadata.files) {
          if (f?.path) return f.path;
          if (f?.url) return f.url;
        }
      }
      if (Array.isArray(metadata.images)) {
        for (const img of metadata.images) {
          if (typeof img === "string") return img;
          if (img?.url) return img.url;
        }
      }
      if (metadata.image && typeof metadata.image === "string") return metadata.image;
    }

    // 5. fallback fields
    const alt = metadata?.photo || metadata?.picture || metadata?.thumbnail || metadata?.img || metadata?.product_image;
    if (typeof alt === "string" && alt.trim()) return alt;

    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("extractImageFromProduct error:", err);
    return null;
  }
}
