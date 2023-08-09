import { useEffect } from 'react';
import './header-card.css';

function HeaderCard({ variant = "p0", }) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "p0":
        return "#FF2503";
      case "p1":
        return "#FF8400";
      case "p2":
        return "#FFBF00";
      default:
        return "#FF2503"; 
    }
  };
  return (
    <div className={`header-card ${variant}`}>
      <div className="title">
        <div
          className="circle"
          style={{ background: getBackgroundColor() }}
        ></div>
        <span>P0 Issues</span>
      </div>
      <span className="total">54</span>
    </div>
  );
}

export default HeaderCard