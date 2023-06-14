import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useGetTrendingQuery } from "../../../features/global/globalApi";
import Wrapper from "./../../../components/utils/Wrapper/wrapper";
import Img from "./../../../components/utils/LazyLoadImg/Img";

export default function HeroBanner() {
  const { data, isLoading, isError } = useGetTrendingQuery({
    category: "all",
    time: "day",
  });

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isError && data && data.results?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);

      const bg = data.results[randomIndex]?.backdrop_path;

      setBackground(bg);
    }
  }, [isLoading, isError, data]);

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!isLoading && !isError && data && data?.results?.length > 0 && (
        <div className="backdrop-img">
          <Img src={`https://image.tmdb.org/t/p/original/${background}`} />
        </div>
      )}
      <div className="opacity-layer"></div>

      <Wrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for your favourite movie ...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && searchQueryHandler()}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
