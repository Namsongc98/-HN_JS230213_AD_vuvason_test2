import React from "react";

import "./style.scss";

function Input() {
  return (
    <div className="wp-input">
      <div className="input-name">
        <div className="acom">@</div>
        <input type="text" />
      </div>
      <div className="input-name">
        <div className="acom">@</div>
        <input type="Date" />
      </div>
      <select className="select">
        <option value=""> choose</option>
        <option value=""> pending</option>
        <option value="">fulfill </option>
        <option value="">Reject </option>
      </select>
      <div className="input-name">
        <div className="acom">@</div>

        <input type="text" />
      </div>

      <button className="post">post</button>
    </div>
  );
}

export default Input;
