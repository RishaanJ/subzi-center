import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ name, imageSrc }) => {
    return (
        <div className="subzi">
            <img src={imageSrc} alt={name} />
            <h1>{name}</h1>
            <h1>★★★★★</h1>
        </div>
    );
};

Tile.propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
};

export default Tile;
