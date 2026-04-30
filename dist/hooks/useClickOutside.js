import { useEffect } from "react";
export function useClickOutside(ref, onClickOutside, enabled = true) {
    useEffect(() => {
        if (!enabled)
            return;
        function handleMouseDown(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                onClickOutside();
            }
        }
        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [ref, onClickOutside, enabled]);
}
