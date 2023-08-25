import "./overview-card.scss"
function OverviewCard({ img, arrow, title, val, id }: any) {
  return (
    <div className="overview-card-wrapper">
      {/* <div>
        <h2>26</h2>
        <p>Domain Authority</p>      
        <img src={MinGraph} alt="" />
      </div> */}
      <div className="card-container">
        <img
          className={`logo-img`}
          src={img}
          alt=""
        />
        <div className="content-wrapper">
          <span className="value-wrapper">
            <h2>{val}</h2>
            <img className={`inc-dec-logo ${id == 0 ? "rotate-80deg" : ""}`} src={arrow} alt="" />
          </span>
          <p className="title">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;
