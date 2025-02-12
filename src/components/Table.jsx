import React from 'react';
import TableRow from './TableRow';

const Table = ({ rows, originalValues, updateByPercentage, updateByValue }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Category</th>
          <th>Value</th>
          <th>Input</th>
          <th>+%</th>
          <th>Set</th>
          <th>Variance</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            row={row}
            originalValues={originalValues}
            updateByPercentage={updateByPercentage}
            updateByValue={updateByValue}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
