import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
export default function AuthLayout() {
  const [isAuthorized, setIsAuthorized] = React.useState(() => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isAuthorized) {
      navigate("/dashboard");
    }
  }, [isAuthorized]);
  return (
    <>
      {!isAuthorized && (
        <div className="auth-container">
          <div className="container-fluid bg-overlay">
            <div className="row vh-100 justify-content-center align-items-center">
              <div className="col-lg-4 col-md-6  bg-white rounded rounded-2 px-5 py-3">
                <div className="logo-container text-center">
                  <img className="w-75" src={logo} alt="" />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
