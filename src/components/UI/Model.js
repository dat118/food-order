import classes from "./Model.module.css";
import React from "react";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop}></div>;
};

const ModelOverlay = (props) => {
  return (
    <div className={classes.model}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Model = (props) => {
    return <>
    {ReactDOM.createPortal(<Backdrop onClick={props.closeHandler}/>,document.getElementById('overlays'))}
    {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,document.getElementById('overlays'))}
    </>
};

export default Model;
