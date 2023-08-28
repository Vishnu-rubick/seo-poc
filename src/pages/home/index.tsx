import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import HomeFormImg from "../../assets/home-module/home-form-img.svg";
import AppHeader from "../../components/app-header/app-header";
import "./home.scss";
import { useNavigate } from "react-router-dom";
function Home() {
  const [businessForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 15 } };
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };
  const [competitors, setCompetitors] = useState<{ num: number }[]>([]);
  const navigate= useNavigate();
  const handleAddCompetitor = () => {
    setCompetitors([{ num: 3 }]);
  };
  return (
    <div className="home-wrapper">
      <AppHeader />
      <div className="home-container">
        <div className="form-img-wrapper">
          <h1>All things SEO</h1>
          <img className="form-img" src={HomeFormImg} alt="" />
        </div>
        <div className="form-wrapper">
          <div className="form-container">
            <h2>Tell us more about your business</h2>
            <div className="business-form">
              <Form
                {...formItemLayout}
                layout="horizontal"
                form={businessForm}
                // initialValues={{ layout: formLayout }}
                style={{ maxWidth: 600, textAlign: "left" }}
                autoComplete="off"
                validateTrigger="onChange"
              >
                <Form.Item label="Domain">
                  <Input
                    className="custom-input"
                    placeholder="Enter Domain URL"
                  />
                </Form.Item>
                <Form.Item
                  label="Industry"
                  validateFirst
                  rules={[
                    {
                      required: true,
                      message: "Please input your industry!",
                    },
                  ]}
                  className="mandatory-field"
                >
                  <Select
                    className="custom-select"
                    //defaultValue="lucy"
                    placeholder="Choose industry"
                    // style={{ width: "100%" }}
                    // onChange={handleChange}
                    options={[
                      { value: "e-commerce", label: "e-commerce" },
                      { value: "education", label: "education" },
                      { value: "technology", label: "technology" },
                      { value: "finance", label: "finance", disabled: true },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Geography"
                  className="mandatory-field"
                  rules={[
                    {
                      required: true,
                      message: "Please input your geography!",
                    },
                  ]}
                >
                  <Select
                    className="custom-select"
                    //defaultValue="lucy"
                    placeholder="Choose Geography"
                    // style={{ width: "100%" }}
                    // onChange={handleChange}
                    options={[
                      { value: "", label: "India" },
                      { value: "", label: "" },
                      { value: "", label: "" },
                      { value: "", label: "", disabled: true },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Competitor 1"
                  className="mandatory-field"
                  rules={[
                    {
                      required: true,
                      message: "Please input your competitor 1!",
                    },
                  ]}
                >
                  <Input
                    className="custom-input"
                    placeholder="Enter competitor 1"
                  />
                </Form.Item>
                <Form.Item
                  label="Competitor 2"
                  className="mandatory-field"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Competitor 2!",
                    },
                  ]}
                >
                  <Input
                    className="custom-input"
                    placeholder="Enter competitor 2"
                  />
                </Form.Item>

                {competitors.length
                  ? competitors.map(() => (
                      <Form.Item label="Competitor 3">
                        <Input
                          className="custom-input"
                          placeholder="Enter competitor 3"
                        />
                      </Form.Item>
                    ))
                  : null}

                <Button className="add-btn" onClick={handleAddCompetitor}>
                  Add competitor
                </Button>

                <div className="btns-wrapper">
                  <Form.Item {...buttonItemLayout}>
                    <Button type="primary">Cancel</Button>
                  </Form.Item>
                  <Form.Item {...buttonItemLayout}>
                    <Button
                      onClick={() => navigate("/module-details")}
                      type="primary"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
