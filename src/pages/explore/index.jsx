import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  globalApi,
  useGetDiscoverResultQuery,
  useGetGenresListQuery,
} from "../../features/global/globalApi";
import Wrapper from "../../components/utils/Wrapper/wrapper";
import ContentCard from "../../components/ContentCard/ContentCard";
import Loader from "../../components/utils/Loader/Loader";
import Error from "../../components/utils/Error/Error";
import "./style.scss";
import { setFilter, setSortBy } from "../../features/global/globalSlice";

//Data Sort

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

export default function Explore() {
  const dispatch = useDispatch();
  const { mediaType } = useParams();
  const { sortBy, filterGenres } = useSelector((state) => state.global);

  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);

  const { data: genresData } = useGetGenresListQuery(mediaType);

  const { data, isLoading, isError, isSuccess } = useGetDiscoverResultQuery({
    mediaType,
    sortBy,
    genres: filterGenres,
  });

  const { results, total_pages } = data || {};

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        globalApi.endpoints.getMoreDiscoverResult.initiate({
          mediaType,
          page,
          sortBy,
          genres: filterGenres,
        })
      );
    }
  }, [page, dispatch, mediaType, sortBy, filterGenres]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        dispatch(setSortBy(selectedItems.value));
      } else {
        dispatch(setSortBy(""));
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        const genreIds = selectedItems.map((genre) => genre.id);
        dispatch(setFilter(genreIds));
      } else {
        dispatch(setFilter([]));
      }
    }
  };

  //Stored filterData and sortBy Reset on mediaType change
  useEffect(() => {
    dispatch(setFilter([]));
    setPage(1);
    setSortby(null);
    setGenre(null);
    dispatch(setSortBy("popularity.desc"));
  }, [dispatch, mediaType]);

  return (
    <div className="explorePage">
      <Wrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {isLoading && <Loader />}
        {isError && <Error message="There was an error getting data" />}

        {!isLoading && !isError && (
          <>
            {isSuccess && results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={results?.length || 0}
                next={fetchMore}
                hasMore={page <= total_pages}
                loader={<Loader />}
              >
                {results.map((item, index) => {
                  return (
                    <ContentCard
                      key={index}
                      data={item}
                      mediaType={mediaType}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </Wrapper>
    </div>
  );
}
