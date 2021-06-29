import React, {useState } from "react";

function AddTask(props) {
  const [taskName, setTaskName] = useState("");

  const onChangeHandler = (data) => {
    if (props.debugMode) {
      console.log("Task Name => ", data.target.value);
    }
    setTaskName(data.target.value);
  };
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
