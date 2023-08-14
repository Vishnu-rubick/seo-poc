import { Input } from "antd";

interface CustomInputProps {
  /**
   *  What will be the placeholder of input.
   */
  placeholder: string;
  /**
   *  What will be the status of input.
   */
  status?: "" | "warning" | "error" | undefined;
 
}
/**
 * Primary UI component for user interaction
 */
const CustomInput = ({
  placeholder,
  status = "",
}: CustomInputProps) => <Input placeholder={placeholder} status={status} />;

export default CustomInput;
