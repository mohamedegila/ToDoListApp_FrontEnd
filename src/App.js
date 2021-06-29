import React, { useEffect, useState } from "react";
import "./App.css";
import ToDO from "./components/to-do/ToDo";

function App() {
  const [debugMode, setDebugMode] = useState(true);
  return (
    <div className="container">
      <ToDO debugMode={debugMode}/>
    </div>
  );
}

export default App;
