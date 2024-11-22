import { useCallback } from "react";

export const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    window.alert(message);
  }, []);

  const showConfirm = useCallback((message: string, onConfrim: () => void) => {
    if (window.confirm(message)) {
      onConfrim();
    }
  }, []);

  return { showAlert, showConfirm };
};
