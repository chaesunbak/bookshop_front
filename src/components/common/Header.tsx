import styled from "styled-components";
import ThemeSwitcher from "../header/ThemeSwitcher";
import Logo from "../../assets/images/logo.webp";
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaShoppingCart,
  FaListUl,
  FaBars,
  FaAngleRight,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { useAuthStore } from "../../store/authStore";
import DropDown from "./DropDown";
import { useState } from "react";

const Header = () => {
  const { categories } = useCategories();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const [isMoblieOpen, setIsMobileOpen] = useState(false);
  return (
    <StyledHeader $isOpen={isMoblieOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={Logo} alt="Book Store 로고" />
        </Link>
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => {
            setIsMobileOpen(!isMoblieOpen);
          }}
        >
          {isMoblieOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <Link
                  to={
                    category.id === null
                      ? "/books"
                      : `/books?category_id=${category.id}`
                  }
                >
                  {category.category_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="auth">
        <DropDown toggleButton={<FaUserCircle />}>
          <>
            {isLoggedIn && (
              <ul>
                <li>
                  <FaShoppingCart />
                  <Link to="/cart">장바구니</Link>
                </li>
                <li>
                  <FaListUl />
                  <Link to="/orderlist">주문내역</Link>
                </li>
                <li>
                  <FiLogOut />
                  <button
                    onClick={() => {
                      storeLogout();
                    }}
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>
                  <FaSignInAlt />
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <FaRegUser />
                  <Link to="/signup">회원가입</Link>
                </li>
              </ul>
            )}
            <ThemeSwitcher />
          </>
        </DropDown>
      </nav>
    </StyledHeader>
  );
};

interface StyledHeaderProps {
  $isOpen: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.colors.text};

          &:hover {
            color: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;

      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;

      img {
        width: 140px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 14px;
        right: ${({ $isOpen }) => ($isOpen ? "62%" : "52px")};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;
      }
    }
  }
`;

export default Header;
