import React, { useState } from "react";
import "./App.css";
import ToDO from "./components/to-do/ToDo";

function App() {
  const [debugMode] = useState(true);
  return (
    <div className="container">
      <ToDO debugMode={debugMode}/>
    </div>
  );
}

export default App;
