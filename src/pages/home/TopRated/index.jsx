import { useState } from "react";
import { useGetTopRatedQuery } from "../../../features/global/globalApi";
import Carousel from "../../../components/Carousel/Carousel";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import Wrapper from "../../../components/utils/Wrapper/wrapper";
import Error from "./../../../components/utils/Error/Error";

export default function TopRated() {
  const [type, setType] = useState("movie");
  const { data, isLoading, isError } = useGetTopRatedQuery(type);

  const onTabChange = (tab) => {
    setType(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <Wrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs
          data={["Movies", "Tv Shows"]}
          onTabChange={onTabChange}
        />
      </Wrapper>
      {!isError ? (
        <Carousel
          data={data?.results}
          loading={isLoading}
          type={type}
        />
      ) : (
        <Error message={`There was on error fetching Top Rated ${type}`} />
      )}
    </div>
  );
}
