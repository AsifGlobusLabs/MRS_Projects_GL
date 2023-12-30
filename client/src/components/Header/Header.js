import React from "react";
import { BsJustify } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header({ OpenSidebar }) {
  
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <a href="/" style={{ textDecoration: "none", color: "#9e9ea4" }}>
          <h2>
            Globus{" "}
            <span
              style={{
                backgroundColor: "#db0a0a",
                color: "white",
                padding: "5px",
              }}
            >
              Labs
            </span>
          </h2>
        </a>
      </div>
      <div className="header-right d-flex">
        <Link
          to={"/auth/login"}
          target="_blank"
          style={{
            textDecoration: "none"}}>
           <div
            style={{
              color: "#1B4242",
              marginRight: "15px",
              display: "flex",
              alignItems:"center",
            }}
          >
           <i class="fa-solid fa-right-to-bracket"style={{fontSize:"19px"}}></i>
              <span
                style={{ fontSize: "13px", marginLeft: "3px", fontWeight: 700 }}
              >
                LOGIN
              </span>
          </div>
        </Link>
        <Link to={"/auth/registration"} target="_blank" style={{ textDecoration: "none" }}>
          <div 
            style={{
              color: "#1B4242",
              marginRight: "15px",
              display: "flex",
              alignItems:"center",
            }}
          >
            <i class="fa-solid fa-address-card mx-1" style={{fontSize:"19px"}}></i>
              <span
                style={{ fontSize: "13px", marginLeft: "1px", fontWeight: 700 }}
              >
                REGISTER
              </span>
            
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;










// import React from "react";
// import { BsList } from "react-icons/bs";
// import { Link } from "react-router-dom";

// function Header({ OpenSidebar }) {
//   return (
//     <header id="header">
//       <div className="menu-btn" onClick={OpenSidebar}>
//         <BsList className="icon" />
//       </div>
//       <div className="header-left">
//         <a href="/" style={{ textDecoration: "none", color: "#9e9ea4" }}>
//           <h2>
//             Globus{" "}
//             <span
//               style={{
//                 backgroundColor: "#db0a0a",
//                 color: "white",
//                 padding: "5px",
//               }}
//             >
//               Labs
//             </span>
//           </h2>
//         </a>
//       </div>
//       <div className="header-right d-flex">
//         <Link
//           to={"/auth/login"}
//           target="_blank"
//           style={{
//             textDecoration: "none"}}>
//            <div
//             style={{
//               color: "#850000",
//               marginRight: "15px",
//               display: "flex",
//               alignItems:"center",
//             }}
//           >
//            <i class="fa-solid fa-right-to-bracket"style={{fontSize:"19px"}}></i>
//               <span
//                 style={{ fontSize: "13px", marginLeft: "3px", fontWeight: 700 }}
//               >
//                 LOGIN
//               </span>
//           </div>
//         </Link>
//         <Link to={"/auth/registration"} target="_blank" style={{ textDecoration: "none" }}>
//           <div 
//             style={{
//               color: "#850000",
//               marginRight: "15px",
//               display: "flex",
//               alignItems:"center",
//             }}
//           >
//             <i class="fa-solid fa-address-card mx-1" style={{fontSize:"19px"}}></i>
//               <span
//                 style={{ fontSize: "13px", marginLeft: "1px", fontWeight: 700 }}
//               >
//                 REGISTER
//               </span>
            
//           </div>
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default Header;
