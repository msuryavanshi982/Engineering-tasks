import './Tile.css';

function Tile({ children }) {
  return (
    <div className="tile">
      {children}
    </div>
  );
}

export default Tile;
