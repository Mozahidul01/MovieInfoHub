/* eslint-disable react/prop-types */
import { FiAlertTriangle } from "react-icons/fi";
import Wrapper from "../Wrapper/wrapper";
import "./style.scss";

export default function Error({ message = "There was an error" }) {
  return (
    <Wrapper>
      <div className="error">
        <div className="icon__wrapper">
          <FiAlertTriangle />
        </div>
        <span>{message}</span>
      </div>
    </Wrapper>
  );
}
