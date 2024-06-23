// // // import React, { useState } from "react";
// // // import { Box, Slider, Typography } from "@mui/material";
// // // import { NumericFormat } from "react-number-format";
// // // import { Button } from "antd";

// // // const MyNumberSlider = (props) => {
// // //   let { min, max, step, name, color } = props;
// // //   const [value, setValue] = useState(max);

// // //   const handleChange = (event, newValue) => {
// // //     setValue(newValue);
// // //     props.handleChange(name, newValue);
// // //   };

// // //   function valuetext(value) {
// // //     return `${value}`;
// // //   }

// // //   return (
// // //     <Box sx={{ width: "100%", padding: 2 }} className="text-center">
// // //       {/* <Typography variant="h6" gutterBottom>
// // //         {label}
// // //       </Typography> */}
// // //       <Typography variant="h4" gutterBottom>
// // //         <NumericFormat
// // //           //   className="ant-input"
// // //         //   id={id}
// // //         //   name={name}
// // //           value={value}
// // //           displayType="text"
// // //           thousandSeparator
// // //           decimalScale={2}
// // //           onChange={handleChange}
// // //           // onKeyDown={(e) => handleKeyDown(e, "AMT")}
// // //         />
// // //       </Typography>
// // //       <Slider

// // //        name={name}
// // //         value={value}
// // //         onChange={handleChange}
// // //         aria-labelledby="continuous-slider"
// // //         getAriaValueText={valuetext}
// // //         min={min}
// // //         max={max}
// // //         step={step}
// // //         valueLabelDisplay="auto"
// // //         color={color || "primary"}
// // //       />
// // //       <Box display="flex" justifyContent="space-between">
// // //         <Typography>
// // //           ขั้นต่ำ{" "}
// // //           <NumericFormat
// // //             value={min}
// // //             displayType={"text"}
// // //             thousandSeparator={true}
// // //           />
// // //         </Typography>
// // //         <Typography>
// // //           สูงสุด{" "}
// // //           <NumericFormat
// // //             value={max}
// // //             displayType={"text"}
// // //             thousandSeparator={true}
// // //           />
// // //         </Typography>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default MyNumberSlider;

// // // import React, { useState } from "react";
// // // import { Box, Slider, Typography } from "@mui/material";
// // // import { NumericFormat } from "react-number-format";

// // // const MyNumberSlider = (props) => {
// // //   let { min, max, step, name, color } = props;
// // //   const [value, setValue] = useState(max);

// // //   const handleChange = (event, newValue) => {
// // //     setValue(newValue);
// // //     props.handleChange(name, newValue);
// // //   };

// // //   const handleInputChange = (event) => {
// // //     const newValue = Number(event.target.value.replace(/,/g, ''));
// // //     setValue(newValue);
// // //     props.handleChange(name, newValue);
// // //   };

// // //   function valuetext(value) {
// // //     return `${value}`;
// // //   }

// // //   return (
// // //     <Box sx={{ width: "100%", padding: 2 }} className="text-center">
// // //       <Typography variant="h4" gutterBottom>
// // //         <NumericFormat
// // //           value={value}
// // //           thousandSeparator
// // //           decimalScale={2}
// // //           onValueChange={(values) => {
// // //             const { floatValue } = values;
// // //             setValue(floatValue);
// // //             props.handleChange(name, floatValue);
// // //           }}
// // //           customInput={(inputProps) => <input {...inputProps} />}
// // //         />
// // //       </Typography>
// // //       <Slider
// // //         name={name}
// // //         value={value}
// // //         onChange={handleChange}
// // //         aria-labelledby="continuous-slider"
// // //         getAriaValueText={valuetext}
// // //         min={min}
// // //         max={max}
// // //         step={step}
// // //         valueLabelDisplay="auto"
// // //         color={color || "primary"}
// // //       />
// // //       <Box display="flex" justifyContent="space-between">
// // //         <Typography>
// // //           ขั้นต่ำ{" "}
// // //           <NumericFormat
// // //             value={min}
// // //             displayType={"text"}
// // //             thousandSeparator={true}
// // //           />
// // //         </Typography>
// // //         <Typography>
// // //           สูงสุด{" "}
// // //           <NumericFormat
// // //             value={max}
// // //             displayType={"text"}
// // //             thousandSeparator={true}
// // //           />
// // //         </Typography>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default MyNumberSlider;

// // import React, { useState } from "react";
// // import { Box, Slider, Typography } from "@mui/material";
// // import { NumericFormat } from "react-number-format";

// // const MyNumberSlider = (props) => {
// //   let { min, max, step, name, color } = props;
// //   const [value, setValue] = useState(max);
// //   const [inputValue, setInputValue] = useState(max);

// //   const handleSliderChange = (event, newValue) => {
// //     setValue(newValue);
// //     setInputValue(newValue);
// //     props.handleChange(name, newValue);
// //   };

