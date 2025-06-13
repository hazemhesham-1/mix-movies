const StarIcon = ({
  style,
  isChecked,
  onClick,
  onHoverIn,
  onHoverOut
}) => {
  return (
    <i
      className="fa fa-star"
      style={isChecked ? style : { ...style, color: "" }}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    ></i>
  );
}

export default StarIcon;