/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import Wrapper from "../../../components/utils/Wrapper/wrapper";
import Img from "../../../components/utils/LazyLoadImg/Img";
import ThumbFallBack from "../../../assets/no-results.png";
import "./style.scss";
import { PlayIcon } from "../../../utils/PlayIcon";
import Error from "../../../components/utils/Error/Error";

export default function VideosSection({ videos, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const carouselContainer = useRef();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  // decide what to show

  let content = null;

  if (loading) {
    content = (
      <div className="videoSkeleton">
        {loadingSkeleton()}
        {loadingSkeleton()}
        {loadingSkeleton()}
        {loadingSkeleton()}
      </div>
    );
  } else if (videos?.results?.length > 0) {
    content = (
      <div
        className="videos"
        ref={carouselContainer}
      >
        {videos?.results?.map((video) => {
          const thumbUrl = video?.key
            ? `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
            : ThumbFallBack;

          return (
            <div
              key={video.id}
              className="videoItem"
            >
              <div
                className="videoThumbnail"
                onClick={() => {
                  setVideoId(video?.key);
                  setShow(true);
                }}
              >
                <Img src={thumbUrl} />
                <PlayIcon />
              </div>
              <div className="videoTitle">{video.name}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    content = <Error message="No data available" />;
  }

  return (
    <div className="videosSection">
      <Wrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading && videos?.results?.length > 4 && (
          <>
            <BsFillArrowLeftCircleFill
              className="carouselLeftNav arrow"
              onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
              className="carouselRightNav arrow"
              onClick={() => navigation("right")}
            />
          </>
        )}

        {content}
      </Wrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}
