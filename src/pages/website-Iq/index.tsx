import { Button, Checkbox, Form, Input, Select } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useEffect } from "react";
import LimitPrefix from "../../assets/limit-input-prefix.png";
import URLPrefix from "../../assets/url-input-prefix.png";
import OverviewImg from "../../assets/wesiteiq-info-img.png";
import AppHeader from "../../components/app-header/app-header";
import "./websiteIq.scss";

function WebsiteIq() {
  const [auditForm] = Form.useForm();
  localStorage.setItem("domain", "https://rubick.ai/");
  useEffect(() => {
    auditForm.setFieldValue("url", localStorage.getItem("domain"));
  }, []);
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };
  const options = [
    { label: "Include subdomains", value: "Include subdomains" },
    { label: "Masked URLs", value: "Masked URLs" },
  ];
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

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
                <Form.Item
                  name="url"
                  className="url-form-item"
                  // rules={[
                  //   { required: true, message: "Please input your URL!" },
                  // ]}
                >
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
                  name="crawl-limit"
                  validateFirst
                  rules={[
                    { required: true, message: "Please input crawl limit!" },
                    {
                      pattern: /^(?:[1-9]\d{0,3}|10000)$/,
                      message: "Limit can be between 1-10000"
                    }
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
                  name="crawl-freq"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input crawl frequency!",
                  //   },
                  // ]}
                  className="freq-form-item"
                >
                  {/* <Input
                    prefix={
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
                    className="custom-input"
                  /> */}
                  <Select
                    defaultValue="monthly"
                    // style={{ width: 120 }}
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
                </Form.Item>
                <Form.Item className="btn-form-item">
                  <Button
                    className="audit-btn"
                    type="primary"
                    htmlType="submit"
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
