import { useState } from "react";
import { useGetPopularQuery } from "../../../features/global/globalApi";
import Carousel from "../../../components/Carousel/Carousel";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import Wrapper from "../../../components/utils/Wrapper/wrapper";
import Error from "./../../../components/utils/Error/Error";

export default function Popular() {
  const [type, setType] = useState("movie");
  const { data, isLoading, isError } = useGetPopularQuery(type);

  const onTabChange = (tab) => {
    setType(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <Wrapper>
        <span className="carouselTitle">What{`'`}s Popular</span>
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
        <Error message={`There was on error fetching Popular ${type}`} />
      )}
    </div>
  );
}
