import { useState } from 'react';
import StarIcon from "./StarIcon";

const RatingBox = ({
    userRating=0,
    onSetRating,
    maxRating=5,
    color="#FFBF00",
    size=16,
    text=[]
}) => {
    const [tempRating, setTempRating] = useState(0);
    const style = { color, fontSize: `${size}px` };
    return (
        <div className="star-rating">
            {Array.from({length: maxRating > 10? 10 : maxRating}).map((e, i) =>
                <StarIcon
                    key={i}
                    style={style}
                    isChecked={tempRating? i < tempRating : i < userRating}
                    onClick={() => onSetRating(i+1)}
                    onHoverIn={() => setTempRating(i+1)}
                    onHoverOut={() => setTempRating(0)}
                />
            )}
            <p style={{color, fontSize: `${size-2}px`}}>
                {text.length === maxRating ?
                    text[tempRating? tempRating-1 : userRating-1] :
                    (tempRating || userRating || "")
                }
            </p>
        </div>
    );
}

export default RatingBox;