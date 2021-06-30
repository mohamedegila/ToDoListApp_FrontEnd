import React from "react";
import Pagination from "react-js-pagination";

function Info(props) {

  const getData=(pageNumber, path)=>{
    props.getPaginationInfo(pageNumber, path);
  }
  return (
    <React.Fragment>

    

      <div className="task-stats ">
        <div className="row justify-content-between">
        <div className="col-2">
            Tasks <span className="badge bg-primary p-1">{ props.data.total}</span>
          </div>
        <div className="col-4">
        <Pagination
        activePage={props.data.current_page}
        itemsCountPerPage={props.data.per_page}
        totalItemsCount={props.data.total}
        onChange={(pageNumber) => getData(pageNumber, props.data.path)}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="First"
        lastPageText="Last"
      />
          </div>
          

          <div className="col-2">
            Completed <span span className="badge bg-info p-1">{props.completedData}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Info;
