import { useGetUpcomingMoviesQuery } from "../../../features/global/globalApi";
import Wrapper from "../../../components/utils/Wrapper/wrapper";
import Carousel from "../../../components/Carousel/Carousel";
import Error from "../../../components/utils/Error/Error";

export default function Upcoming() {
  const { data, isLoading, isError } = useGetUpcomingMoviesQuery();

  return (
    <div className="carouselSection">
      <Wrapper>
        <span className="carouselTitle">Upcoming Movies</span>
      </Wrapper>
      {!isError ? (
        <Carousel
          data={data?.results}
          loading={isLoading}
          type="movie"
        />
      ) : (
        <Error message="There was on error fetching Upcoming Movies" />
      )}
    </div>
  );
}
