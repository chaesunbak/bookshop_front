import { useLocation } from "react-router";
import { fetchBooks } from "../api/books.api";
import { QUERY_STRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ["books", location.search],
    queryFn: () =>
      fetchBooks({
        category_id: params.get(QUERY_STRING.CATEGORY_ID)
          ? Number(params.get(QUERY_STRING.CATEGORY_ID))
          : undefined,
        news: params.get(QUERY_STRING.NEWS) ? true : undefined,
        currentPage: params.get(QUERY_STRING.PAGE)
          ? Number(params.get(QUERY_STRING.PAGE))
          : 1,
        limit: LIMIT,
      }),
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
