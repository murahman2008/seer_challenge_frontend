import React, { Component } from "react";

class Counter extends Component {
  state = {};

  style = {
    counterStyle: {
      color: "green",
      fontSize: 30
    },
    buttonStyle: {
      fontWeight: "bold",
      fontSize: 30
    }
  };

  //constructor() {
  //  super();
  //this.handleIncrement = this.handleIncrement.bind(this);
  //}

  render() {
    this.implementStyle();

    return (
      <React.Fragment>
        <h4>
          {this.props.children} # {this.props.counter.id}
        </h4>
        <span style={this.style.counterStyle} className="badge badge-primary">
          {this.formatCount()}
        </span>
        <button
          onClick={() => {
            this.props.onIncrement(this.props.counter.id);
          }}
          style={this.style.buttonStyle}
          className="btn btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          style={{ margin: 10 }}
        >
          Delete
        </button>
        <br />
        <br />
        {
          //tags.map(tag => {
          //  return <li key={tag.id}>{tag.value}</li>;
          //})
        }
      </React.Fragment>
    );
  }

  handleIncrement = product => {
    console.log(product);
    this.setState({ value: this.state.value + 1 });
  };

  someFunction() {
    console.log(this);
  }

  implementStyle() {
    if (this.props.counter.value === 0) {
      this.style.counterStyle = {
        color: "red",
        fontSize: 20
      };
    } else {
      this.style.counterStyle = {
        color: "green",
        fontSize: 20
      };
    }
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
