import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import { FaHeart } from "react-icons/fa";
import Button from "../common/Button";

interface LikeButtonProps {
  book: BookDetail;
  onClick: () => void;
}

const LikeButton = ({ book, onClick }: LikeButtonProps) => {
  return (
    <StyledLikeButton
      size="medium"
      scheme={book.liked ? "like" : "normal"}
      onClick={onClick}
    >
      <FaHeart />
      <span>{book.likes}</span>
    </StyledLikeButton>
  );
};

const StyledLikeButton = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;

    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
