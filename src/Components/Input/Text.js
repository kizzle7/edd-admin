import { forwardRef } from "react";

export const TextInput = forwardRef((props, ref) => {
  const style = {
    ...props.style,
    paddingLeft: props.prependIcon ? "0.4rem" : "0.4rem",
    background: "#f0f3f4",
    borderRadius: "17px",
    border: "1px solid #f0f3f4",
    padding: "12px 15px" ,
    marginTop: "-.6rem",
    width: "100%",
    color: '#00000 !important',
    fontWeight: "300"
    
  };
  return (
    <div>
      <label
        className="d-block text-dark font-weight-normal"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div>
        <textarea
          {...props}
          ref={ref}
          rows={10}
          style={
            props.error
              ? {
                  ...style,
                  border: "1px solid #ff5b5b",
                  boxShadow: "none",
                  background: "#F7F9FC",
                }
              : {
                  ...style,
                }
          }
        ></textarea>
      </div>
      {props.error && <p className="validate-error ">{props.error}</p>}
    </div>
  );
});
