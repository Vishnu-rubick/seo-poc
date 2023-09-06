import { Alert, Button, Checkbox, Form, Input, Select } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LimitPrefix from "../../assets/limit-input-prefix.png";
import URLPrefix from "../../assets/url-input-prefix.png";
import OverviewImg from "../../assets/wesiteiq-info-img.png";
import AppHeader from "../../components/app-header/app-header";
import "./websiteIq.scss";

function WebsiteIq() {
  const [auditForm] = Form.useForm();
  const [crawlSubdomains, setCrawlSubdomains] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/project/config`)
      .then((configResponse) => {
        let config = configResponse?.data;
        auditForm.setFieldValue("domain", config.domain);
      })
      .catch((error) => {
        console.error(error);
        <Alert message="Somthing went wrong" type="error" />;
      });
  }, []);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    const searchString = "crawlSubdomains";
    if (checkedValues.includes(searchString)) {
      setCrawlSubdomains(true);
    } else {
      setCrawlSubdomains(false);
    }
  };
  const options = [
    { label: "Include subdomains", value: "crawlSubdomains" },
    { label: "Masked URLs", value: "Masked URLs" },
  ];
  const onFinish = () => {
    setIsLoading(true);
    if (localStorage.getItem("projectId") && localStorage.getItem("domain")) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/site-audit/run`, {
          projectId: localStorage.getItem("projectId"),
          domain: auditForm.getFieldsValue().domain,
          pageLimit: auditForm.getFieldsValue().pageLimit,
          crawlFrequency: auditForm.getFieldsValue().crawlFrequency,
          crawlSubdomains,
        })
        .then((response) => {
          console.log("res => ", response)
          if(response?.status === 409){
            setError(response?.data?.message);
            const timer = setTimeout(() => {
              navigate('/seo-tools');
            }, 10000);
            return;
          }
          axios
            .get(
              `${
                import.meta.env.VITE_API_BASE_URL
              }/site-audit/campaign/${localStorage.getItem("projectId")}`
            )
            .then((response) => {
              navigate("/seo-tools");
            })
            .catch((error) => {
              <Alert message={error} type="error" />;
            });
        })
        .catch((error: any) => {
          console.error("Error:", error);
          if(error?.response?.request.status === 409){
            setError(error?.response?.data?.message);
            const timer = setTimeout(() => {
              navigate('/seo-tools');
            }, 10000);
          }
          else{
            <Alert message={error} type="error" />;
          }
        });
    } else {
      <Alert
        type="error"
        message="Somthing went wrong. Project id or domain not available."
      />;
    }
  };

  return (
    <div className="websiteIq-wrapper">
      <AppHeader />
      {error && <Alert message={error} type="error" />}
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
              <Form
                //  {...layout}
                name="audit-form"
                className="audit-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={auditForm}
                // validateTrigger="onchange"
                // validateFirst={true}
                autoComplete="off"
                validateTrigger="onChange"
              >
                <Form.Item name="domain" className="url-form-item">
                  <Input
                    disabled
                    prefix={
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
                    className="custom-input"
                  />
                </Form.Item>
                <Form.Item
                  required
                  name="pageLimit"
                  validateFirst
                  rules={[
                    { required: true, message: "Please input crawl limit!" },
                    {
                      pattern: /^(?:[1-9]\d{0,3}|10000)$/,
                      message: "Limit can be between 1-10000",
                    },
                  ]}
                  className="limit-form-item"
                  //  validateTrigger={["onChange"]}
                >
                  <Input
                    type="number"
                    prefix={
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
                    className="custom-input"
                  />
                </Form.Item>
                <Form.Item
                  name="crawlFrequency"
                  className="freq-form-item"
                  initialValue="monthly"
                >
                  <Select
                    defaultValue="monthly"
                    className="custom-select"
                    options={[
                      { value: "fortnight", label: "Fortnight" },
                      { value: "monthly", label: "Monthly" },
                      { value: "quarterly", label: "Quarterly" },
                      { value: "halfyearly", label: "Half Yearly" },
                      { value: "yearly", label: "Yearly" },
                    ]}
                  />
                </Form.Item>
                <Form.Item className="btn-form-item">
                  <Button
                    className="audit-btn"
                    type="primary"
                    onClick={() => auditForm.submit()}
                    loading={isLoading}
                  >
                    Audit
                  </Button>
                </Form.Item>
              </Form>
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

export default WebsiteIq;
