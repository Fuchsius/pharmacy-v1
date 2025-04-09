export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  discount: number;
  rating: number;
  stockCount: number;
  categoryId: number;
  badges: string[];
};

export type ProductFormData = Omit<Product, "id" | "rating"> & {
  imageUrl?: string;
};
