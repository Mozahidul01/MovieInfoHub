import { useEffect } from "react";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";
import Upcoming from "./Upcoming";
import HeroBanner from "./heroBanner";
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
      <Trending />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
