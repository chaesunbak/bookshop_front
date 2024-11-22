import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileQuery = window.matchMedia("(max-width: 768px)");

    setIsMobile(isMobileQuery.matches);
  }, []);

  return { isMobile };
};
