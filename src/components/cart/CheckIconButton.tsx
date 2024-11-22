import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

interface CheckIconButtonProps {
  isChecked: boolean;
  onCheck: () => void;
}

const CheckIconButton = ({ isChecked, onCheck }: CheckIconButtonProps) => {
  return (
    <StyledCheckIconButton onCheck={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </StyledCheckIconButton>
  );
};

interface StyledCheckIconButtonProps {
  onCheck: () => void;
}

const StyledCheckIconButton = styled.button<StyledCheckIconButtonProps>`
  background: none;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconButton;
