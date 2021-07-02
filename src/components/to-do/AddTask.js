import React, { useState } from "react";

function AddTask(props) {
  // state initialization
  const [taskName, setTaskName] = useState("");

  /********************************************************************
   * Name        : onChangeHandler                                     *
   * Params      : event                                               *
   *                                                                   *
   * return      : None                                                *
   *                                                                   *
   * Description : Function to Handel onChang event and set task name  *
   *               entered value                                       *
   *                                                                   *
   *               this function called on event                       *
   *********************************************************************/

  const onChangeHandler = (event) => {
    if (props.debugMode) {
      console.log("Task Name => ", event.target.value);
    }
    setTaskName(event.target.value);
  };

  /******************************************************************
   * Name        : onClickHandler                                    *
   * Params      : None                                              *
   * return      : None                                              *
   *                                                                 *
   * Description : Function to call 'getEnteredTaskName' call-back   *
   *               from parent to pass entered task name for parent  *
   *               this function called on event                     *
   *******************************************************************/
  const onClickHandler = () => {
    if (props.debugMode) {
      console.log("Clicked ");
    }
    props.getEnteredTaskName(taskName);
  };
  return (
    <React.Fragment>
      <div className="add-task">
        <input type="text" onChange={onChangeHandler} />
        <span className="plus" onClick={onClickHandler}>
          <i className="fas fa-plus"></i>
        </span>
      </div>
    </React.Fragment>
  );
}

export default AddTask;
