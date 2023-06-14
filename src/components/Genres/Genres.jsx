/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "./style.scss";

export default function Genres({ data }) {
  const { genres } = useSelector((state) => state.global);

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div
            key={g}
            className="genre"
          >
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
}
