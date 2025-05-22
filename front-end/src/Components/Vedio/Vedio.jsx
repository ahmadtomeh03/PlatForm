import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Checked from "../Checked/Checked";

export default function Vedio({ numberOfLecture }) {
  return (
    <div
      className="flex flex-row items-center justify-between border-1 rounded-full border-#303841 "
      style={{ padding: "10px", margin: "10px" }}
    >
      <div className="flex flex-row cursor-pointer">
        <PlayCircleFilledWhiteIcon />
        <h1>Lecture #{numberOfLecture}</h1>
      </div>
      <Checked />
    </div>
  );
}
