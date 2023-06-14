/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Wrapper from "../utils/Wrapper/wrapper";
import Img from "./../utils/LazyLoadImg/Img";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";
import "./style.scss";

export default function Carousel({ title, data, loading, type }) {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeleton = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton" />
        <div className="textBlock">
          <div className="title skeleton" />
          <div className="date skeleton" />
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <Wrapper>
        {title && <div className="carouselTitle">{title}</div>}

        {data?.length > 4 && (
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

        {!loading ? (
          <div
            className="carouselItems"
            ref={carouselContainer}
          >
            {data?.map((item) => {
              const posterPath = item.poster_path;
              const poster = posterPath
                ? `https://image.tmdb.org/t/p/original/${posterPath}`
                : PosterFallBack;

              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item?.media_type || type}/${item?.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={poster} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <div className="title">{item.title || item.name}</div>

                    <div className="date">
                      {dayjs(item.release_date).format("MMM DD, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </Wrapper>
    </div>
  );
}
