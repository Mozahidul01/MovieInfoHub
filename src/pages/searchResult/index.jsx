import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  globalApi,
  useGetSearchResultQuery,
} from "../../features/global/globalApi";
import Loader from "./../../components/utils/Loader/Loader";
import ContentCard from "../../components/ContentCard/ContentCard";
import Wrapper from "./../../components/utils/Wrapper/wrapper";
import Error from "./../../components/utils/Error/Error";
import "./style.scss";

export default function SearchResult() {
  const { query } = useParams();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } =
    useGetSearchResultQuery(query);

  const { results, total_pages } = data || {};

  const dispatch = useDispatch();

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        globalApi.endpoints.getMoreSearchResult.initiate({ query, page })
      );
    }
  }, [page, dispatch, query]);

  return (
    <div className="searchResultsPage">
      {isLoading && <Loader />}

      {isError && <Error message="There was an error getting data" />}

      {!isLoading && !isError && (
        <Wrapper>
          {isSuccess && results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={results?.length || 0}
                next={fetchMore}
                hasMore={page <= total_pages}
                loader={<Loader />}
              >
                {results.map((item, index) => {
                  if (item.media_type === "person") return null;
                  return (
                    <ContentCard
                      key={index}
                      data={item}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </Wrapper>
      )}
    </div>
  );
}
