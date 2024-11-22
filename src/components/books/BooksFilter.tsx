import styled from "styled-components";
import { useCategories } from "../../hooks/useCategories";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERY_STRING } from "../../constants/queryString";

const BooksFilter = () => {
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryClick = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete(QUERY_STRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERY_STRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNewClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get(QUERY_STRING.NEWS)) {
      newSearchParams.delete(QUERY_STRING.NEWS);
    } else {
      newSearchParams.set(QUERY_STRING.NEWS, "true");
    }

    setSearchParams(newSearchParams);
  };

  return (
    <StyledBooksFilter>
      <div className="category">
        {categories.map((category) => (
          <Button
            size="medium"
            scheme={category.isActived ? "primary" : "normal"}
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get(QUERY_STRING.NEWS) ? "primary" : "normal"}
          onClick={() => {
            handleNewClick();
          }}
        >
          신간
        </Button>
      </div>
    </StyledBooksFilter>
  );
};

const StyledBooksFilter = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
