import React, { Component } from "react";
import Like from "./like";

class Product extends Component {
  displayRemoveCart = () => {
    let html = null;
    const { product, shoppingCart, onRemoveFromCart } = this.props;

    if (product.id in shoppingCart && shoppingCart[product.id].count > 0)
      html = (
        <button
          onClick={() => onRemoveFromCart(product, 1)}
          className="btn btn-sm btn-danger"
        >
          -
        </button>
      );

    return html;
  };

  render() {
    const { displayMode, product, onAddToCart, onLikeClick } = this.props;
    const { image_small, id, name, stock, category } = product;
    let html = null;

    const removeCartHTML = this.displayRemoveCart();

    if (displayMode === "thumbnail") {
      html = (
        <React.Fragment>
          <div className="col-xs-12">
            <img src={image_small} alt="" />
          </div>
          <div className="col-xs-12">Name: {name}</div>
          <div className="col-xs-12">Stock: {stock}</div>
          <div className="row">
            <div className="col-xs-4">
              <button
                onClick={() => {
                  return onAddToCart(product, 1);
                }}
                className="btn btn-primary btn-sm"
              >
                +
              </button>
            </div>
            <div className="col-xs-4">{removeCartHTML}</div>
            <div className="col-xs-4">
              <Like
                onLikeClick={() => {
                  //console.log(product);
                  return onLikeClick(product);
                }}
                liked={product.favourite}
              />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      html = (
        <React.Fragment>
          <div className="col-xs-12 col-md-6">
            <img alt="Product" src={product.image_small} />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="col-xs-12">{product.id}</div>
            <div className="col-xs-12">{product.name}</div>
            <div className="col-xs-12">{product.description}</div>
            <div className="col-xs-12">{product.category.name}</div>
            <div className="row">
              <div className="col-xs-6">
                <button
                  onClick={() => {
                    return onAddToCart(product, 1);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  +
                </button>
              </div>
              <div className="col-xs6">{removeCartHTML}</div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return html;
  }
}

export default Product;
