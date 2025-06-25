import { useEffect } from "react";

export function useDebounceCallback(callback: () => void, delay: number, deps: any[] = []) {
    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(handler);
    }, [delay, ...deps]);
}
