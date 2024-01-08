import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

// import MainRoutes from "./components/routes/MainRoutes";
import AuthenticationRoutes from "./components/routes/AuthenticationRoutes";
import Team from "./components/Team/Team";
import Home from "./components/home/Home";
import Assignment from "./components/assignment/Add_Assignment/Assignment";
import Task from "./components/task/Task";




function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";
  const isRegistration = location.pathname === "/auth/registration";
  const shouldRenderHeaderAndSidebar = !isLoginPage && !isRegistration;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (

    <div>
      {shouldRenderHeaderAndSidebar && (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            // openSidebarToggle={openSidebarToggle}
            // OpenSidebar={OpenSidebar}
          />
          <Routes>
            {/* Main Routes */}
            {/* <Route path="/" element={<MainRoutes />} /> */}
            <Route path="/" element={<Home />} />

            <Route path="/assignment" element={<Assignment />} />
            <Route path="/task" element={<Task />} />
            <Route path="/team" element={<Team />} />
 
          </Routes>
        </div>
      )}

      
      <Routes>
        <Route path="/auth/*" element={<AuthenticationRoutes />} />
</Routes>
</div>
  
  );
}
export default App;





