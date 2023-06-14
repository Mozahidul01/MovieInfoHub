import { useState } from "react";
import { useGetTrendingQuery } from "../../../features/global/globalApi";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import Wrapper from "../../../components/utils/Wrapper/wrapper";
import Carousel from "../../../components/Carousel/Carousel";
import Error from "../../../components/utils/Error/Error";

export default function Trending() {
  const [timePeriod, setTimePeriod] = useState("day");
  const { data, isLoading, isError } = useGetTrendingQuery({
    category: "all",
    time: timePeriod,
  });

  const onTabChange = (tab) => {
    setTimePeriod(tab === "Week" ? "week" : "day");
  };

  return (
    <div className="carouselSection">
      <Wrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs
          data={["Day", "Week"]}
          onTabChange={onTabChange}
        />
      </Wrapper>
      {!isError ? (
        <Carousel
          data={data?.results}
          loading={isLoading}
        />
      ) : (
        <Error message="There was on error fetching Trending data" />
      )}
    </div>
  );
}
