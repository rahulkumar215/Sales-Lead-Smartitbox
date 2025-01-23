import { useState } from "react";

function PopOver({ value, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <td
      onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
      onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
      style={{ position: "relative", cursor: "pointer" }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "-10px", // Adjust as needed
            left: "25px", // Adjust as needed
            padding: "5px 10px",
            backgroundColor: "#333",
            color: "#fff",
            fontSize: "12px",
            borderRadius: "4px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 1,
            whiteSpace: "nowrap",
            transform: "translate(-50%, -100%)", // Adjust positioning
          }}
        >
          {value}
        </div>
      )}
    </td>
  );
}

export default PopOver;
