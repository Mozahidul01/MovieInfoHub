import { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";
import Upcoming from "./Upcoming";
import "./style.scss";
import { useDispatch } from "react-redux";
import { setFilter, setSortBy } from "../../features/global/globalSlice";

export default function Home() {
  const dispatch = useDispatch();

  //Stored filterData and sortBy Reset
  useEffect(() => {
    dispatch(setFilter([]));

    dispatch(setSortBy("popularity.desc"));
  }, [dispatch]);

  return (
    <div className="homepage">
      <HeroBanner />
      <div className="homeContent">
        <Trending />
        <Upcoming />
        <Popular />
        <TopRated />
      </div>
    </div>
  );
}
