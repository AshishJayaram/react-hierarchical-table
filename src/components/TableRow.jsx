import React, { useState } from 'react';

const TableRow = ({
  row,
  originalValues,
  updateByPercentage,
  updateByValue,
}) => {
  const [input, setInput] = useState('');

  const originalValue = originalValues[row.id] || row.value;
  const variance =
    originalValue !== 0
      ? ((row.value - originalValue) / originalValue) * 100
      : 0;

  const applyPercentage = () => {
    const percent = parseFloat(input);
    if (!isNaN(percent)) {
      // Allows any % value positive or negative > -100%
      updateByPercentage(row.id, percent);
      setInput('');
    }
  };

  const applyValue = () => {
    const newValue = parseFloat(input);
    if (!isNaN(newValue) && newValue >= 0) {
      // Prevents negative direct values
      updateByValue(row.id, newValue);
      setInput('');
    }
  };

  return (
    <>
      <tr>
        <td style={{ paddingLeft: row.children ? '0px' : '20px' }}>
          {row.children ? <strong>{row.label}</strong> : `-- ${row.label}`}
        </td>
        <td>{row.value.toFixed(2)}</td>

        {row.children ? (
          <>
            <td></td>
            <td></td>
            <td></td>
          </>
        ) : (
          <>
            <td>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter % or Value"
              />
            </td>
            <td>
              <button
                onClick={applyPercentage}
                disabled={input === '' || input < -100}
              >
                %
              </button>
            </td>
            <td>
              <button
                onClick={applyValue}
                disabled={input === '' || parseFloat(input) < 0}
              >
                Set
              </button>
            </td>
          </>
        )}

        <td>{isNaN(variance) ? '0.00' : variance.toFixed(2)}%</td>
      </tr>

      {row.children?.map((child) => (
        <TableRow
          key={child.id}
          row={child}
          originalValues={originalValues}
          updateByPercentage={updateByPercentage}
          updateByValue={updateByValue}
        />
      ))}
    </>
  );
};

export default TableRow;
