import React from 'react';
import './TileY.css';

function TileOverflowY({ data, setData }) {
  return (
    <div className="tile-y">
      {data.map((item, index) => (
        <span key={index}>Scrollable Y {Object.keys(item)[0]}: {Object.values(item)[0]}</span>
      ))}
    </div>
  );
}

export default TileOverflowY;
