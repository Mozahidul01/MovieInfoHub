import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import Wrapper from "../utils/Wrapper/wrapper";
import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <Wrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          MovieInfoHub keeps you well-informed about the latest movie releases,
          ensuring you never miss out on the big screen action. From Hollywood
          blockbusters to indie gems, our website provides you with detailed
          information on each movie, including title, genre, release date, cast
          and crew, plot summaries, and even user ratings. You can browse
          through the most popular movies of the moment or dive into different
          genres to find your next favorite film.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </Wrapper>
    </footer>
  );
}
