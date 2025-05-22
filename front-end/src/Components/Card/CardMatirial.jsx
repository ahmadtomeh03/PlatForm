import "./CardMatirial.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router-dom";
export default function CardMatirial({ nameOfCourse, description }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("details");
  };
  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="card__wrapper">
        <div className="card___wrapper-acounts">
          <div className="card__acounts">
            {/* <img src={logo} alt="" /> */}
            {nameOfCourse.charAt(0)}
          </div>
        </div>
        <div className="card__menu-buttons">
          <button className="btn-favorites" title="Add to Favorites">
            <FavoriteIcon />
          </button>
          <button className="btn-save" title="Save">
            <BookmarkAddIcon />
          </button>
        </div>
      </div>

      <div className="card__title">{nameOfCourse}</div>

      <div className="card__subtitle">{description}</div>

      <div className="card__indicator">
        {/* <span className="card__indicator-amount">135</span> Works /{" "} */}
        <span className="card__indicator-percentage">45%</span>
      </div>

      <div className="card__progress">
        <progress
          max="100"
          value="45"
          aria-label="Progress of works completed"
        ></progress>
      </div>
    </div>
  );
}
