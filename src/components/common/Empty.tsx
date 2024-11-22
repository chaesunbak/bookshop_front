import styled from "styled-components";
import Title from "../common/Title";
import { ReactNode } from "react";

interface EmptyProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
}

const Empty = ({ icon, title, description }: EmptyProps) => {
  return (
    <StyledEmpty>
      {icon && <div className="icon">{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </StyledEmpty>
  );
};

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      color: #ccc;
    }
  }
`;

export default Empty;
