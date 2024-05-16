import { useState } from "react";
import "./styles.css";
import "./App.css";

import ScrollableChildren from "./ScrollableChildren";

const Page = {
  ScrollableChildren: "ScrollableChildren",
};

function App() {
  const [page, setPage] = useState(Page.ScrollableChildren);

  return (
    <div className="app">
      <div className="split-selection">
        <button onClick={() => setPage(Page.ScrollableChildren)}>
          Scrollable tiles
        </button>
      </div>

      <div className="splits">
        {page === Page.ScrollableChildren && (
          <>
            <ScrollableChildren />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
