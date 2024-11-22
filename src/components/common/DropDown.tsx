import styled from "styled-components";
import { useState, ReactNode, useRef, useEffect } from "react";

interface DropDownProps {
  children: ReactNode;
  toggleButton: ReactNode;
  isOpen?: boolean;
}

const DropDown = ({
  children,
  toggleButton,
  isOpen = false,
}: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <StyledDropDown $open={open} ref={dropdownRef}>
      <button
        className="toggle"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {toggleButton}
      </button>
      {open && <div className="pannel">{children}</div>}
    </StyledDropDown>
  );
};

interface StyledDropDownProps {
  $open: boolean;
}

const StyledDropDown = styled.div<StyledDropDownProps>`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) =>
        $open ? theme.colors.primary : theme.colors.text};
    }
  }

  .pannel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 1000;
  }
`;

export default DropDown;
