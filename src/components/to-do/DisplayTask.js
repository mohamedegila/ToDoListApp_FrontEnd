import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Modal, Button } from "react-bootstrap";

function DisplayTask(props) {
  // state initialization
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState("");

  const [completedTask, setCompletedTask] = useState(0);
  const [taskN, setTask] = useState("");
  const [taskID, setTaskID] = useState(0);

  /*************************************************************************
   * Name        : handleClose                                             *
   * Params      : None                                                    *
   *                                                                       *
   * return      : None                                                    *
   *                                                                       *
   * Description : Function to Handel onClick event and set show to false  *
   *               to close confirmation modal                             *
   *                                                                       *
   *               this function called on event                           *
   *************************************************************************/
  const handleClose = () => setShow(false);

  /***************************************************************************
   * Name        : handleUpdate                                              *
   * Params      : event                                                     *
   *                                                                         *
   * return      : None                                                      *
   *                                                                         *
   * Description : Function to Handel onClick event and set show to false    *
   *               and call ' getTaskIDToEdit' from parent,                  *
   *               passing [taskID, taskName, completedTask]                 *
   *               and preventDefault                                        *
   *                                                                         *
   *               this function called on event                             *
   ***************************************************************************/
  const handleUpdate = (event) => {
    if (props.debugMode) console.log("Update => ", event.target.id);
    props.getTaskIDToEdit(taskID, taskName, completedTask);
    setShow(false);
    event.preventDefault();
  };

  /***************************************************************************
   * Name        : getTaskFromBackEnd                                        *
   * Params      : id -> Number                                              *
   *                                                                         *
   * return      : None                                                      *
   *                                                                         *
   * Description : Function to get data to selected edit task                *
   *                                                                         *
   ***************************************************************************/
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

  /*********************************************************************
   * Name        : onChangeTaskNameHandler                             *
   * Params      : event                                               *
   *                                                                   *
   * return      : None                                                *
   *                                                                   *
   * Description : Function to Handel onChang event and set task name  *
   *               entered value                                       *
   *                                                                   *
   *               this function called on event                       *
   *********************************************************************/
  const onChangeTaskNameHandler = (event) => {
    setTaskName(event.target.value);
  };

  /*********************************************************************
   * Name        : onChangeTaskCompletedHandler                        *
   * Params      : event                                               *
   *                                                                   *
   * return      : None                                                *
   *                                                                   *
   * Description : Function to Handel onClick event and set completed  *
   *               entered value                                       *
   *                                                                   *
   *               this function called on event                       *
   *********************************************************************/
  const onChangeTaskCompletedHandler = (event) => {
    setCompletedTask(event.target.value);
  };

  /*********************************************************************
   * Name        : onClickDeleteHandler                                *
   * Params      : event                                               *
   *                                                                   *
   * return      : None                                                *
   *                                                                   *
   * Description : Function to Handel onClick event and show           *
   *               confirmAlert to confirm delete task                 *
   *                                                                   *
   *               this function called on event                       *
   *********************************************************************/
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

  /*********************************************************************
   * Name        : onClickCompletedHandler                             *
   * Params      : event                                               *
   *                                                                   *
   * return      : None                                                *
   *                                                                   *
   * Description : Function to Handel onClick event and call           *
   *               'getTaskStatus' from parent passing task id         *
   *                                                                   *
   *               this function called on event                       *
   *********************************************************************/
  const onClickCompletedHandler = (event) => {
    props.getTaskStatus(event.target.id);
  };

  /**********************************************************************
   * Name        : onClickEditHandler                                   *
   * Params      : event                                                *
   *                                                                    *
   * return      : None                                                 *
   *                                                                    *
   * Description : Function to Handel onClick event and show edit modal *
   *               also it set id,show and call 'getTaskFromBackEnd'    *
   *                                                                    *
   *               this function called on event                        *
   **********************************************************************/
  const onClickEditHandler = (event) => {
    if (props.debugMode) {
      console.log("Edit task id = ", event.target.id);
    }
    setTaskID(event.target.id);
    getTaskFromBackEnd(event.target.id);
    setShow(true);
  };

  var tasks;
  //Handel if there's data to show or not
  if (props.tasks.length > 0) {
    tasks = props.tasks.map((task) => {
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
                      <option value="1" selected={completedTask === 1}>
                        yes
                      </option>
                      <option value="0" selected={completedTask === 0}>
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
    tasks = (
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
