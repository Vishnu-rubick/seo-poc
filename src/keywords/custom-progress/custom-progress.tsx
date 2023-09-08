import {Progress} from "antd";
import "./custom-progress.scss"

interface customProgressProps{
  value: string|number;
  title:string;
  percent: number;
}
function CustomProgress({value, title, percent}: customProgressProps) {
  return (
    <div className="custom-progress-wrapper">
      <p className="title">{title}</p>
      <Progress className="custom-progress" percent={percent} showInfo={false} />
      <p>{value}</p>
    </div>
  );
}

export default CustomProgress