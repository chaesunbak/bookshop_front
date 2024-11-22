import { httpClient } from "./http";
import { Category } from "../models/category.model";

export const fetchCategories = async () => {
  const response = await httpClient.get<Category[]>("/api/categories");
  return response.data;
};
