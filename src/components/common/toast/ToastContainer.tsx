import styled from "styled-components";
import useToastStore from "@/store/toastStore";
import Toast from "./Toast";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <StyledToastContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </StyledToastContainer>
  );
};

const StyledToastContainer = styled.div`
  position: fixed;
  top: 32px;
  right: 24px;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default ToastContainer;
