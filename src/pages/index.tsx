import React from "react";
import logo from "../assets/sponge_bob.png";
import "../styles.css";

const App = () => {
  return (
    <div className="container">
      <h1>{process.env.SITE_NAME}</h1>
      <h1>{process.env.API_URL}</h1>
      <img src={logo} alt="JCBD" />
    </div>
  );
};

export default App;
