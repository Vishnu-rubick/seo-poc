import { useEffect } from 'react';
import './header-card.css';

function HeaderCard({ variant = "P0", value = 0 }) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "P0":
        return "#FF2503";
      case "P1":
        return "#FF8400";
      case "P2":
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
        <span>{variant} Issues</span>
      </div>
      <span className="total">{value}</span>
    </div>
  );
}

export default HeaderCard