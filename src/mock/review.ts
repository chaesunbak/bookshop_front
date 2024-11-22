import { http, HttpResponse } from "msw";
import { BookReviewItem } from "@/models/book.model";
import { fakerKO as faker } from "@faker-js/faker";

const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, index) => {
    return {
      id: index,
      userName: `${faker.person.fullName()}`,
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      score: faker.number.int({ min: 1, max: 5 }),
    };
  }
);

export const reviewsById = http.get(
  "http://localhost:9999/reviews/:bookid",
  () => {
    return HttpResponse.json(mockReviewData, { status: 200 });
  }
);

export const addReview = http.post(
  "http://localhost:9999/reviews/:bookid",
  () => {
    return HttpResponse.json(
      { message: "리뷰가 등록되었습니다." },
      { status: 200 }
    );
  }
);

export const reviewForMain = http.get("http://localhost:9999/reviews", () => {
  return HttpResponse.json(mockReviewData, {
    status: 200,
  });
});