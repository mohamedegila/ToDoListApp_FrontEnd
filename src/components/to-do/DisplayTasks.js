import React, { useEffect, useState } from "react";
import DisplayTask from "./DisplayTask.js";

function DisplayTasks(props) {
  return (
    <React.Fragment>

   

      <DisplayTask tasks={props.tasks} debugMode={props.debugMode}/>
    </React.Fragment>
  );
}

export default DisplayTasks;
