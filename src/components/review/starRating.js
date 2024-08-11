import { useState } from "react";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "gold" : "gray",
            margin: "2px",
            fontSize: "30px",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
