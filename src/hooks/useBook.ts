import { useEffect, useState } from "react";
import { BookDetail, BookReviewItemWrite } from "../models/book.model";
import { fetchBook } from "../api/books.api";
import { likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { BookReviewItem } from "../models/book.model";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const [cartAdded, setCartAdded] = useState(false);
  const { showToast } = useToast();

  const toggleLike = () => {
    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) {
      return;
    }

    if (book.liked) {
      unlikeBook(book.id).then(() => {
        setBook({ ...book, liked: false, likes: book.likes - 1 });
        showToast("좋아요를 취소했습니다.");
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({ ...book, liked: true, likes: book.likes + 1 });
        showToast("좋아요를 눌렀습니다.");
      });
    }
  };

  useEffect(() => {
    if (!bookId) {
      return;
    }
    fetchBook(bookId).then((data) => {
      setBook(data);
    });

    fetchBookReview(bookId).then((data) => {
      setReviews(data);
    });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) {
      return;
    }

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((data) => {
      //   setReviews(data);
      // });
      showAlert(res?.message);
    });
  };

  const addToCart = (quantity: number) => {
    if (!book) {
      return;
    }
    addCart({
      bookId: book.id,
      amount: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  return { book, toggleLike, addToCart, cartAdded, reviews, addReview };
};
