import React, { createContext, useContext, useState, ReactNode } from "react";
import Category from "../types/Category";
import { getAllCategories } from "../services/category";

interface CategoryContextProps {
  categories: Category[];
  getAllCategories: () => Promise<void>;
  loadingCategories: boolean;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const handleGetAllCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getAllCategories: handleGetAllCategories,
        loadingCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
