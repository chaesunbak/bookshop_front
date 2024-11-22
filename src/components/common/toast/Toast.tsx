import styled from "styled-components";
import { ToastItem } from "@/store/toastStore";
import { FaPlus, FaBan, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import useToastStore from "@/store/toastStore";
import useTimeout from "@/hooks/useTimeout";
import { set } from "react-hook-form";

export const TOAST_REMOVE_DELAY = 3000;

const Toast = ({ id, message, type }: ToastItem) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState<boolean>();
  const handleRemoveToast = (id: number) => {
    setIsFadingOut(true);
    removeToast(id);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       handleRemoveToast(id);
  //     }, TOAST_REMOVE_DELAY);

  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }, []);

  useTimeout(() => {
    setIsFadingOut(true);
  }, TOAST_REMOVE_DELAY);

  return (
    <StyledToast
      className={isFadingOut ? "fade-out" : "fade-in"}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>
        {type === "info" && <FaInfoCircle />}
        {type === "error" && <FaBan />}
      </p>
      <button
        onClick={() => {
          handleRemoveToast(id);
        }}
      >
        <FaPlus />
      </button>
      <p>{message}</p>
    </StyledToast>
  );
};

const StyledToast = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  background-color: ${({ theme }) => theme.colors.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1;
    margin: 0;
    flex: 1;
    display: flex;
  }

  button {
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};

    svg {
      transform: rotate(45deg);
    }
  }
`;

export default Toast;
