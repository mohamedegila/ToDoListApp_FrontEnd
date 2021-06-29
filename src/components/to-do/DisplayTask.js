import React, { useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
function DisplayTask(props) {

  useEffect(() => {

  }, []);


  const onClickDeleteHandler = (event)=>{
    if(props.debugMode){
       console.log("Delete task id = ",event.target.id);
    }
   
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.getTaskIDToDelete(event.target.id)
        },
        {
          label: 'No',
          
        }
      ]
    });


  }

  
  const onClickEditHandler = (event)=>{

    if(props.debugMode){
      console.log("Edit task id = ",event.target.id);
    }

  }
  if (props.tasks.length > 0) {
    var tasks = props.tasks.map((task) => {
      return (
        <React.Fragment>
          <div className="tasks-content">
            <div className="row" key={task.id}>
              <span className="task-box col-10 text-break">{task.name}</span>
              <span className="task-box col-1 text-danger"  
              onClick={onClickDeleteHandler}>
                <i className="fas fa-trash" id={task.id}></i>
              </span>
              <span className="task-box col-1 text-info" onClick={onClickEditHandler} >
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
