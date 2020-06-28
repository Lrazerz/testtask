import React from "react";
import './modal-alert.scss';
import MainButton from "../main-button";

const ModalAlert = (props) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-title-wrapper">
        <p className="alert-title">Congratulations</p>
        <div className="close" onClick={props.onClick}></div>
      </div>
      <div className="modal-description-wrapper">
        <p className="alert-description">You have successfully passed the registration</p>
      </div>
      <div className="modal-confirm-wrapper">
        <MainButton styles={{width: '80px',height: '40px', margin: '0px'}} onClick={props.onClick}>Great</MainButton>
      </div>
    </div>
  );
};

export default ModalAlert;