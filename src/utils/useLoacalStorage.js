import { useState } from "react"

export const useLoacalStorage = (key, inItVal = null) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : inItVal;
    })
    const setValue = (value) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeVal = (key) => {
        setStoredValue(null);
        localStorage.removeItem(key)
    }

    return [storedValue, setValue, removeVal];
}