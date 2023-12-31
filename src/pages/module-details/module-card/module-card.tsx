import { Link } from "react-router-dom";
import "./module-card.scss";
function ModuleCard({ title, icon, para, onClick }:any) {
  return (
    <div className="module-card">
      <img src={icon} alt="" />
      <h4>{title}</h4>
      <p>{para}</p>
      <a className="link" onClick={onClick}>Learn more</a>
    </div>
  );
}

export default ModuleCard;
