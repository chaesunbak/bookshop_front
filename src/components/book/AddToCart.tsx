import styled from "styled-components";
import { Book } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface AddToCartProps {
  book: Book;
}

const AddToCart = ({ book }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <StyledAddToCart $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
          inputMode="numeric"
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => {
          addToCart(book.id);
        }}
      >
        장바구니 담기
      </Button>

      {cartAdded && (
        <div className="added">
          <p>장바구니에 추가되었습니다.</p>
          <Link to="/cart">장바구니로 이동</Link>
        </div>
      )}
    </StyledAddToCart>
  );
};

interface StyledAddToCartProps {
  $added: boolean;
}

const StyledAddToCart = styled.div<StyledAddToCartProps>`
  display: flex;

  justify-content: space-between;
  align-items: center;

  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 16px;
    opacity: ${({ $added }) => ($added ? 1 : 0)};
    transition: all 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddToCart;
