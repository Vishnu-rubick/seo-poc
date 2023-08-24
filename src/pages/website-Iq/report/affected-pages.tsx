import CircleLogo from "../../../assets/WebsiteIq/circle-logo.svg";
import CustomTable from "../../../components/custom-table/custom-table";
import "./affected-pages-wrapper.scss";

function AffectedPages() {
  return (
    <div className="affected-pages-wrapper">
      <div className="affected-pages-header">
        <div className="left-content">
          <img className="circle-logo" src={CircleLogo} alt="" />
          <div className="values-container">
            <p>Failed: 105</p>
            <p>Successful: 23,457</p>
          </div>
        </div>
        <div className="right-content">
          <h2>105</h2>
          <p>Total issues found</p>
        </div>
        <div></div>
      </div>
      <CustomTable />
    </div>
  );
}

export default AffectedPages;
