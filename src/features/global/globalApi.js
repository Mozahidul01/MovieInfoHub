import { apiSlice } from "../api/apiSlice";

export const globalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get upcoming movies
    getUpcomingMovies: builder.query({
      query: () => `/movie/upcoming`,
      providesTags: ["UpcomingMovies"],
    }),

    // Endpoint for get trending movies/tv/people
    getTrending: builder.query({
      query: ({ category, time }) =>
        `/trending/${category}/${time}?language=en-US`,
      providesTags: ["Trending"],
    }),

    // Endpoint for get popular movies/tv
    getPopular: builder.query({
      query: (type) => `/${type}/popular`,
      providesTags: ["Popular"],
    }),

    // Endpoint for get topRated movies/tv
    getTopRated: builder.query({
      query: (type) => `/${type}/top_rated`,
      providesTags: ["TopRated"],
    }),

    // Endpoint for get movies/tv Genres List
    getGenresList: builder.query({
      query: (type) => `/genre/${type}/list`,
      providesTags: ["GenresList"],
    }),

    // Endpoint for get movies/tv Details
    getDetails: builder.query({
      query: ({ type, id }) => `/${type}/${id}`,
      providesTags: ["Details"],
    }),

    // Endpoint for get movies/tv Videos
    getRelatedVideos: builder.query({
      query: ({ type, id }) => `/${type}/${id}/videos`,
      providesTags: ["RelatedVideos"],
    }),

    // Endpoint for get movies/tv Videos
    getRelatedCredits: builder.query({
      query: ({ type, id }) => `/${type}/${id}/credits`,
      providesTags: ["RelatedCredits"],
    }),

    // Endpoint for get similar movies/tv
    getSimilar: builder.query({
      query: ({ type, id }) => `/${type}/${id}/similar`,
      providesTags: ["Similar"],
    }),

    // Endpoint for get recommendations movies/tv
    getRecommendations: builder.query({
      query: ({ type, id }) => `/${type}/${id}/recommendations`,
      providesTags: ["Recommendations"],
    }),

    // Endpoint for get searched movies/tv
    getSearchResult: builder.query({
      query: (query) => `/search/multi?query=${query}&page=1`,

      async onQueryStarted({ query }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.results?.length > 0) {
            // Update cache pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getSearchResult",
                query,
                (draft) => {
                  draft.push(data?.results);
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for get searched movies/tv by pagination
    getMoreSearchResult: builder.query({
      query: ({ query, page }) => `/search/multi?query=${query}&page=${page}`,

      async onQueryStarted({ query }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);

          if (data?.results?.length > 0) {
            //update chaches pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getSearchResult",
                query,
                (draft) => {
                  draft.results.push(...data.results);
                }
              )
            );
            //update chaches pessimistically end
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for get discovered movies/tv
    getDiscoverResult: builder.query({
      query: ({ mediaType, sortBy, genres }) => {
        const genreParams = genres.join("&");
        return `/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortBy}&with_genres=${genreParams}`;
      },

      async onQueryStarted(
        { mediaType, sortBy, genres },
        { queryFulfilled, dispatch }
      ) {
        try {
          const { data } = await queryFulfilled;

          if (data?.results?.length > 0) {
            // Update cache pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getDiscoverResult",
                { mediaType, sortBy, genres },
                (draft) => {
                  draft.push(data?.results);
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for get discovered movies/tv by pagination
    getMoreDiscoverResult: builder.query({
      query: ({ mediaType, page, sortBy, genres }) => {
        const genreParams = genres.join("&");
        return `/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&with_genres=${genreParams}`;
      },

      async onQueryStarted(
        { mediaType, sortBy, genres },
        { queryFulfilled, dispatch }
      ) {
        try {
          const { data } = await queryFulfilled;

          if (data?.results?.length > 0) {
            //update chaches pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getDiscoverResult",
                { mediaType, sortBy, genres },
                (draft) => {
                  draft.results.push(...data.results);
                }
              )
            );
            //update chaches pessimistically end
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetUpcomingMoviesQuery,
  useGetTrendingQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetGenresListQuery,
  useGetDetailsQuery,
  useGetRelatedVideosQuery,
  useGetRelatedCreditsQuery,
  useGetSimilarQuery,
  useGetRecommendationsQuery,
  useGetSearchResultQuery,
  useGetMoreSearchResultQuery,
  useGetDiscoverResultQuery,
  useGetMoreDiscoverResultQuery,
} = globalApi;
