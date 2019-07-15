const productArray = [
  {
    id: 1,
    name: "Test product 1",
    stock: 10,
    created: "2019-06-18 09:10:00",
    category: { id: 10, name: "Computers & Accessories" },
    description: "THis is the test product 1 description",
    image_small: "https://picsum.photos/id/1/200/200",
    favourite: false,
    net_price_ex: 100.0,
    net_price_inc: 120.0,
    ticket_price_ex: 150.0,
    ticket_price_inc: 180.0
  },
  {
    id: 2,
    name: "Test product 2",
    stock: 12,
    created: "2019-06-15 09:15:00",
    category: { id: 10, name: "Computers & Accessories" },
    description: "THis is the test product 2 description",
    image_small: "https://picsum.photos/id/2/200/200",
    favourite: true,
    net_price_ex: 200.0,
    net_price_inc: 240.0,
    ticket_price_ex: 300.0,
    ticket_price_inc: 360.0
  },
  {
    id: 3,
    name: "Test product 3",
    stock: 1,
    created: "2019-06-18 09:00:00",
    category: { id: 3, name: "Smart Radio" },
    description: "THis is the test product 3 description",
    image_small: "https://picsum.photos/id/3/200/200",
    net_price_ex: 150.0,
    net_price_inc: 180.0,
    ticket_price_ex: 200.0,
    ticket_price_inc: 240.0
  },
  {
    id: 4,
    name: "Test product 4",
    stock: 5,
    created: "2019-06-16 09:00:00",
    category: { id: 2, name: "Digital Cameras" },
    description: "THis is the test product 4 description",
    image_small: "https://picsum.photos/id/4/200/200",
    net_price_ex: 1000.0,
    net_price_inc: 1200.0,
    ticket_price_ex: 2500.0,
    ticket_price_inc: 3000.0
  },
  {
    id: 5,
    name: "Test product 5",
    stock: 15,
    created: "2019-06-16 09:00:00",
    category: { id: 2, name: "Digital Cameras" },
    description: "THis is the test product 5 description",
    image_small: "https://picsum.photos/id/5/200/200",
    net_price_ex: 100.0,
    net_price_inc: 120.0,
    ticket_price_ex: 150.0,
    ticket_price_inc: 180.0
  }
];

const DEFAULT_PAGE_SIZE = 2;

let shoppingCartArray = { 4: { count: 1, product: productArray[3] } };

function toggleFavourite(product) {
  const index = productArray.findIndex(p => {
    return p.id === product.id;
  });

  if (index !== false) {
    productArray[index].favourite = !productArray[index].favourite;
  }

  return true;

  // let currentFav = false;
  // if ("favourite" in productArray[index])
  //   currentFav = productArray[index].favourite;

  // if (index !== false) productArray[index].favourite = !currentFav;
  // console.log(productArray);
  // return true;
}

function addProductToCart(productId, productCount = 1) {
  const product = getProduct(productId);
  if (product) {
    const pId = product.id;
    if (pId in shoppingCartArray) shoppingCartArray[pId].count += productCount;
    else shoppingCartArray[pId] = { count: 1, product: product };
  }

  return shoppingCartArray;
}

function removeProductFromCart(productId, productCount = 1) {
  if (productId in shoppingCartArray) {
    shoppingCartArray[productId].count -= productCount;
    if (shoppingCartArray[productId].count <= 0)
      delete shoppingCartArray.productId;
  }
  return shoppingCartArray;
}

function getShoppingCart() {
  return shoppingCartArray;
}

function setShoppingCart(newShoppingCart) {
  //console.log("sfdfdsfsdafdsdsf2113213");
  shoppingCartArray = newShoppingCart;
  //return false;
  return shoppingCartArray;
}

function getProduct(productId) {
  const product = productArray.filter(p => {
    return p.id === productId;
  });

  return product.length > 0 ? product[0] : null;
}

function getAllProducts() {
  const tempProductArray = productArray.map(p => {
    return Object.assign({}, p);
  });

  return JSON.stringify({
    status: true,
    data: tempProductArray
  });
}

function getNewProducts() {
  return getProducts({ new: true });
}

function getProducts(criteria, orderBy, limit) {
  const newProductArray = productArray.map(p => {
    return Object.assign({}, p);
  });

  let nProductArray = newProductArray.filter(product => {
    let result = true;
    let resultArray = [];

    if (criteria.id) resultArray.push(product.id === criteria.id ? 1 : 0);
    else if (criteria.new && criteria.new === true) {
      const today = new Date();
      const startDatetime = new Date(
        today.getFullYear(),
        (today.getMonth() * 1 + 1 * 1) * 1,
        today.getDate(),
        0,
        0,
        0
      );
      const endDatetime = new Date(
        today.getFullYear(),
        (today.getMonth() * 1 + 1 * 1) * 1,
        today.getDate(),
        23,
        59,
        59
      );

      const productCreated = new Date(product.created);
      //console.log(productCreated >= startDatetime && productCreated <= endDatetime);
      resultArray.push(
        productCreated >= startDatetime && productCreated <= endDatetime ? 1 : 0
      );
    } else if ("category" in criteria && "id" in criteria["category"]) {
      if (product.category.id !== criteria.category.id) resultArray.push(0);
    } else resultArray.push(1);

    if (resultArray.length > 0) {
      for (let r of resultArray) {
        //console.log(r);
        if (r === 0) {
          //console.log(r);
          result = false;
          break;
        }
      }
    }

    return result;
  });

  if ("orderBy" in orderBy && "direction" in orderBy) {
    nProductArray.sort((a, b) => {
      if (orderBy.orderBy === "price") {
        if (orderBy.direction === "asc")
          return a.net_price_ex < b.net_price_ex ? -1 : 1;
        else return a.net_price_ex > b.net_price_ex ? -1 : 1;
      } else if (orderBy.orderBy === "created") {
        if (orderBy.direction === "asc") return a.created < b.created ? -1 : 1;
        else return a.created > b.created ? -1 : 1;
      }
    });
  } else {
    nProductArray.sort((a, b) => {
      return a.created > b.created ? -1 : 1;
    });
  }

  let pageNo = 1;
  if ("pageNo" in limit) pageNo = limit["pageNo"];

  let pageSize = DEFAULT_PAGE_SIZE;
  if ("pageSize" in limit) pageSize = limit["pageSize"];

  let totalPages = Math.ceil(nProductArray.length / pageSize);
  nProductArray = nProductArray.slice(
    (pageNo - 1) * pageSize,
    (pageNo - 1) * pageSize * 1 + pageSize * 1
  );

  return JSON.stringify({
    status: true,
    data: nProductArray,
    pagination: { pageNo: pageNo, pageSize: pageSize, totalPages: totalPages }
  });
}

export default {
  getProduct: getProduct,
  getAllProducts: getAllProducts,
  getProducts: getProducts,
  getNewProducts: getNewProducts,
  addProductToCart,
  removeProductFromCart,
  getShoppingCart,
  setShoppingCart,
  toggleFavourite,
  DEFAULT_PAGE_SIZE
};
