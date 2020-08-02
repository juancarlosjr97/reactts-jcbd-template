import React from "react";
import ReactDOM from "react-dom";

import Index from "./pages";

const rootElement = document.getElementById("root");

const Root = () => (
  <>
    <Index />
  </>
);

ReactDOM.render(<Root />, rootElement);
