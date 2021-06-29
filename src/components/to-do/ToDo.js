import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import AddTask from "./AddTask";
import DisplayTasks from "./DisplayTasks";
import Info from "./Info";

function ToDO() {
  return (
    <React.Fragment>
      <title>To-Do List</title>
      <h1 className="text-center">To-Do List</h1>
      <div className="todo-container">
        <AddTask />
        <DisplayTasks />
      </div>
      <Info />
    </React.Fragment>
  );
}

export default ToDO;
