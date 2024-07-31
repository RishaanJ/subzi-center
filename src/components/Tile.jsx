import React from 'react';
import PropTypes from 'prop-types';

const starNotation = number => {
    let fill = "★";
    let unfill = "☆";
    let unfillStars = 5 - number;
    return fill.repeat(number) + unfill.repeat(unfillStars);
  };
const average = array => array.length ? array.reduce((a, b) => a + b) / array.length : 0;
const Tile = ({ name, imageSrc, s, onClick, stars}) => {
    return (
        <div className="subzi" style={s} onClick={onClick}>
            <img src={imageSrc} alt={name} />
            <h1>{name}</h1>
            <h1>{starNotation(Math.floor(average(stars)))}</h1>
        </div>
    );
};

Tile.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    s: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    stars: PropTypes.array.isRequired
};

export default Tile;
