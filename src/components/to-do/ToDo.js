import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";
import DisplayTasks from "./DisplayTasks";
import Info from "./Info";

function ToDO(props) {
  const [tasks, setTasks] = useState([]);
  const [errors,setErrors] = useState({});
  const [successFlag,setSuccessFlag] = useState(false);

  useEffect(() => {
    getTasksFromBackEnd();
  }, [errors,successFlag]);

  const getTasksFromBackEnd = () => {
    if (props.debugMode) console.log("### start -> getTasksFromBackEnd ###");
    fetch(`http://127.0.0.1:8000/api/v1/items`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.debugMode)
          console.log("Response ... /api/v1/items => ", response);

        let tasks = response.data.data.map((task) => {
          return {
            key: task["id"],
            id: task["id"],
            name: task["name"],
          };
        });

        setTasks(tasks);
      })

      .catch((error) => {
        console.log("getTasksFromBackEnd ... Error => ", error);
      });
    if (props.debugMode) console.log("### end ->  getTasksFromBackEnd ###");
  };

  const getEnteredTaskName = (taskName) => {
    if (props.debugMode) {
      console.log("getEnteredTaskName => ", taskName);
    }
    sendTasksToBackEnd(taskName);
  };

  const sendTasksToBackEnd = (taskName) => {
    var formdata = new FormData();
    formdata.append("name", taskName);

    fetch(`http://localhost:8000/api/v1/item/store`, {
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      body: formdata,
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.status === 200){
          setErrors({});
          setSuccessFlag(true);
          if (props.debugMode)
          console.log("Response ... /api/v1/item/store response.status === 200 => ", response);
        }else{
          setErrors(response.errors);
          setSuccessFlag(false);

          if (props.debugMode)
          console.log("Response ... /api/v1/item/store => ", response.errors);
        }
        
      })

      

      .catch((error) => {
        console.log("sendTasksToBackEnd ... Error => ", error);
      });
    if (props.debugMode) console.log("### end ->  sendTasksToBackEnd ###");
  };


  var validationErrors;
  var success;

  if(JSON.stringify(errors) != JSON.stringify({}))
  {   
    validationErrors = (<ul className="alert alert-danger text-center">
    {errors?Object.keys(errors).map(function(key) { return <li key={errors[key]}>{errors[key][0]}</li>}):''}
    </ul>);
  }else if(successFlag){   
    success = (<ul className="alert alert-success text-center">
    Task add successfully
    </ul>);
  }

  return (
    <React.Fragment>
      <title>To-Do List</title>
      <h1 className="text-center">To-Do List</h1>
      {validationErrors}
      {success}
      <div className="todo-container">
        <AddTask
          debugMode={props.debugMode}
          getEnteredTaskName={getEnteredTaskName}
        />
        <DisplayTask tasks={tasks} debugMode={props.debugMode} />
      </div>
      <Info debugMode={props.debugMode} />
    </React.Fragment>
  );
}

export default ToDO;
