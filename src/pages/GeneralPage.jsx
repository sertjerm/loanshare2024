import React from "react";
import "../assets/styles/general-page.scss";

const GeneralPage = (props) => {
  return (
    <div className="container general-page pt-4">
      <div className="row">
        <div
          className="col-12 col-md-6 "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="col-12 pt-2" data-aos="fade-up" data-aos-delay="300">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;

export const AdminPage = (props) => {
  return (
    <div className="container-fluid general-page pt-4">
      <div className="row">
        <div className="col-12 " data-aos="fade-up" data-aos-delay="300">
          <div className="col-12 pt-2" data-aos="fade-up" data-aos-delay="300">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
