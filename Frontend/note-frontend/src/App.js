import React from "react";
import AllRoutes from "./Routes/AllRoutes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;

