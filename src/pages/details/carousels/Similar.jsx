/* eslint-disable react/prop-types */
import Carousel from "../../../components/Carousel/Carousel";
import { useGetSimilarQuery } from "../../../features/global/globalApi";
import Error from "./../../../components/utils/Error/Error";

export default function Similar({ type, id }) {
  const { data, isLoading, isError } = useGetSimilarQuery({ type, id });

  const title = type === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <div className="similarContent">
      <div className="carousel-title">{title}</div>
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
