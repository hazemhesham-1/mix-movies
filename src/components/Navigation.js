import Logo from "./Logo";

const Navigation = ({children, language}) => {
  return (
    <nav className={`nav ${language.isRTL? 'rtl' : ''}`}>
      <Logo language={language}/>
      {children}
    </nav>
  );
}

export default Navigation;