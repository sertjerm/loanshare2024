// import React from 'react'
import { BeatLoader } from "react-spinners";
import "../../assets/styles/my-loader.scss";
import { LOADING_COLOR } from "../../app/constants/GLOBAL_VAR";
import PropTypes from "prop-types";
const MyLoader = ({ color }) => {
  // let {color} =props;
  return (
    <div className="my-loader">
      <BeatLoader color={color || LOADING_COLOR} />
    </div>
  );
};
MyLoader.propTypes = {
  color: PropTypes.string,
};

export default MyLoader;
