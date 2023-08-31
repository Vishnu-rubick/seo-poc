import CustomInput from "./CustomInput";
const meta = {
  title: "Example/CustomInput",
  component: CustomInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      options: ["warning", "error"],
      control: { type: "radio" },
    },
    // minLength: {
    //   control: { type: "number" },
    // },
  },
};
export default meta;

export const DefaultInput = (args: any) => (
  <CustomInput placeholder="Enter input here" {...args} status="" />
);
export const WarningInput = (args: any) => (
  <CustomInput placeholder="Enter Input here" status="warning" {...args} />
);
export const ErrorInput = (args: any) => (
  <CustomInput placeholder="Enter Input here" status="error" {...args} />
);
