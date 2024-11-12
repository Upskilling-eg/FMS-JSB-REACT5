import React from "react";
import HeaderGirl from "../../../../assets/images/header-girl.png";
import headerMan from "../../../../assets/images/header.png";
import { useLocation } from "react-router-dom";

export default function Header({ title, description }) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="header-container p-5 d-flex justify-content-between align-items-center">
      <div className="caption w-50 text-white">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header-img">
        <img
          src={location.pathname == "/dashboard" ? HeaderGirl : headerMan}
          alt=""
        />
      </div>
    </div>
  );
}
