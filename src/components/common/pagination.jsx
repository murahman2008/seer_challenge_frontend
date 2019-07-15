import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  generateHTML = () => {
    const {
      onPaginate,
      pageNo,
      pageSize,
      totalCount,
      totalPages,
      showPreviousNext,
      showFirstLast,
      range
    } = this.props;

    let html = null;

    if (pageNo < 0 || pageNo > totalPages) return "Current page no is invalid";

    const tailArray = [];
    const headArray = [];
    let showPrevious = false;
    let showNext = false;

    let startPoint = (pageNo * 1 + 1 * 1) * 1;
    let endPoint = (pageNo * 1 + range * 1) * 1;

    for (let i = startPoint; i <= endPoint; i++) {
      if (i > totalPages) break;
      tailArray.push(i);
    }

    startPoint = pageNo - 1;
    endPoint = pageNo - range;
    for (let i = pageNo - 1; i >= endPoint; i--) {
      if (i <= 0) break;
      headArray.push(i);
    }

    let paginationArray = headArray.concat([pageNo], tailArray);
    paginationArray.sort();

    if (showPreviousNext) {
      if (headArray.length > 0) showPrevious = true;
      if (tailArray.length > 0) showNext = true;
    }

    html = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {showPrevious ? (
            <li key="pagination_previous" className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => onPaginate(pageNo - 1)}
              >
                Prev
              </a>
            </li>
          ) : (
            ""
          )}
          {paginationArray.map(p => {
            return (
              <li
                key={"pagination_" + p}
                className={"page-item" + (p === pageNo ? " active" : "")}
              >
                <a className="page-link" href="#" onClick={() => onPaginate(p)}>
                  {p}
                </a>
              </li>
            );
          })}

          {showNext ? (
            <li key="pagination_next" className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => onPaginate((pageNo * 1 + 1 * 1) * 1)}
              >
                Next
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    );

    return html;
  };

  render() {
    return <React.Fragment>{this.generateHTML()}</React.Fragment>;
  }
}

Pagination.propTypes = {
  onPaginate: PropTypes.func.isRequired,
  pageNo: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  showPreviousNext: PropTypes.bool,
  showFirstLast: PropTypes.bool,
  range: PropTypes.number.isRequired
};

export default Pagination;
