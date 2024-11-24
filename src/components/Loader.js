const Loader = ({ language }) => {
    return (
        <p className="loader" style={language.isRTL? {direction: 'rtl'} : {}}>
            {language.text.loading}...
        </p>
    );
}

export default Loader;