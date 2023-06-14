import "./style.scss";
import Wrapper from "./../../components/utils/Wrapper/wrapper";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="pageNotFound">
      <Wrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <button
          className="goHome"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </Wrapper>
    </div>
  );
}
