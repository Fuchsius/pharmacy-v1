export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockCount: number;
  categoryId: number;
  brand: string;
  discount?: number;
  productImages: Array<{
    id: number;
    imageUrl: string;
  }>;
  category: {
    id: number;
    name: string;
  };
};

// DTO for creating a product
export type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  stockCount: number;
  categoryId: number;
  brand: string;
  discount?: number;
};

// Form data including image
export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stockCount: number;
  categoryId: number;
  brand: string;
  discount?: number;
  imageUrl?: string;
};
