import React, { useState } from 'react';

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
    };

    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        className={`star ${starValue <= rating ? 'filled' : ''}`}
                        onClick={() => handleClick(starValue)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default Star;
