import { Link } from "react-router-dom";
import LineLogo from "../../assets/backlinks/Line-logo.svg";
import BreadcrumbArrow from "../../assets/keywords/breadcrumb-arrow.svg";
import "./report-card.scss";
function ReportCard({
  value,
  title,
  color,
}: {
  value: number | string;
  title: string;
  color: string;
}) {
  return (
    <div className="report-card">
      <div>
        <p>
          <span className="circle" style={{ background: `${color}` }}></span>
          {title}
        </p>
        <h2>
          {value} <img src={LineLogo} alt="" />
          <div
            style={{
              color: `${color}`,
              border: `1px solid ${color}`,
              marginLeft: "12px",
              padding: "2px",
            }}
            className="percent-div"
          >
            0.4%
          </div>
        </h2>
      </div>
      <Link to="/backlinks/details">
        <img src={BreadcrumbArrow} alt="" />
      </Link>
    </div>
  );
}

export default ReportCard;
