import React from "react";
import "../assets/styles/general-page.scss";

const GeneralPage = (props) => {
  return (
    <div className="container-fluid general-page">
      <div className="row">
        <div
          className="col-12 col-md-6 col-lg-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {/* <div className="col-12 " data-aos="fade-up" data-aos-delay="300"> */}
          <center>{props.children}</center>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;

export const AdminPage = (props) => {
  return (
    <div className="container-fluid general-page ">
      <div className="row">
        <div
          className="col-12 "
          // data-aos="fade-up" data-aos-delay="300"
        >
          <div className="col-12 pt-2">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
