const Logo = ({ language }) => {
  return (
    <div className="logo">
      <span>🍿</span>
      <h1>{language.text.title}</h1>
    </div>
  );
}

export default Logo;