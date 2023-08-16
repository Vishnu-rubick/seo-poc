import { Button, Form, Input } from "antd";
function Home() {
  const [businessForm] = Form.useForm();
  return (
    <div className="home-wrapper">
      <div>
        <h1>All things SEO</h1>
      </div>
      <div>Tell us more about your business</div>
      {/* <div>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div> */}
    </div>
  );
}

export default Home;
