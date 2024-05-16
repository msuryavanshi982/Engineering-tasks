import React from 'react';
import './TileX.css';

function TileOverflowX({ data, setData }) {
  return (
    <div className="tile-x">
      {data.map((item, index) => (
        <span key={index}>Scrollable X {Object.keys(item)[0]}: {Object.values(item)[0]}</span>
      ))}
    </div>
  );
}

export default TileOverflowX;