// //   const handleInputChange = (event) => {
// //     const newValue = Number(event.target.value.replace(/,/g, ''));
// //     setInputValue(newValue);
// //   };

// //   const handleInputKeyDown = (event) => {
// //     if (event.key === 'Enter') {
// //       setValue(inputValue);
// //       props.handleChange(name, inputValue);
// //     }
// //   };

// //   function valuetext(value) {
// //     return `${value}`;
// //   }

// //   return (
// //     <Box sx={{ width: "100%", padding: 2 }} className="text-center">
// //       <Typography variant="h4" gutterBottom>
// //         <NumericFormat
// //           value={inputValue}
// //           thousandSeparator
// //           decimalScale={2}
// //           onValueChange={(values) => {
// //             const { floatValue } = values;
// //             setInputValue(floatValue);
// //           }}
// //           customInput={(inputProps) => (
// //             <input
// //               {...inputProps}
// //               onKeyDown={handleInputKeyDown}
// //             />
// //           )}
// //         />
// //       </Typography>
// //       <Slider
// //         name={name}
// //         value={value}
// //         onChange={handleSliderChange}
// //         aria-labelledby="continuous-slider"
// //         getAriaValueText={valuetext}
// //         min={min}
// //         max={max}
// //         step={step}
// //         valueLabelDisplay="auto"
// //         color={color || "primary"}
// //       />
// //       <Box display="flex" justifyContent="space-between">
// //         <Typography>
// //           ขั้นต่ำ{" "}
// //           <NumericFormat
// //             value={min}
// //             displayType={"text"}
// //             thousandSeparator={true}
// //           />
// //         </Typography>
// //         <Typography>
// //           สูงสุด{" "}
// //           <NumericFormat
// //             value={max}
// //             displayType={"text"}
// //             thousandSeparator={true}
// //           />
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default MyNumberSlider;
// import React, { useState } from "react";
// import { Box, Slider, Typography } from "@mui/material";
// import { NumericFormat } from "react-number-format";

// const MyNumberSlider = (props) => {
//   let { min, max, step, name, color } = props;
//   const [value, setValue] = useState(max);
//   const [inputValue, setInputValue] = useState(max);

//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//     setInputValue(newValue);
//     props.handleChange(name, newValue);
//   };

//   const handleInputChange = (event) => {
//     const newValue = Number(event.target.value.replace(/,/g, ''));
//     setInputValue(newValue);
//   };

//   const handleInputBlur = () => {
//     setValue(inputValue);
//     props.handleChange(name, inputValue);
//   };

//   function valuetext(value) {
//     return `${value}`;
//   }

//   return (
//     <Box sx={{ width: "100%", padding: 2 }} className="text-center">
//       <Typography variant="h4" gutterBottom>
//         <NumericFormat
//           value={inputValue}
//           thousandSeparator
//           decimalScale={2}
//           onValueChange={(values) => {
//             const { floatValue } = values;
//             setInputValue(floatValue);
//           }}
//           customInput={(inputProps) => (
//             <input
//               {...inputProps}
//               onBlur={handleInputBlur}
//               onChange={handleInputChange}
//             />
//           )}
//         />
//       </Typography>
//       <Slider
//         name={name}
//         value={value}
//         onChange={handleSliderChange}
//         aria-labelledby="continuous-slider"
//         getAriaValueText={valuetext}
//         min={min}
//         max={max}
//         step={step}
//         valueLabelDisplay="auto"
//         color={color || "primary"}
//       />
//       <Box display="flex" justifyContent="space-between">
//         <Typography>
//           ขั้นต่ำ{" "}
//           <NumericFormat
//             value={min}
//             displayType={"text"}
//             thousandSeparator={true}
//           />
//         </Typography>
//         <Typography>
//           สูงสุด{" "}
//           <NumericFormat
//             value={max}
//             displayType={"text"}
//             thousandSeparator={true}
//           />
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default MyNumberSlider;

import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

const MyNumberSlider = (props) => {
  let { min, max, step, name, color } = props;
  const [value, setValue] = useState(max);
  const [inputValue, setInputValue] = useState(max);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setInputValue(newValue);
    props.handleChange(name, newValue);
  };

  const handleInputChange = (values) => {
    const { floatValue } = values;
    setInputValue(floatValue);
  };

  const handleInputBlur = () => {
    setValue(inputValue);
    props.handleChange(name, inputValue);
  };

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }} className="text-center">
      <Typography variant="h4" gutterBottom>
        <NumericFormat
          value={inputValue}
          thousandSeparator
          decimalScale={2}
          onValueChange={handleInputChange}
          customInput={(inputProps) => (
            <input {...inputProps} onBlur={handleInputBlur} />
          )}
        />
      </Typography>
      <Slider
        name={name}
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="continuous-slider"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        color={color || "primary"}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography>
          ขั้นต่ำ{" "}
          <NumericFormat
            value={min}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
        <Typography>
          สูงสุด{" "}
          <NumericFormat
            value={max}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default MyNumberSlider;
