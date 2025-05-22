import { useEffect, useState } from "react";

export function useIsMobile(query = 768) {
  const maxWidth = '(max-width:' + String(query) +'px)'

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(maxWidth).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(maxWidth);

    const updateIsMobile = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Initial check in case it changed before the effect ran
    setIsMobile(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateIsMobile);
    return () => mediaQueryList.removeEventListener("change", updateIsMobile);
  }, [maxWidth]);

  return isMobile;
}
