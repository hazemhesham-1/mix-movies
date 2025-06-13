const Footer = ({ language, onChangeLanguage }) => {
    return (
        <footer className={`footer ${language.isRTL ? "rtl" : ""}`}>
            <select
                value={language.code}
                onChange={(e) => onChangeLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="ar">العربية</option>
            </select>
        </footer>
    );
};

export default Footer;