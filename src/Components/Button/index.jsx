import React from "react";
import "./index.css";
import classname from "classname";
import { Loader } from "../Loader";

export const Button = (props) => {
  return (
    <button
      {...props}
      disabled={props.isDisabled ? props.isDisabled : props.loading}
      className={classname(
        props.isDisabled ? "disabled-button" : "button",
        props.small ? "small-button" : "",
        props.color && !props.isDisabled ? props.color : "",
        props.className
      )}
      style={props.style}
      {...props.rest}
    >
      <div className="d-flex align-items-center justify-content-center">
        {props.icon && props.icon}
        {props.loading ? (
          <div class="spinner-border" role="status" style={{width:'1.5rem', height:'1.5rem'}}>
            <span class="visually-hidden"></span>
          </div>
        ) : (
          props.text
        )}
      </div>
    </button>
  );
};
