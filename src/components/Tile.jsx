import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ name, imageSrc, s, onClick}) => {
    return (
        <div className="subzi" style={s} onClick={onClick}>
            <img src={imageSrc} alt={name} />
            <h1>{name}</h1>
            <h1>★★★★★</h1>
        </div>
    );
};

Tile.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    s: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Tile;
