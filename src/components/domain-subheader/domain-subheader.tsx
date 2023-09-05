import { Select } from "antd";
import { useEffect, useState } from "react";
import CalenderLogo from "../../assets/seo-overview/calender.svg";
import "./domain-subheader.scss"

function DomainSubheader() {
  const [domainTitle, setDomainTitle] = useState<string | null>("");
  useEffect(() => {
   if (localStorage.getItem("domain")) {
     setDomainTitle(localStorage.getItem("domain"));
   }
  }, []);
  return (
    <div className="seo-overview-subheader">
      <span className="website-name">
        {/* <a href="https://www.textmercato.com/">www.textmercato.com</a> */}
        {domainTitle}
      </span>
      <div className="update-freq-container">
        <img className="history-logo" src={CalenderLogo} alt="" />
        {/* <span>Update Frequency:</span> */}
        <Select
          defaultValue="monthly"
          style={{ width: 120 }}
          disabled
          //  onChange={handleChange}
          className="custom-select"
          options={[
            { value: "fortnight", label: "Fortnight" },
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
            { value: "halfyearly", label: "Half Yearly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
      </div>
    </div>
  );
}

export default DomainSubheader;
