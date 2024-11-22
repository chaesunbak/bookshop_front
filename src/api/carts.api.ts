import { httpClient } from "./http";
import { Cart } from "../models/cart.model";

interface Params {
  bookId: number;
  amount: number;
}

export const addCart = async (params: Params) => {
  const response = await httpClient.post("/api/carts", params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>("/api/carts");
  return response.data;
};

export const deleteCart = async (id: number) => {
  const response = await httpClient.delete(`/api/carts/${id}`);
  return response.data;
};
