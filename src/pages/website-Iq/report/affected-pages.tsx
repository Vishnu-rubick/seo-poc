import CircleLogo from "../../../assets/WebsiteIq/circle-logo.svg";
import CustomTable from "../../../components/custom-table/custom-table";
import "./affected-pages.scss";

function AffectedPages() {
  return (
    <div className="affected-pages-wrapper">
      <div className="affected-pages-header">
        <div className="left-content-wrapper">
          <h2>Total Checks</h2>
          <div className="left-content">
            <img className="circle-logo" src={CircleLogo} alt="" />
            <div className="values-container">
              <p>
                Failed: <span style={{ color: "#FF595E" }}>105</span>
              </p>
              <p>
                Successful: <span style={{ color: "#58AA19" }}>23,457</span>
              </p>
            </div>
          </div>
        </div>

        <div className="right-content">
          <h2>105</h2>
          <p>Total issues found</p>
        </div>
      </div>
      <CustomTable />
    </div>
  );
}

export default AffectedPages;
