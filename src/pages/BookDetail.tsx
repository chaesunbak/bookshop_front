import { useParams } from "react-router";
import styled from "styled-components";
import { useBook } from "../hooks/useBook";
import { getImgSrc } from "../utils/image";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatPrice, formatDate } from "../utils/format";
import { Link } from "react-router-dom";
import EllipsisBox from "../components/common/EllipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToCart from "../components/book/AddToCart";
import { Tabs, Tab } from "@/components/common/Tabs";
import BookReview from "@/components/book/BookReview";
import Modal from "@/components/common/Modal";
import { useState } from "react";

const BookInfoList = [
  {
    label: "카테고리",
    key: "category_name",
    filter: (book: IBookDetail) => {
      return (
        <Link to={`/books?categoty_id=${book.category_id}`}>
          {book.category_name}
        </Link>
      );
    },
  },
  {
    label: "포맷",
    key: "form",
  },
  {
    label: "페이지",
    key: "pages",
  },
  {
    label: "ISBN",
    key: "isbn",
  },
  {
    label: "페이지",
    key: "pages",
  },
  {
    label: "ISBN",
    key: "isbn",
  },
  {
    label: "출간일",
    key: "pubDate",
    filter: (book: IBookDetail) => {
      return formatDate(book.pubDate);
    },
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return formatPrice(book.price);
    },
  },
];

function BookDetail() {
  const { bookId } = useParams();
  const { book, toggleLike, reviews, addReview } = useBook(bookId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!book) {
    return null;
  }
  return (
    <StyledBookDetail>
      <header className="header">
        <div className="img" onClick={() => setIsModalOpen(true)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <img src={getImgSrc(book.img)} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {BookInfoList.map((item) => (
            <dl>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeButton book={book} onClick={toggleLike} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium" color="text">
              상세 설명
            </Title>
            <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium" color="text">
              목차
            </Title>
            <p className="index">{book.contents}</p>
          </Tab>
          <Tab title="리뷰">
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </StyledBookDetail>
  );
}

const StyledBookDetail = styled.div`
  .header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1%;

      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.colors.secondary};
        }
        a {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  .content {
  }
`;

export default BookDetail;
