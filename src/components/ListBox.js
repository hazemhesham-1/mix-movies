import { useState } from "react";
import Button from "./Button";

const ListBox = ({children, language}) => {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className={`list-container ${language.isRTL? "rtl" : ""}`}>
            <Button onClick={() => setIsOpen(open => !open)}>
                {isOpen? "-" : "+"}
            </Button>
            {isOpen && children}
        </div>
    );
}

export default ListBox;