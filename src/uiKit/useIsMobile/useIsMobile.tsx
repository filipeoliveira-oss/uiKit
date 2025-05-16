import { useEffect, useState } from "react";

export function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    const updateIsMobile = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Initial check in case it changed before the effect ran
    setIsMobile(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateIsMobile);
    return () => mediaQueryList.removeEventListener("change", updateIsMobile);
  }, [query]);

  return isMobile;
}
