import React from "react";
import logo from "@assets/sponge_bob.png";
import "@styles/styles.scss";
import environment from "@environment";

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="container">
      <h1>{environment.SITE_NAME}</h1>
      <img src={logo} alt="JCBD" />
    </div>
  );
};

export default App;
