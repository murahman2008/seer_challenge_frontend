import React, { Component } from "react";

class Sorter extends Component {
  handleSelectionChange = event => {
    const { onSelectChange } = this.props;
    onSelectChange(event.target.value);
  };

  render() {
    const { pageType, elementType, options, defaultValue } = this.props;
    let html = null;

    if (pageType === "home") {
      if (options.length > 0) {
        const optionsHTML = options.map(opt => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.displayText}
            </option>
          );
        });

        html = (
          <select onChange={this.handleSelectionChange} value={defaultValue}>
            {optionsHTML}
          </select>
        );
      }
    }

    return <React.Fragment>{html}</React.Fragment>;
  }
}

export default Sorter;
