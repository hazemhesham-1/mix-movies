import { useEffect, useState } from "react";

export function useSessionStorageState(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue? JSON.parse(storedValue) : initialState;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    
    return [value, setValue];
}