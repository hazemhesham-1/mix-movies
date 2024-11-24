import { useEffect } from "react";

export function useKey(key, callback) {
    useEffect(() => {
        function handleKeyPress(e) {
            if(e.key == key) callback();
        }
        
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [key, callback]);
}