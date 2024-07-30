import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ name, imageSrc, s }) => {
    return (
        <div className="subzi" style={s}>
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
};

export default Tile;
