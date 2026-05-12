import { request, type ApiResponse } from "./api";
import type { Product, ProductListQuery } from "../types/product";

export async function getProducts(query?: ProductListQuery) {
  return request<ApiResponse<Product[]>>("/online-shop", {}, query);
}

export async function getProductById(id: string) {
  return request<ApiResponse<Product>>(`/online-shop/${id}`);
}
