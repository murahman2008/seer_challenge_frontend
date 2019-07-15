import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 3 },
      { id: 3, value: 1 },
      { id: 4, value: 5 }
    ]
  };

  handleDelete = counterId => {
    console.log(counterId);
    let counters = this.state.counters;
    counters = counters.filter(counter => {
      return counter.id !== counterId;
    });

    this.setState({ counters: counters });
  };

  handleValueIncrement = (counterId, incrementedBy = 1) => {
    let counters = this.state.counters;
    const index = this.state.counters.findIndex(
      counter => counter.id === counterId
    );
    counters[index]["value"] += incrementedBy;
    this.setState({ counters: counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(counter => {
      counter.value = 0;
      //console.log(counter);
      return counter;
    });
    this.setState({ counters: counters });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.handleReset();
          }}
        >
          Reset
        </button>
        {this.state.counters.map(counter => {
          return (
            <Counter
              key={counter.id}
              counter={counter}
              onDelete={this.handleDelete}
              onIncrement={this.handleValueIncrement}
            >
              Title
            </Counter>
          );
        })}
      </div>
    );
  }
}

export default Counters;
