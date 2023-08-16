import { Button, Checkbox, Input } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import FreqPrefix from "../../assets/frequency-input-prefix.png";
import LimitPrefix from "../../assets/limit-input-prefix.png";
import URLPrefix from "../../assets/url-input-prefix.png";
import OverviewImg from "../../assets/wesiteiq-info-img.png";
import AppHeader from "../../components/app-header/app-header";
import "./websiteIq.scss";

function Home() {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };
  const options = [
    { label: "Include subdomains", value: "Include subdomains" },
    { label: "Masked URLs", value: "Masked URLs" },
  ];
  return (
    <div className="websiteIq-wrapper">
      <AppHeader />
      <div className="home-container">
        <div className="instructions-container">
          <div className="instructions-header">
            <h1>WebsiteIQ</h1>
          </div>

          <p className="instructions-para">
            Enter your website URL below, define your crawl limit and Website IQ
            will do the rest. The time taken to generate this report depends on
            the number of pages being crawled. We will get back to you when the
            analysis is ready.
          </p>
          <div className="input-checkboxes-wrapper">
            <div className="inputs-container">
              <Input
                addonBefore={
                  <span
                    style={{
                      background: "#ffffff",
                      height: "25px",
                      display: "block",
                    }}
                  >
                    <img src={URLPrefix} alt="Icon" />
                  </span>
                }
                placeholder="Enter the domain URL"
                className="url-input"
              />
              <Input
                addonBefore={
                  <span
                    style={{
                      background: "#ffffff",
                      height: "25px",
                      display: "block",
                    }}
                  >
                    <img src={LimitPrefix} alt="Icon" />
                  </span>
                }
                placeholder="Crawl Limit"
                className="limit-input"
              />
              <Input
                addonBefore={
                  <span
                    style={{
                      background: "#ffffff",
                      height: "25px",
                      display: "block",
                    }}
                  >
                    <img src={FreqPrefix} alt="Icon" />
                  </span>
                }
                placeholder="Crawl Frequency"
                className="frequency-input"
              />
              <Button className="audit-btn" type="primary">
                Audit
              </Button>
            </div>
            <div className="checkboxes-container">
              <Checkbox.Group
                options={options}
                //  defaultValue={["Pear"]}
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <div className="info-container">
          <h1>
            Seamless <span style={{ color: "#00a6ed" }}>SEO</span> Audit:
            Resolving Technical Issues Swiftly!
          </h1>
          <div className="info-content-wrapper">
            <div className="img-container">
              <img src={OverviewImg} alt="" className="overview-img" />
            </div>
            <div className="info-content">
              <h2>Why WebsiteIQ ?</h2>
              <p>
                WebsiteIQ is a comprehensive analysis of all the issues on your
                website affecting your SEO score. The analysis simplifies and
                categorizes the issues, making the analysis actionable.
              </p>
              <p>
                With a clear breakdown of the type of issues, you can assign
                relevant owners to the tasks and maintain a targeted approach
                towards the health of your website. The issues can be html,
                https or even a piece of content that has to be changed on your
                website, the analysis will help you with the prioritization of
                SEO tasks to achieve maximum optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
