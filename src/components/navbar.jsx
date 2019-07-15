import React, { Component } from "react";
import CategoryService from "./../services/category_service";

class Navbar extends Component {
  render() {
    const { status, data: categoryArray, pagination } = JSON.parse(
      CategoryService.getCategories()
    );
    const { currentCategory, noOfCartItems } = this.props;

    let currentCategoryId = false;
    if (currentCategory && currentCategory.id)
      currentCategoryId = currentCategory.id;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
          My site
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#my_site_navbar"
          aria-controls="my_site_navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="my_site_navbar">
          <ul className="navbar-nav mr-auto">
            {categoryArray.map(category => {
              const cName =
                currentCategoryId !== false && currentCategoryId === category.id
                  ? "nav-item active"
                  : "nav-item";

              return (
                <li className={cName} key={category.id}>
                  <a className="nav-link" href="#">
                    {category.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <span className="badge badge-pill badge-secondary">
          {noOfCartItems}
        </span>
      </nav>
    );
  }
}

export default Navbar;
