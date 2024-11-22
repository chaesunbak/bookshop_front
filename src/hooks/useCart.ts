import { fetchCart } from "../api/carts.api";
import { Cart } from "../models/cart.model";
import { useState, useEffect } from "react";
import { deleteCart } from "../api/carts.api";

const useCart = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then((data) => {
      setCart(cart.filter((cart) => cart.id !== id));
      setIsEmpty(cart.length === 1);
    });
  };

  useEffect(() => {
    fetchCart().then((data) => {
      setCart(data);
      setIsEmpty(data.length === 0);
    });
  }, []);

  return { cart, isEmpty, deleteCartItem };
};

export default useCart;
