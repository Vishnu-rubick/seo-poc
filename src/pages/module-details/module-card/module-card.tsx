import { Link } from "react-router-dom";
import "./module-card.scss";
function ModuleCard({ title, icon, para,linkTo }:any) {
  return (
    <div className="module-card">
      <img src={icon} alt="" />
      <h4>{title}</h4>
      <p>{para}</p>
      <Link className="link" to={linkTo}>Learn more</Link>
    </div>
  );
}

export default ModuleCard;
