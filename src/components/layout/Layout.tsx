import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <StyledLayout>{children}</StyledLayout>
      <Footer />
    </>
  );
};

const StyledLayout = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;

export default Layout;
