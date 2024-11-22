import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import useCart from "../hooks/useCart";
import { useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import { useMemo } from "react";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, isEmpty, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  console.log(cart);

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (checkedItems.includes(item.id)) {
        return acc + item.amount;
      }
      return acc;
    }, 0);
  }, [cart, checkedItems]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (checkedItems.includes(item.id)) {
        return acc + item.price * item.amount;
      }
      return acc;
    }, 0);
  }, [cart, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해주세요.");
      return;
    }

    const orderDate: Omit<OrderSheet, "delivery"> = {
      items: checkedItems,
      totalQuantity,
      totalPrice,
      firstBookTitle: cart[0].title,
    };

    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", {
        state: orderDate,
      });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <StyledCart>
        {isEmpty ? (
          <Empty
            title="장바구니가 비었습니다."
            icon={<FaShoppingCart />}
            description={<p>장바구니를 채워보세요.</p>}
          />
        ) : (
          <>
            <div className="content">
              {cart.map((cart) => (
                <CartItem
                  key={cart.id}
                  cart={cart}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
              />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
      </StyledCart>
    </>
  );
};

export const StyledCart = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0%;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;

        input {
          width: 100%;
        }
      }
    }
    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart;
