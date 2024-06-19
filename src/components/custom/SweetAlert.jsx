import React, { useEffect } from "react";
import Swal from "sweetalert2";

const SweetAlert = (props) => {
  const { title, type, ...rest } = props;

//   const handleShowAlert = () => {
//     Swal.fire({
//       title,
//       type,
//       ...rest,
//     });
//   };
  useEffect(()=>{
    Swal.fire({
        title,
        type,
        ...rest,
      });
  },[])

//   return <button onClick={handleShowAlert}>{title}</button>;
};

export default SweetAlert;
