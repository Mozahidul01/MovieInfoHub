/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import dayjs from "dayjs";
import Img from "./../../../components/utils/LazyLoadImg/Img";
import PosterFallback from "../../../assets/no-poster.png";
import Wrapper from "./../../../components/utils/Wrapper/wrapper";
import Genres from "./../../../components/Genres/Genres";
import CircleRating from "./../../../components/CircleRating/CircleRating";
import { PlayIcon } from "./../../../utils/PlayIcon";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import "./style.scss";

export default function DetailsBanner({
  data,
  dataLoading,
  videos,
  videoLoading,
  crews,
  creditsLoading,
}) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  //Gather Genres Id
  const _genres = data?.genres?.map((genre) => genre.id);

  //Find Trailer
  const trailer = videos?.find((video) => video.type === "Trailer");

  //Filter Directors
  const director = crews?.filter((crew) => crew.job === "Director");

  //Filter Writers
  const writer = crews?.filter((crew) => crew.department === "Writing");

  //Convert Minutes to Hours and Minutes Formate
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : " "}`;
  };

  return (
    <div className="detailsBanner">
      {!dataLoading ? (
        <>
          {!!data && (
            <Fragment>
              <div className="backdrop-img">
                <Img
                  src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                />
              </div>
              <div className="opacity-layer"></div>
              <Wrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                      />
                    ) : (
                      <Img
                        className="posterImg"
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title}`}
                      {data?.release_date && (
                        <span>
                          {" "}
                          ({dayjs(data?.release_date).format("YYYY")})
                        </span>
                      )}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      {!videoLoading && !!trailer && (
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(trailer.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      )}
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>

                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {!!data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {!!data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {!creditsLoading && (
                      <>
                        {director?.length > 0 && (
                          <div className="info">
                            <span className="text bold">Director: </span>
                            <span className="text">
                              {director?.map((d, i) => (
                                <span key={i}>
                                  {d.name}
                                  {director.length - 1 !== i && ", "}
                                </span>
                              ))}
                            </span>
                          </div>
                        )}

                        {writer?.length > 0 && (
                          <div className="info">
                            <span className="text bold">Writer: </span>
                            <span className="text">
                              {writer?.map((d, i) => (
                                <span key={i}>
                                  {d.name}
                                  {writer.length - 1 !== i && ", "}
                                </span>
                              ))}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </Wrapper>
            </Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <Wrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </Wrapper>
        </div>
      )}
    </div>
  );
}
