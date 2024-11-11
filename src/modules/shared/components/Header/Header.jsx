import React from "react";
import logo from "../../../../assets/images/header.png";

export default function Header({ title, description }) {
  return (
    <div className="header-container p-5 d-flex justify-content-between align-items-center">
      <div className="caption w-50 text-white">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header-img">
        <img src={logo} alt="" />
      </div>
    </div>
  );
}
