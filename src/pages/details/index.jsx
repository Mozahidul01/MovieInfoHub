import { useParams } from "react-router-dom";
import {
  useGetDetailsQuery,
  useGetRelatedCreditsQuery,
  useGetRelatedVideosQuery,
} from "../../features/global/globalApi";
import DetailsBanner from "./DetailsBanner";
import Cast from "./Cast";
import VideosSection from "./VideosSection";
import Error from "./../../components/utils/Error/Error";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import "./style.scss";

export default function Details() {
  const { mediaType, id } = useParams();

  const { data, isLoading, isError } = useGetDetailsQuery({
    type: mediaType,
    id,
  });

  const {
    data: videos,
    isLoading: videosLoading,
    isError: videosError,
  } = useGetRelatedVideosQuery({
    type: mediaType,
    id,
  });

  const {
    data: credits,
    isLoading: creditsLoading,
    isError: creditsError,
  } = useGetRelatedCreditsQuery({
    type: mediaType,
    id,
  });

  return (
    <>
      {!isError && !videosError && !creditsError ? (
        <div>
          <DetailsBanner
            data={data}
            dataLoading={isLoading}
            videos={videos?.results}
            videoLoading={videosLoading}
            crews={credits?.crew}
            creditsLoading={creditsLoading}
          />
          <Cast
            casts={credits?.cast}
            loading={creditsLoading}
          />
          <VideosSection
            videos={videos}
            loading={videosLoading}
          />
          <Similar
            type={mediaType}
            id={id}
          />
          <Recommendation
            type={mediaType}
            id={id}
          />
        </div>
      ) : (
        <Error message="There was an error getting details" />
      )}
    </>
  );
}
