import { requestHandler } from "./http";
import { Order, OrderSheet, OrderDetailItem } from "../models/order.model";

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>("post", "/api/orders", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler<Order[]>("get", "/api/orders");
};

export const fetchOrder = async (id: number) => {
  return await requestHandler<OrderDetailItem[]>("get", `/api/orders/${id}`);
};
