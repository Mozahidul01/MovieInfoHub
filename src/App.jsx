import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useGetGenresListQuery } from "./features/global/globalApi";
import { setGenres } from "./features/global/globalSlice";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/index";
import SearchResult from "./pages/searchResult/index";
import Explore from "./pages/explore/index";

function App() {
  const dispatch = useDispatch();
  const movieGenresQuery = useGetGenresListQuery("movie");
  const tvGenresQuery = useGetGenresListQuery("tv");

  //Store genres list in redux store
  useEffect(() => {
    const movieGenres = movieGenresQuery.data?.genres || [];
    const tvGenres = tvGenresQuery.data?.genres || [];

    const allGenres = {};

    movieGenres.forEach((item) => (allGenres[item.id] = item));
    tvGenres.forEach((item) => (allGenres[item.id] = item));

    dispatch(setGenres(allGenres));
  }, [dispatch, movieGenresQuery.data, tvGenresQuery.data]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/:mediaType/:id"
            element={<Details />}
          />
          <Route
            path="/search/:query"
            element={<SearchResult />}
          />
          <Route
            path="/explore/:mediaType"
            element={<Explore />}
          />
          <Route
            path="/"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />
        </Route>
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
