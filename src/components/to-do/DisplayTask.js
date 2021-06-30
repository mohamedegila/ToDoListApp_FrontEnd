import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import { Modal, Button } from "react-bootstrap";

function DisplayTask(props) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState("");

  const [completedTask, setCompletedTask] = useState(0);

  const [taskN, setTask] = useState("");
  const [taskID, setTaskID] = useState(0);

  const handleClose = () => setShow(false);
  const handleUpdate = (e) => {
    console.log("Update => ", e.target.id);
    props.getTaskIDToEdit(taskID,taskName,completedTask);
    setShow(false);
    e.preventDefault();
  };

  useEffect(() => {}, []);

  const getTaskFromBackEnd = (id) => {
    if (props.debugMode) console.log("### start -> getTasksFromBackEnd ###");
    fetch(`http://127.0.0.1:8000/api/v1/item/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("edit -> ", response.data.name);
        setTask(response.data.name);
        setTaskName(response.data.name);
        setCompletedTask(response.data.completed);
        forceUpdate();
      })

      .catch((error) => {
        console.log("getTasksFromBackEnd ... Error => ", error);
      });
  };

  const onChangeTaskNameHandler = (event) => {
    console.log("onClickTaskNameHandler -> ", event.target.value);
    setTaskName(event.target.value);
  };

  const onChangeTaskCompletedHandler = (event) => {
    console.log("onClickTaskCompletedHandler -> ", event.target.value);
    setCompletedTask(event.target.value);
  };

  const onClickDeleteHandler = (event) => {
    if (props.debugMode) {
      console.log("Delete task id = ", event.target.id);
    }

    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure you want to delete this task?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => props.getTaskIDToDelete(event.target.id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const onClickCompletedHandler = (event) => {
    props.getTaskStatus(event.target.id);
  };

  const onClickEditHandler = (event) => {
    if (props.debugMode) {
      console.log("Edit task id = ", event.target.id);
    }
    setTaskID(event.target.id);
    getTaskFromBackEnd(event.target.id);
    setShow(true);
  };
  if (props.tasks.length > 0) {
    var tasks = props.tasks.map((task) => {
      return (
        <React.Fragment>
          {/* model */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <React.Fragment>
                <form>
                  <div class="form-group">
                    Task name:{" "}
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      value={taskN}
                      disabled
                    />
                    New task name:{" "}
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      value={taskName}
                      onChange={onChangeTaskNameHandler}
                    />
                  </div>

                  <div className="form-group form-check">
                    Completed{" "}
                    <select
                      id="Country"
                      name="Country"
                      onChange={onChangeTaskCompletedHandler}
                    >
                      <option value="1" selected={completedTask == 1}>
                        yes
                      </option>
                      <option value="0" selected={completedTask == 0}>
                        no
                      </option>
                    </select>
                  </div>
                  {/* <button type="submit" class="btn btn-primary" id={task.id} onClick={handleUpdate}>Submit</button> */}
                </form>
              </React.Fragment>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary" id={task.id} onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>

          {/* model */}

          <div className="tasks-content">
            <div className="row" key={task.id}>
              <span
                id={task.id}
                className={
                  "task-box col-10 text-break" +
                  (task.completed ? " finished " : "")
                }
                onClick={onClickCompletedHandler}
              >
                {task.name}
              </span>
              <span
                className="task-box col-1 text-danger"
                onClick={onClickDeleteHandler}
              >
                <i className="fas fa-trash" id={task.id}></i>
              </span>
              <span
                className="task-box col-1 text-info"
                onClick={onClickEditHandler}
              >
                <i className="fas fa-edit" id={task.id}></i>
              </span>
            </div>
          </div>
        </React.Fragment>
      );
    });
  } else {
    var tasks = (
      <React.Fragment>
        <div className="tasks-content">
          <span className="no-tasks-message">No Tasks To Show</span>
        </div>
      </React.Fragment>
    );
  }
  return <React.Fragment>{tasks}</React.Fragment>;
}

export default DisplayTask;
