import dayjs from "dayjs";

export const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR") + "원";
};

export const formatDate = (date: string, format?: string) => {
  return dayjs(date).format(format ? format : "YYYY년 MM월 DD일");
};
