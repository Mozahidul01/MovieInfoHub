/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + token,
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, headers }),

  tagTypes: [
    "UpcomingMovies",
    "Trending",
    "Popular",
    "TopRated",
    "GenresList",
    "Details",
    "RelatedVideos",
    "RelatedCredits",
    "Similar",
    "Recommendations",
  ],

  // Define the endpoints
  endpoints: (builder) => ({}),
});
