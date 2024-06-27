import { useState } from "react";


const MoneyPicker = () => {
  const [selectedValue, setSelectedValue] = useState(10000);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const createOptions = () => {
    const options = [];
    for (let i = 10000; i <= 1000000; i += 10000) {
      options.push(
        <option key={i} value={i}>
          {i.toLocaleString()}
        </option>
      );
    }
    return options;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <select value={selectedValue} onChange={handleChange} style={selectStyle}>
        {createOptions()}
      </select>
    </div>
  );
};

const selectStyle = {
  width: "200px",
  height: "40px",
  fontSize: "18px",
  textAlign: "center",
  appearance: "none",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "white",
  padding: "5px",
};
export default MoneyPicker;
// ReactDOM.render(<MoneyPicker />, document.getElementById('root'));
