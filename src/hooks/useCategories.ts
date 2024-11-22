import { Category } from "../models/category.model";
import { useState, useEffect } from "react";
import { fetchCategories } from "../api/category.api";
import { useLocation } from "react-router";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();

  const setAcitve = () => {
    const params = new URLSearchParams(location.search);
    if (params.get("category_id")) {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.id === Number(params.get("category_id"))) {
            return { ...category, isActived: true };
          }
          return { ...category, isActived: false };
        })
      );
    } else {
      setCategories((prev) =>
        prev.map((category) => ({ ...category, isActived: false }))
      );
    }
  };

  useEffect(() => {
    fetchCategories().then((data) => {
      if (data === null) {
        return;
      }
      const categoryWithAll = [{ id: null, category_name: "전체" }, ...data];
      setCategories(categoryWithAll);
      setAcitve();
    });
  }, []);

  useEffect(() => {
    setAcitve();
  }, [location.search]);

  return { categories };
};
