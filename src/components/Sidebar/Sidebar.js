
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/logoCardinal.jpg";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={'red'}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper" >
        <div className="logo d-flex align-items-center justify-content-start" >
          <a
           
            className="simple-text logo-mini mx-1"
          >
           
          </a>
          <a className="simple-text"  >
           <img src={require("assets/img/cardinalLogo3.jpg")} alt="..." style={{width: 100, heigth: 100,  borderRadius: 10 }}/>
           <img src={require("assets/img/locoCardinal5.png")} alt="..." style={{width: 100, heigth: 100,  borderRadius: 10 }}/>



          </a>
        </div>
        <img src={require("assets/img/locoCardinal5.png")} alt="..." style={{width: 200, heigth: 200,  borderRadius: 10, marginLeft: 20, marginTop: 200 }}/>
        
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
