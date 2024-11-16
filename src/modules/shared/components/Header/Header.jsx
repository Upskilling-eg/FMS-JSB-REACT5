import React from "react";
import HeaderGirl from "../../../../assets/images/header-girl.png";
import headerMan from "../../../../assets/images/header.png";
import { useLocation } from "react-router-dom";

export default function Header({ title, description }) {
  const location = useLocation();
  return (
    <div className="header-container p-5 row  align-items-center">
      <div className="caption col-md-6 text-white">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header-img col-md-6 text-end">
        <img
          className="img-fluid"
          src={location.pathname == "/dashboard" ? HeaderGirl : headerMan}
          alt=""
        />
      </div>
    </div>
  );
}
