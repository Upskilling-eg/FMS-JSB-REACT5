import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/3.png";

export default function SideBar() {
  const [isCollapse, setIsCollapse] = useState(false);
  let toggleCollpase = () => {
    setIsCollapse(!isCollapse);
  };
  const [isAuthorized, setIsAuthorized] = React.useState(() => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  return (
    <>
      <div className="sidebar-container ">
        <Sidebar collapsed={isCollapse}>
          <Menu>
            <MenuItem
              onClick={toggleCollpase}
              icon={<img src={logo} />}
              className="my-5 ms-2 logo-menu-item"
            ></MenuItem>

            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={<Link to="/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={<Link to="/recipes" />}
            >
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={<Link to="/categories" />}
            >
              Categories
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={
                <button
                  className="btn btn-link"
                  style={{ color: "red" }}
                  onClick={() => {
                    localStorage.clear();
                    setIsAuthorized(false);
                    navigate("/login", { replace: true });
                  }}
                ></button>
              }
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      ;
    </>
  );
}
