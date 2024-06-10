import Category from "../types/Category";
import api from "./api";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};
