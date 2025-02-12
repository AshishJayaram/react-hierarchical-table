import React, { useState } from "react";

const Controls = ({ rowId, updateByPercentage, updateByValue }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const applyPercentage = () => {
    const percent = parseFloat(input);
    if (!isNaN(percent)) {
      updateByPercentage(rowId, percent);
      setInput("");
    }
  };

  const applyValue = () => {
    const newValue = parseFloat(input);
    if (!isNaN(newValue) && newValue >= 0) {
      updateByValue(rowId, newValue);
      setInput("");
    }
  };

  return (
    <>
      <td>
        <input
          type="number"
          value={input}
          onChange={handleChange}
          placeholder="Enter % or Value"
        />
      </td>
      <td>
        <button onClick={applyPercentage} disabled={input === "" || input < -100}>%</button>
      </td>
      <td>
        <button onClick={applyValue} disabled={input === "" || parseFloat(input) < 0}>Set</button>
      </td>
    </>
  );
};

export default Controls;
