import { Link } from "react-router-dom";
import "./module-card.scss";

interface ModuleCardProps {
  /**
   *  What will be the title of the card
   */
  title: string;
  /**
   *  What will be the  iconof the card
   */
  icon: string;
  /**
   *  What will be the paragraph of the card
   */
  para: string;
  /**
   *  Where the card will be linked to
   */
  linkTo: string;
}
function ModuleCard({ title, icon, para, linkTo }: ModuleCardProps) {
  return (
    <div className="module-card">
      <img src={icon} alt="" />
      <h4>{title}</h4>
      <p>{para}</p>
      {/* <Link className="link" to={linkTo}>Learn more</Link> */}
    </div>
  );
}

export default ModuleCard;
