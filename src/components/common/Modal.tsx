import styled from "styled-components";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const handleClose = () => {
    setIsFadingOut(true);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <StyledModal
        onClick={handleOverlayClick}
        className={isFadingOut ? "fade-out" : "fade-in"}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="modal-body" ref={modalRef}>
          <div className="modal-content">{children}</div>
          <button className="modal-close" onClick={handleClose}>
            <FaPlus />
          </button>
        </div>
      </StyledModal>
    </>,
    document.body
  );
};

const StyledModal = styled.div`
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

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    padding: 65px 32px 32px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    max-width: 80%;
  }

  .modal-close {
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;

    svg {
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export default Modal;
