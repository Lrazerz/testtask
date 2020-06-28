import React from "react";
import './main-button.scss';

const MainButton = (props) => {
  return (
    <button className="main-button" onClick={props.onClick} style={{...props.styles}}>
      {props.children}
    </button>
  )
}

export default MainButton;