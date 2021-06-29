import React, { useEffect, useState } from "react";

function Info(pr) {
  return (
    <React.Fragment>
      <div className="task-stats ">
        <div className="row justify-content-between">
          <div className="col-10">
            Tasks <span className="badge bg-primary">0</span>
          </div>

          <div className="col">
            Completed{" "}
            <span span className="badge bg-info">
              0
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Info;
