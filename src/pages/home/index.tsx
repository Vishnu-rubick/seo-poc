import { Alert, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeFormImg from "../../assets/home-module/home-form-img.svg";
import AppHeader from "../../components/app-header/app-header";
import "./home.scss";

interface HomeProps {
  redirect?: boolean
}

function Home({
  redirect = true
}: HomeProps) {
  const [businessForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 15 } };
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };
  const [competitors, setCompetitors] = useState<{}[]>([]);
  const navigate = useNavigate();

 const getConfigAndRedirect= ()=>{
   axios
     .get(`${import.meta.env.VITE_API_BASE_URL}/project/config`)
     .then((configResponse) => {
       let config = configResponse?.data;
       let present = config.domain.length;
       if (present) {
         if (config?.projectId)
           localStorage.setItem("projectId", config?.projectId);
           localStorage.setItem("domain", config?.domain);
         if (redirect) navigate("/module-details");
       }
     })
     .catch((error) => {
       console.error(error);
       <Alert message="Somthing went wrong" type="error" />;
     });
 }
  useEffect(() => {
    getConfigAndRedirect();
  }, []);

  interface CompetitorsObject {
    domain: string;
    industry: string;
    geography: string;
    [key: string]: string[] | string;
  }

  const transformCompetitorsObject = (
    input: CompetitorsObject
  ): CompetitorsObject => {
    const competitors: string[] = [];

    for (const key in input) {
      if (key.startsWith("competitor")) {
        const value = input[key];
        if (typeof value === "string") {
          competitors.push(value);
        } else if (Array.isArray(value)) {
          competitors.push(...value);
        }
        delete input[key];
      }
    }

    return {
      ...input,
      competitors,
    };
  };

  const handleOnFinish = () => {
    const inputObject = businessForm.getFieldsValue();
    const transformedObject = transformCompetitorsObject(inputObject);
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/project/config`,
        transformedObject
      )
      .then((response) => {
          redirect = true;
          getConfigAndRedirect();
      })
      .catch((error) => {
        console.error("Error:", error);
        <Alert message={error} type="error" />;
      });
  };

  const handleAddCompetitor = () => {
    setCompetitors([...competitors, {}]);
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
                onFinish={handleOnFinish}
              >
                <Form.Item
                  label="Domain"
                  name="domain"
                  rules={[
                    {
                      required: true,
                      message: "Please input your domain!",
                    },
                    {
                      pattern: /^(?!www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid domain format",
                    },
                  ]}
                >
                  <Input
                    className="custom-input"
                    placeholder="Enter Domain URL"
                  />
                </Form.Item>
                <Form.Item
                  label="Industry"
                  name="industry"
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
                      { value: "e-commerce", label: "E-commerce" },
                      { value: "education", label: "Education" },
                      { value: "technology", label: "Technology" },
                      { value: "finance", label: "Finance" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Geography"
                  className="mandatory-field"
                  name="geography"
                  rules={[
                    {
                      required: true,
                      message: "Please input your geography!",
                    },
                  ]}
                >
                  <Select
                    className="custom-select"
                    placeholder="Choose Geography"
                    options={[
                      { value: "india", label: "India" },
                      // { value: "", label: "" },
                      // { value: "", label: "" },
                      // { value: "", label: "", disabled: true },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Competitor 1"
                  className="mandatory-field"
                  name="competitor1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your competitor 1!",
                    },
                    {
                      pattern: /^(?!www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid domain format",
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
                  name="competitor2"
                  className="mandatory-field"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Competitor 2!",
                    },
                    {
                      pattern: /^(?!www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid domain format",
                    },
                  ]}
                >
                  <Input
                    className="custom-input"
                    placeholder="Enter competitor 2"
                  />
                </Form.Item>

                {competitors.map((competitor, index) => (
                  <Form.Item
                    key={index}
                    label={`Competitor ${index + 3}`}
                    name={`competitor${index + 3}`}
                    className="mandatory-field"
                    rules={[
                      {
                        required: true,
                        message: `Please input competitor ${index + 3}!`,
                      },
                      {
                        pattern: /^(?!www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid domain format",
                      },
                    ]}
                  >
                    <Input
                      className="custom-input"
                      placeholder={`Enter competitor ${index + 3}`}
                    />
                  </Form.Item>
                ))}

                <Button className="add-btn" onClick={handleAddCompetitor}>
                  Add competitor
                </Button>

                <div className="btns-wrapper">
                  <Form.Item {...buttonItemLayout}>
                    <Button type="primary">Cancel</Button>
                  </Form.Item>
                  <Form.Item {...buttonItemLayout}>
                    <Button
                      onClick={() => {
                        businessForm.submit();
                      }}
                      type="primary"
                      htmlType="submit"
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
