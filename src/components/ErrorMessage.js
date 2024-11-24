const ErrorMessage = ({ error, language }) => {
    return (
        <p className="loader error">
            {language.code == 'en'? error : language.text.error}
        </p>
    );
}

export default ErrorMessage;