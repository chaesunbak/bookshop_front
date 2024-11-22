import { httpClient } from "./http";
import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";

interface FetchBookParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBookResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBookParams) => {
  try {
    const response = await httpClient.get<FetchBookResponse>("/api/books", {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/api/books/${bookId}`);
  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post<BookDetail>(`/api/likes/${bookId}`);
  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete<BookDetail>(`/api/likes/${bookId}`);
  return response.data;
};

export const fetchBestBooks = async () => {
  const response = await httpClient.get<Book[]>(`/books/best`);
  return response.data;
};
