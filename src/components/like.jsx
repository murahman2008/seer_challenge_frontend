import React, { Component } from "react";

class Like extends Component {
  render() {
    const { liked, onLikeClick } = this.props;
    let html = null;

    if (liked) html = <span onClick={() => onLikeClick()}>&#x2605;</span>;
    else html = <span onClick={() => onLikeClick()}>&#x2606;</span>;

    return <React.Fragment>{html}</React.Fragment>;
  }
}

export default Like;
