import { useEffect, useState } from "react";
import { OrderListItem } from "../models/order.model";
import { fetchOrders, fetchOrder } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((data) => setOrders(data));
  }, []);

  const selectOrderItem = (id: number) => {
    if (orders.filter((order) => order.id === id)[0].detail) {
      setSelectedItemId(id);
      return;
    }
    fetchOrder(id).then((orderDetail) => {
      setSelectedItemId(id);
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, orderDetail } : order
        )
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
