import { Link } from "react-router-dom";
import "./overview-card.scss";

type OverviewCardProps = {
  img: string;
  arrow: string;
  title: string;
  val: string | number;
  id: string | number;
  linkTo?: string;
};

function OverviewCard({
  img,
  arrow,
  title,
  val,
  id,
  linkTo,
}: OverviewCardProps) {
  return (
    <Link to={linkTo ? linkTo : ""}>
      <div className="overview-card-wrapper">
        <div className="card-container">
          <img className={`logo-img`} src={img} alt="" />
          <div className="content-wrapper">
            <span className="value-wrapper">
              <h2>{val}</h2>
              <img
                className={`inc-dec-logo ${id === 0 ? "rotate-65deg" : ""}`}
                src={arrow}
                alt=""
              />
            </span>
            <p className="title">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OverviewCard;
