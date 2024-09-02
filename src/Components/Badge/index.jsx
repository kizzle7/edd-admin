import classname from "classname";
import "./index.css";
export const Badge = ({ value, type }) => {
  return <div className={classname("badge", type)}>{value}</div>;
};
