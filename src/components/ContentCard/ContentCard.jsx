/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Img from "./../utils/LazyLoadImg/Img";
import CircleRating from "./../CircleRating/CircleRating";
import Genres from "./../Genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

export default function ContentCard({ data, fromSearch, mediaType }) {
  const navigate = useNavigate();
  const posterUrl = data?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
    : PosterFallback;

  return (
    <div
      className="contentCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img
          className="posterImg"
          src={posterUrl}
        />
        {!fromSearch && (
          <Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
}
