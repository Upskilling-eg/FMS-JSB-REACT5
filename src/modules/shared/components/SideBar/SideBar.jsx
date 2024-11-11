import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/3.png";

export default function SideBar() {
  const [isCollapse, setIsCollapse] = useState(false);
  let toggleCollpase = () => {
    setIsCollapse(!isCollapse);
  };
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
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home mx-3" aria-hidden="true"></i>}
              component={<Link to="/dashboard/categories" />}
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
              component={<Link to="/login" />}
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
