/* eslint-disable react/prop-types */
import Error from "../../../components/utils/Error/Error";
import { useGetRecommendationsQuery } from "../../../features/global/globalApi";
import Carousel from "./../../../components/Carousel/Carousel";

export default function Recommendation({ type, id }) {
  const { data, isLoading, isError } = useGetRecommendationsQuery({ type, id });

  return (
    <div className="recommendatedContent">
      <div className="carousel-title">Recommendations</div>
      {!isError && data?.results?.length > 0 ? (
        <Carousel
          data={data?.results}
          loading={isLoading}
          type={type}
        />
      ) : (
        <Error message="No Data Available" />
      )}
    </div>
  );
}
