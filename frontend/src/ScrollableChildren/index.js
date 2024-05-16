import React, { useState, useEffect } from 'react';
import TileOverflowX from './TileOverflowX';
import TileOverflowY from './TileOverflowY';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
import axios from 'axios';

function ScrollableChildren() {
  const [window1, setWindow1] = useState([{ key: 1, value: 'Value 1' }]);
  const [window2, setWindow2] = useState([{ key: 2, value: 'Value 2' }]);
  const [window3, setWindow3] = useState([{ key: 3, value: 'Value 3' }]);
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const result = await axios.get('http://localhost:5000/api/organization/count');
      setCounts(result.data);
    };

    fetchCounts();
  }, []);

  const handleAdd = async () => {
    const data = { key: 'newKey', value: 'newValue' };
    await axios.post('http://localhost:5000/api/data/add', data);
    setWindow1([data]);
    setWindow2([]);
    setWindow3([]);
    const result = await axios.get('http://localhost:5000/api/organization/count');
    setCounts(result.data);
  };

  const handleUpdate = async () => {
    const data = { id: window1[0]._id, key: 'updatedKey', value: 'updatedValue' };
    await axios.put(`http://localhost:5000/api/data/update/${data.id}`, data);
    setWindow1([data]);
    const result = await axios.get('http://localhost:5000/api/organization/count');
    setCounts(result.data);
  };

  return (
    <div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
      <div>
        <p>Add count: {counts.addCount}</p>
        <p>Update count: {counts.updateCount}</p>
      </div>
      <ReactSplit direction={SplitDirection.Horizontal}>
        <TileOverflowX data={window1} setData={setWindow1} />
        <ReactSplit direction={SplitDirection.Vertical}>
          <TileOverflowY data={window2} setData={setWindow2} />
          <ReactSplit direction={SplitDirection.Horizontal}>
            <TileOverflowY data={window3} setData={setWindow3} />
          </ReactSplit>
        </ReactSplit>
      </ReactSplit>
    </div>
  );
}

export default ScrollableChildren;
