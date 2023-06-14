/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Img from "../../../components/utils/LazyLoadImg/Img";
import Wrapper from "./../../../components/utils/Wrapper/wrapper";
import ImageFallBack from "../../../assets/avatar.png";
import "./style.scss";
import Error from "../../../components/utils/Error/Error";

export default function Cast({ casts, loading }) {
  const carouselContainer = useRef();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 10)
        : container.scrollLeft + (container.offsetWidth + 10);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  // decide what to show

  let content = null;

  if (loading) {
    content = (
      <div className="castSkeleton">
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
      </div>
    );
  } else if (casts?.length > 0) {
    content = (
      <div
        className="listItems"
        ref={carouselContainer}
      >
        {casts.map((cast) => {
          let imgUrl = cast?.profile_path
            ? `https://image.tmdb.org/t/p/original/${cast?.profile_path}`
            : ImageFallBack;

          return (
            <div
              key={cast.id}
              className="listItem"
            >
              <div className="profileImg">
                <Img
                  className="avatar"
                  src={imgUrl}
                />
              </div>
              <div className="name">{cast.name}</div>
              <div className="character">{cast.character}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    content = <Error message="No data available" />;
  }

  return (
    <div className="castSection">
      <Wrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading && casts?.results?.length > 4 && (
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
    </div>
  );
}
