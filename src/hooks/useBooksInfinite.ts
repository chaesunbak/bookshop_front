import { useLocation } from "react-router";
import { fetchBooks } from "../api/books.api";
import { QUERY_STRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const category_id = params.get(QUERY_STRING.CATEGORY_ID)
      ? Number(params.get(QUERY_STRING.CATEGORY_ID))
      : undefined;
    const news = params.get(QUERY_STRING.NEWS) ? true : undefined;
    const limit = LIMIT;
    const currentPage = pageParam;

    return fetchBooks({
      category_id,
      news,
      limit,
      currentPage,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["books", location.search],
    queryFn: ({ pageParam = 1 }) => getBooks({ pageParam }),
    getNextPageParam: (lastPage) => {
      const isLastPage =
        Math.ceil(lastPage.pagination.totalCount / LIMIT) ===
        lastPage.pagination.currentPage;
      return isLastPage ? null : lastPage.pagination.currentPage + 1;
    },
    initialPageParam: 1,
  });

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
