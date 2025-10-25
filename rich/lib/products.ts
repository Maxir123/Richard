// lib/products.ts
export type Category = "new-drop" | "boys" | "girls" | "sale";

export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[]; // multiple images recommended
  image: string; // primary image (legacy)
  category: Category;
  tag?: string;
  description?: string;
  sku?: string;
  sizes?: string[];
  colors?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "rv-jacket-001",
    name: "Richview Alt Cowboy Jacket",
    price: 28000,
    images: ["/Post1.jpg", "/Post1-2.jpg"],
    image: "/Post1.jpg",
    category: "new-drop",
    tag: "Limited",
    description: "Bold silhouette with premium hardware and contrast stitching.",
    sku: "RV-JKT-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
  },
  {
    id: "rv-jeans-002",
    name: "Richview Baggy Jeans",
    price: 15000,
    images: ["/Post2.jpg"],
    image: "/Post2.jpg",
    category: "boys",
    tag: "Best-seller",
    description: "Relaxed fit with a modern wash and reinforced seams.",
    sku: "RV-JNS-002",
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: "rv-top-003",
    name: "Futuristic Tee",
    price: 9000,
    images: ["/Post3.jpg"],
    image: "/Post3.jpg",
    category: "girls",
    description: "Soft cotton with printed logo.",
    sku: "RV-TEE-003",
    sizes: ["XS", "S", "M"],
  },
  {
    id: "rv-jacket-004",
    name: "Street Denim Jacket",
    price: 32000,
    images: ["/Post4.jpg"],
    image: "/Post4.jpg",
    category: "sale",
    tag: "Sale",
    description: "Vintage wash, limited stock.",
    sku: "RV-DEN-004",
    sizes: ["M", "L", "XL"],
  },
  // add more...
];


export function getProductsByCategory(cat: Category) {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}
