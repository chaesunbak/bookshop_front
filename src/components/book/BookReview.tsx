import styled from "styled-components";
import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from "@/models/book.model";
import BookReviewItem from "./BookReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface BookReviewProps {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd }: BookReviewProps) => {
  return (
    <StyledBookReview>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => {
        return <BookReviewItem review={review} key={review.id} />;
      })}
    </StyledBookReview>
  );
};

const StyledBookReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
