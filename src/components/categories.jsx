import React, { Component } from "react";
import PropTypes from "prop-types";
import CategoryService from "./../services/category_service";

class Categories extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    const { pageType } = this.props;
    if (pageType === "home") {
      const { status, data } = JSON.parse(
        CategoryService.getCategories({ active: true }, {}, {})
      );
      if (status) this.setState({ categories: data });
    }
  }

  render() {
    const html = this.displayCategories();
    return <React.Fragment>{html}</React.Fragment>;
  }

  displayCategories = () => {
    let html = null;
    const { onCategorySelection, category } = this.props;
    console.log(category);

    const tmpCategoryArray = this.state.categories.map(c => {
      return Object.assign({}, c);
    });

    if (this.props.pageType === "home") {
      const categoryHTML = tmpCategoryArray.map(c => {
        return (
          <li
            key={c.id}
            className={
              c.id === category.id
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              onCategorySelection(c);
            }}
          >
            {c.name}
          </li>
        );
      });
      html = (
        <ul className="list-group">
          <li
            className={
              Object.keys(category).length === 0
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              this.props.onCategorySelection({});
            }}
          >
            All Categories
          </li>
          {categoryHTML}
        </ul>
      );
    }

    return html;
  };
}

Categories.propTypes = {
  onCategorySelection: PropTypes.func.isRequired,
  category: PropTypes.object
};

Categories.defaultProps = {
  category: {}
};

export default Categories;
