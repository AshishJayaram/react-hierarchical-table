import React from "react";
import Controls from "./Controls";

const TableRow = ({ row, originalValues, updateByPercentage, updateByValue }) => {
  const originalValue = originalValues[row.id] || row.value;
  const variance = originalValue !== 0 ? ((row.value - originalValue) / originalValue) * 100 : 0;

  return (
    <>
      <tr>
        <td style={{ paddingLeft: row.children ? "0px" : "20px" }}>
          {row.children ? <strong>{row.label}</strong> : `-- ${row.label}`}
        </td>
        <td>{row.value.toFixed(2)}</td>

        {row.children ? <><td></td><td></td><td></td></> : (
          <Controls rowId={row.id} updateByPercentage={updateByPercentage} updateByValue={updateByValue} />
        )}

        <td>{isNaN(variance) ? "0.00" : variance.toFixed(2)}%</td>
      </tr>

      {row.children?.map(child => (
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
