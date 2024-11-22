import { forwardRef, ForwardedRef } from "react";
import styled from "styled-components";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: "text" | "eamil" | "password" | "number";
}

const InputText = forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: InputTextProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyled
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyled = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export default InputText;
