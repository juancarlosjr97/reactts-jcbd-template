import React from "react";
import ReactDOM from "react-dom";

import Index from "@pages/index";
import ServiceWorker from "@services/service-worker/service-worker-service";

const rootElement = document.getElementById("root");

const Root = () => (
  <>
    <ServiceWorker />
    <Index />
  </>
);

ReactDOM.render(<Root />, rootElement);
