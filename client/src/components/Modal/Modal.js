import "./Modal.css";
import React from "react";
import ReactDom from "react-dom";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="modal">{children}</div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
