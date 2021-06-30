import React, { useEffect, useState } from "react";

import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";

import Info from "./Info";

function ToDO(props) {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState([]);
  const [completedData, setCompletedData] = useState(0);

  const [errors, setErrors] = useState({});
  const [successFlag, setSuccessFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);


  useEffect(() => {
    getTasksFromBackEnd();
    // getCompletedTasks();
  }, [errors, successFlag]);

  const getTaskStatus = (id) => {
    setTasksState(id);
    getTasksFromBackEnd();

  }
  const setTasksState = (id) => {
    fetch(`http://127.0.0.1:8000/api/v1/item/${id}/change-state`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setCompletedData(response.count);
        setTasks(tasks);
      })

      .catch((error) => {
        console.log("getTasksFromBackEnd ... Error => ", error);
      });
    if (props.debugMode) console.log("### end ->  getTasksFromBackEnd ###");
  };

  const getTasksFromBackEnd = () => {
    if (props.debugMode) console.log("### start -> getTasksFromBackEnd ###");
    fetch(`http://127.0.0.1:8000/api/v1/items`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.debugMode) {
          console.log("Response ... /api/v1/items => ", response);
        }
        setCompletedData(response.completed)
        setData(response.data);
        let tasks = response.data.data.map((task) => {
          return {
            key: task["id"],
            id: task["id"],
            name: task["name"],
            completed: task["completed"],

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

  const getTaskIDToEdit = (id,name,completed) => {
    if (props.debugMode) {
      console.log("getTaskIDToEdit => ", id,name,completed);
    }
    editTask(id,name,completed);
  };

  const getPaginationInfo = (pNumber, path) => {
    handelPagination(pNumber, path);
  };

  const handelPagination = (pNumber, path) => {
    fetch(`${path}?page=${pNumber}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.debugMode) {
          console.log("Response ... /api/v1/items => ", response);
        }
        setData(response);
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
  };
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
          setUpdateFlag(false);

          if (props.debugMode)
            console.log(
              "Response ... /api/v1/item/store response.status === 200 => ",
              response
            );
        } else {
          setErrors(response.errors);
          setSuccessFlag(false);
          setDeleteFlag(false);
          setUpdateFlag(false);

          if (props.debugMode)
            console.log("Response ... /api/v1/item/store => ", response.errors);
        }
      })

      .catch((error) => {
        console.log("sendTasksToBackEnd ... Error => ", error);
      });
    if (props.debugMode) console.log("### end ->  sendTasksToBackEnd ###");
  };

  const editTask = (id,name,completed) => {
    var formdata = new FormData();
   
    
    formdata.append('id',id);
    formdata.append('name',name);
    formdata.append('completed',completed);
    
    fetch(`http://127.0.0.1:8000/api/v1/item/${id}?_method=PUT`, {
        method: 'POST',
        headers: {'X-Requested-With':'XMLHttpRequest'},
        body: formdata
    }).then((response) => response.json())
    .then( response => {
        console.log("response.errors",response.errors);
        if(response.status === 200){
          setUpdateFlag(true);
          setErrors({});
          setDeleteFlag(false);
          setSuccessFlag(true);
            
        }else{
            setErrors(response.errors);

            
            setUpdateFlag(false);
            setDeleteFlag(false);
            setSuccessFlag(false); 
        }
    }).catch(error => {
        console.log("error",error);
        
        });
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
          setUpdateFlag(false);
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
          setUpdateFlag(false);


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
      <ul className="todo-container alert alert-danger text-center">
        {errors
          ? Object.keys(errors).map(function (key) {
              return <li key={errors[key]}>{errors[key][0]}</li>;
            })
          : ""}
      </ul>
    );
  } else if (successFlag) {
    if (deleteFlag) {
      success = (
        <ul className="todo-container alert alert-success text-center">
          Task deleted successfully
        </ul>
      );
    }else if (updateFlag) {
      success = (
        <ul className="todo-container alert alert-success text-center">
          Task updated successfully
        </ul>
      );
    } 
    else
      success = (
        <ul className="todo-container alert alert-success text-center">
          Task add successfully
        </ul>
      );
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
          getTaskStatus={getTaskStatus}
        />
      </div>
      <Info
        debugMode={props.debugMode}
        data={data}
        completedData={completedData}
        getPaginationInfo={getPaginationInfo}
      />
    </React.Fragment>
  );
}

export default ToDO;
