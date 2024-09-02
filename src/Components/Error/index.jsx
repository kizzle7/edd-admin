import React from "react";

const Error = ({ errorName }) => {
  return (
    <>
      {errorName && (
        <span className="validate-error">{errorName.message}</span>
      )}
    </>
  );
};

export default Error;
