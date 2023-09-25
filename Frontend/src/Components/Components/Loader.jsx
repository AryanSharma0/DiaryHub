import React from "react";
import "../../Styles/Loader.scss";
function Loader() {
  return (
    <div className="loader-body">
      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
    </div>
  );
}

export default Loader;
