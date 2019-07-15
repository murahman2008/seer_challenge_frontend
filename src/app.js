import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//import Counter from "./components/counter.js";
//import Navbar from "./components/navbar";
//import Products from "./components/products";
//import ProductService from "./services/product_service";
import Bookings from "./components/bookings";
import BookingUpload from "./components/booking_upload";
//import "./styles.css";

class App extends Component {
  state = {
    shoppingCart: {},
    syncWithBackend: false
  };

  /*
  constructor(props) {
    super(props);
  }
  */

  componentDidMount() {
    // const shoppingCart = ProductService.getShoppingCart();
    // this.setState({ shoppingCart: shoppingCart });
  }

  componentDidUpdate(previousProps, previousState) {
    //console.log("fasdfds", ProductService.getShoppingCart());
    // if (
    //   this.state.syncWithBackend &&
    //   _.isEqual(this.state.shoppingCart, previousState.shoppingCart) === false
    // ) {
    //   const status = ProductService.setShoppingCart(this.state.shoppingCart);
    //   if (status === false)
    //     this.setState({
    //       syncWithBackend: false,
    //       shoppingCart: ProductService.getShoppingCart()
    //     });
    // }
    //console.log("1`23121", ProductService.getShoppingCart());
  }

  // handleAddToCart = (product, count = 1) => {
  //   const shoppingCart = JSON.parse(JSON.stringify(this.state.shoppingCart));
  //   if (product.id in shoppingCart) shoppingCart[product.id].count += count;
  //   else shoppingCart[product.id] = { count: count, product: product };

  //   this.setState({ syncWithBackend: true, shoppingCart: shoppingCart });
  // };

  // handleRemoveFromCart = (product, count = 1) => {
  //   const shoppingCart = JSON.parse(JSON.stringify(this.state.shoppingCart));
  //   if (product.id in shoppingCart) {
  //     shoppingCart[product.id].count -= count;
  //     if (shoppingCart[product.id].count <= 0) delete shoppingCart[product.id];
  //   }

  //   this.setState({ syncWithBackend: true, shoppingCart: shoppingCart });
  // };

  render() {
    // const totalNumberOfProductOnCart = this.getTotalNumberOfProductsOnCartForDisplay();
    return (
      <Switch>
        <Route path="/bookings/upload" exact component={BookingUpload} />
        <Route path="/bookings" component={Bookings} />
        <Route
          path="/"
          render={() => {
            return (
              <React.Fragment>
                <h1>Booking System</h1>
                <h4>
                  To go to see all the bookings go to
                  <a href="https://gpjn6.codesandbox.io/bookings/">Here</a>
                </h4>
                <h4>
                  To go add bookings go to
                  <a href="https://gpjn6.codesandbox.io/bookings/upload">
                    Here
                  </a>
                </h4>
              </React.Fragment>
            );
          }}
        />
        {/* <Route
          path="/"
          render={props => {
            return (
              <React.Fragment>
                <Navbar
                  noOfCartItems={totalNumberOfProductOnCart}
                  currentCategory={{ id: 2 }}
                  {...props}
                />
                <main
                  role="main"
                  className="container"
                  style={{ marginTop: 90 }}
                >
                  <Products
                    pageType="home"
                    onAddToCart={this.handleAddToCart}
                    onRemoveFromCart={this.handleRemoveFromCart}
                    shoppingCart={this.state.shoppingCart}
                    pageNo="1"
                    {...props}
                  />
                </main>
              </React.Fragment>
            );
          }}
        /> */}
        <Redirect to="/" />
      </Switch>
    );
  }

  // getTotalNumberOfProductsOnCartForDisplay = () => {
  //   //console.log(this.state.shoppingCart);
  //   const shoppingCartArray = this.state.shoppingCart;
  //   const totalNumberOfProductOnCart = Object.keys(shoppingCartArray).reduce(
  //     (result, itemIndex) => {
  //       return (result += shoppingCartArray[itemIndex].count);
  //     },
  //     0
  //   );
  //   return totalNumberOfProductOnCart;
  // };
}

export default App;
