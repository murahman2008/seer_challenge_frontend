import React, { Component } from "react";
import Product from "./product";
import Categories from "./categories";
import Pagination from "./common/pagination";
import Sorter from "./common/sorter";
import ProductService from "./../services/product_service";
import CategoryService from "./../services/category_service";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    category: {},
    sort: "created_desc",
    pagination: {
      pageNo: 0,
      pageSize: 0,
      totalPages: 0
    }
  };

  componentDidMount() {
    if (this.props.pageType === "home") {
      const { pageNo, pageSize } = this.props;

      const { status, data, pagination } = JSON.parse(
        ProductService.getProducts(
          {},
          {},
          {
            pageNo: pageNo ? pageNo : 1,
            pageSize: pageSize ? pageSize : ProductService.DEFAULT_PAGE_SIZE
          }
        )
      );

      if (status)
        this.setState({
          pagination: pagination,
          products: data
        });
    }
  }

  handleCategorySelection = category => {
    //console.log(category);
    const sortArray = this.state.sort.split("_");
    let sort = {};

    if (sortArray.length > 0)
      sort = { orderBy: sortArray[0], direction: sortArray[1] };

    const { data, status, pagination } = JSON.parse(
      ProductService.getProducts({ category: category }, sort, {})
    );

    console.log(data);

    if (status)
      this.setState({
        products: data,
        pagination: pagination,
        category: category,
        sort: this.state.sort
      });
  };

  handlePagination = pageNo => {
    const { status, data, pagination } = JSON.parse(
      ProductService.getProducts(
        {},
        {},
        { pageNo: pageNo, pageSize: this.state.pagination.pageSize }
      )
    );
    if (status) this.setState({ products: data, pagination: pagination });
  };

  handleSortSelectChange = sortValue => {
    const sortArray = sortValue.split("_");
    const sort = { orderBy: sortArray[0], direction: sortArray[1] };

    const { data, status, pagination } = JSON.parse(
      ProductService.getProducts({ category: this.state.category }, sort, {})
    );

    if (status) {
      this.setState({
        products: data,
        category: this.state.category,
        sort: sortValue,
        pagination: pagination
      });
    }
  };

  render() {
    const html = this.generateDisplayData();
    const sortingOptions = [
      {
        value: "price_asc",
        displayText: "Price: Low to High"
      },
      {
        value: "price_desc",
        displayText: "Price: High to Low"
      },
      {
        value: "created_desc",
        displayText: "Date: New to Old"
      },
      {
        value: "created_asc",
        displayText: "Date: Old to New"
      }
    ];

    //console.log(ProductService.getAllProducts());
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xs-12 float-md-right ml-auto">
            <Sorter
              pageType={this.props.pageType}
              elementType="product"
              options={sortingOptions}
              defaultValue={this.state.sort}
              onSelectChange={this.handleSortSelectChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 hidden-xs">
            <Categories
              category={this.state.category}
              pageType={this.props.pageType}
              onCategorySelection={this.handleCategorySelection}
            />
          </div>
          <div className="col-md-9 col-xs-12">
            <div className="row">{html}</div>
          </div>
        </div>
        <Pagination
          pageNo={parseInt(this.state.pagination.pageNo)}
          pageSize={parseInt(this.state.pagination.pageSize)}
          totalPages={parseInt(this.state.pagination.totalPages)}
          showPreviousNext={true}
          range={2}
          onPaginate={this.handlePagination}
        />
      </React.Fragment>
    );
  }

  handleFavouriteClick = product => {
    const status = ProductService.toggleFavourite(Object.assign({}, product));

    if (status) {
      const tempProducts = this.state.products.map(p => {
        return Object.assign({}, p);
      });

      const index = tempProducts.findIndex(p => p.id === product.id);
      tempProducts[index].favourite = !tempProducts[index].favourite;
      this.setState({ products: tempProducts });
    }
  };

  generateDisplayData = () => {
    //console.log(this.state.products);
    let {
      criteria,
      product,
      products,
      category,
      pageType,
      onAddToCart,
      onRemoveFromCart,
      shoppingCart
    } = this.props;
    let html = null;

    if (product && product.id && pageType === "product_details_page") {
      product = ProductService.getProduct(product.id);
      html = (
        <Product
          displayMode="full"
          product={product}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          shoppingCart={shoppingCart}
        />
      );
    } else {
      if (pageType === "home") {
        const tempProducts = this.state.products.map(p => {
          return Object.assign({}, p);
        });

        html = tempProducts.map(p => {
          return (
            <div className="col-xs-12 col-lg-3" key={p.id}>
              <Product
                displayMode="thumbnail"
                product={Object.assign({}, p)}
                shoppingCart={shoppingCart}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                onLikeClick={this.handleFavouriteClick}
              />
            </div>
          );
        });
      }
    }
    return html;
  };
}

export default Products;
