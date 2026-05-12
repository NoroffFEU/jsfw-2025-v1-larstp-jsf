export type ProductReview = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number | null;
  image: ProductImage;
  rating: number;
  tags: string[];
  reviews: ProductReview[];
};

export type ProductListQuery = {
  limit?: number;
  page?: number;
  sort?: keyof Product;
  sortOrder?: "asc" | "desc";
};
