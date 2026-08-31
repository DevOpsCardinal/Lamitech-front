import React from "react";


import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import Dashboard from "views/Dashboard";
import routes from '../routes'
import sidebarImage from "assets/img/sidebar-3.jpg";



function DashboardScreen() {


 

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
 

 
 

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" >
          <AdminNavbar />
          <div className="content">
          
            <Dashboard />
          </div>
          <Footer />
        </div>
      </div>
      
    </>
  );
}

export default DashboardScreen;
