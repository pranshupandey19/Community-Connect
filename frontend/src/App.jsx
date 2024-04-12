import React from "react";
import AllRoutes from "./components/Routes/AllRoutes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="container">
      <Navbar/>
      <AllRoutes />
    </div>
  );
}
