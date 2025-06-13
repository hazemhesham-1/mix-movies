import { useRef } from "react";
import { useKey } from "../hooks/useKey";

const SearchBar = ({query, onChangeQuery, language}) => {
    const inputElement = useRef(null);
    
    useKey("Enter", () => {
        if(inputElement.current === document.activeElement) return;
        inputElement.current.focus();
        onChangeQuery("");
    });

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
            placeholder={language.text.search}
            dir={language.isRTL? "rtl" : "ltr"}
            ref={inputElement}
        />
    );
}

export default SearchBar;