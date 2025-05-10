import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import Progress from "../Progress";
export default function Material() {
  const [progress, setProgress] = useState(10);
  return (
    <div
      className=" rounded-xl  flex flex-col justify-center"
      style={{
        margin: "10px",
        padding: "20px",
        width: "20%",
        background: "#B2C6D5",
      }}
    >
      <h1
        className="rounded-full border-2 text-center flex items-center justify-center"
        style={{
          background: "white",
          color: "black",
          width: "50px",
          height: "50px",
          margin: "10px",
        }}
      >
        C++
      </h1>

      <h1 style={{ margin: "10px" }}>Programming Language C++</h1>
      <div style={{ margin: "10px" }}>
        <Progress />
      </div>

      <div className="flex flex-row justify-between items-center">
        <FavoriteIcon size={10} className="text-[red]" />
        <button style={{ padding: "5px" }} className="rounded-full">
          add to table
        </button>
      </div>
    </div>
  );
}
