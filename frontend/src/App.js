import { useState } from "react";
import "./styles.css";
import "./App.css";

import ScrollableChildren from "./ScrollableChildren/ScrollableChildren";

const Page = {
  ScrollableChildren: "ScrollableChildren",
};

function App() {
  const [page, setPage] = useState(Page.ScrollableChildren);

  return (
    <div className="app">
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
