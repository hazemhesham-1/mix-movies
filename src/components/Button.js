const Button = ({ children, onClick }) => {
  return (
    <button className="toggle-btn" onClick={onClick}>{children}</button>
  );
};

export default Button;