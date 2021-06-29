import React, { useEffect, useState } from "react";

import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";

import Info from "./Info";

function ToDO(props) {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState([]);

  const [errors, setErrors] = useState({});
  const [successFlag, setSuccessFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);


  useEffect(() => {
    getTasksFromBackEnd();
  }, [errors, successFlag]);

  const getTasksFromBackEnd = () => {
    if (props.debugMode) console.log("### start -> getTasksFromBackEnd ###");
    fetch(`http://127.0.0.1:8000/api/v1/items`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.debugMode){

          console.log("Response ... /api/v1/items => ", response);
        }
          setData(response.data);
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

  const getTaskIDToDelete = (id) => {
    if (props.debugMode) {
      console.log("getTaskIDToDelete => ", id);
    }
    deleteTask(id);
  };

  const getTaskIDToEdit = (id) => {
    if (props.debugMode) {
      console.log("getTaskIDToEdit => ", id);
    }
    editTask(id);
  };

  const getPaginationInfo = (pNumber,path)=>{
    handelPagination(pNumber,path);
  }

  const handelPagination = (pNumber,path)=>{
    fetch(`${path}?page=${pNumber}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.debugMode){

          console.log("Response ... /api/v1/items => ", response);
        }
          setData(response.data);
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
  }
  const deleteTask = (id) => {
    fetch(`http://localhost:8000/api/v1/item/${id}`, {
      method: "DELETE",
      
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          setErrors({});
          setSuccessFlag(true);
          setDeleteFlag(true);
          if (props.debugMode)
            console.log(
              "Response ... /api/v1/item/store response.status === 200 => ",
              response
            );
        } else {
          setErrors(response.errors);
          setSuccessFlag(false);
          setDeleteFlag(false);

          if (props.debugMode)
            console.log("Response ... /api/v1/item/store => ", response.errors);
        }
      })

      .catch((error) => {
        console.log("sendTasksToBackEnd ... Error => ", error);
      });
    if (props.debugMode) console.log("### end ->  sendTasksToBackEnd ###");
  };

  const editTask = (id) => {
    console.log(id);
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
        if (response.status === 200) {
          setErrors({});
          setDeleteFlag(false);
          setSuccessFlag(true);
          if (props.debugMode)
            console.log(
              "Response ... /api/v1/item/store response.status === 200 => ",
              response
            );
        } else {
          setErrors(response.errors);
          setSuccessFlag(false);
          setDeleteFlag(false);

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

  if (JSON.stringify(errors) != JSON.stringify({})) {
    validationErrors = (
      <ul className="alert alert-danger text-center">
        {errors
          ? Object.keys(errors).map(function (key) {
              return <li key={errors[key]}>{errors[key][0]}</li>;
            })
          : ""}
      </ul>
    );
  } else if (successFlag) {

    if(deleteFlag){
      success = <ul className="alert alert-success text-center">Task deleted successfully</ul>
    }else
      success = <ul className="alert alert-success text-center">Task add successfully</ul>
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
        <DisplayTask
          tasks={tasks}
          debugMode={props.debugMode}
          getTaskIDToDelete={getTaskIDToDelete}
          getTaskIDToEdit={getTaskIDToEdit}
        />
      </div>
      <Info debugMode={props.debugMode} data={data} getPaginationInfo={getPaginationInfo}/>
    </React.Fragment>
  );
}

export default ToDO;
