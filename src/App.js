import React, { useState, useEffect } from 'react';
import Table from './components/Table';

const initialData = [
  {
    id: 'electronics',
    label: 'Electronics',
    value: 1500,
    children: [
      { id: 'phones', label: 'Phones', value: 800 },
      { id: 'laptops', label: 'Laptops', value: 700 },
    ],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    value: 1000,
    children: [
      { id: 'tables', label: 'Tables', value: 300 },
      { id: 'chairs', label: 'Chairs', value: 700 },
    ],
  },
];

function App() {
  const [rows, setRows] = useState(initialData);
  const [originalValues, setOriginalValues] = useState({});

  useEffect(() => {
    let values = {};
    initialData.forEach((row) => {
      values[row.id] = row.value;
      if (row.children)
        row.children.forEach((child) => (values[child.id] = child.value));
    });
    setOriginalValues(values);
  }, []);

  const updateByPercentage = (id, percent) => {
    setRows((prevRows) =>
      updateParents(
        prevRows.map((row) =>
          updateRow(row, id, (value) => value * (1 + percent / 100))
        )
      )
    );
  };

  const updateByValue = (id, newValue) => {
    setRows((prevRows) =>
      updateParents(prevRows.map((row) => updateRow(row, id, () => newValue)))
    );
  };

  const updateRow = (row, id, modifyValue) => {
    if (row.id === id) return { ...row, value: modifyValue(row.value) };
    if (row.children) {
      let updatedChildren = row.children.map((child) =>
        updateRow(child, id, modifyValue)
      );
      return {
        ...row,
        children: updatedChildren,
        value: updatedChildren.reduce((sum, child) => sum + child.value, 0),
      };
    }
    return row;
  };

  const updateParents = (rows) => {
    return rows.map((row) => {
      if (row.children)
        row.value = row.children.reduce((sum, child) => sum + child.value, 0);
      return row;
    });
  };

  return (
    <div>
      <h2>Table</h2>
      <Table
        rows={rows}
        originalValues={originalValues}
        updateByPercentage={updateByPercentage}
        updateByValue={updateByValue}
      />
      <h3>Total: {rows.reduce((sum, row) => sum + row.value, 0)}</h3>
    </div>
  );
}

export default App;
