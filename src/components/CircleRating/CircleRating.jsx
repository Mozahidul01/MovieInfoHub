/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

export default function CircleRating({ rating }) {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor:
            rating < 4.5
              ? "var(--red)"
              : rating < 7
              ? "var(--yellow)"
              : "var(--green)",
        })}
      />
    </div>
  );
}
