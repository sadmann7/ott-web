import React from "react";
import { ToastContainer } from "react-toastify";

const ToastWrapper = () => {
  return (
    <ToastContainer
      position="top-right"
      limit={1}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default ToastWrapper;
