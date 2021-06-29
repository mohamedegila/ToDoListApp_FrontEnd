import React, { useState,useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import { Modal,Button } from 'react-bootstrap';

function DisplayTask(props) {

  const [show, setShow] = useState(false);

  const [task, setTask] = useState({});


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, []);

  const getTaskFromBackEnd = (id) => {
    if (props.debugMode) console.log("### start -> getTasksFromBackEnd ###");
    fetch(`http://127.0.0.1:8000/api/v1/item/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
       console.log("edit -> ",response.data.name)
        setTask(response)
      })

      .catch((error) => {
        console.log("getTasksFromBackEnd ... Error => ", error);
      });

  };

  const onClickDeleteHandler = (event) => {
    if (props.debugMode) {
      console.log("Delete task id = ", event.target.id);
    }

    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
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

  const onClickCompletedHandler = (event) => {props.getTaskStatus(event.target.id);};

  const onClickEditHandler = (event) => {
    if (props.debugMode) {
      console.log("Edit task id = ", event.target.id);
    }
    getTaskFromBackEnd( event.target.id);
    setShow(true);
  };
  if (props.tasks.length > 0) {
    var tasks = props.tasks.map((task) => {
      return (
        <React.Fragment>
          
          {/* model */}

         

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><lablel>Task name: </lablel> <input type="text"/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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
                  (task.completed ? " text-decoration-line-through " : "")
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
