import { useState, useEffect, useCallback } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../utils/Wrapper/wrapper";
import logo from "../../assets/logo-icon.png";
import "./style.scss";

export default function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //change scroll position on changing location
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //Hide and show navbar on scroll
  const controlNavbar = useCallback(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
          setShow("hide");
        } else {
          setShow("show");
        }
      } else {
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, mobileMenu]);

  useEffect(() => {
    controlNavbar();
  }, [controlNavbar]);

  //Search Query handler
  const searchQueryHandler = useCallback(
    (event) => {
      if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
        setTimeout(() => {
          setShowSearch(false);
          setQuery("");
        }, 500);
      }
    },
    [query, navigate]
  );

  //Searchbar open and close handler
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  //Mobile Menu open and close handler
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  //Navigate to different page
  const navigationHandler = useCallback(
    (type) => {
      if (type === "movie") {
        navigate("/explore/movie");
      } else {
        navigate("/explore/tv");
      }
      setMobileMenu(false);
    },
    [navigate]
  );

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <Wrapper>
        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt=""
          />
          <p>MovieInfoHub</p>
        </div>

        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </Wrapper>
      {showSearch && (
        <div className="searchBar">
          <Wrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </Wrapper>
        </div>
      )}
    </header>
  );
}
