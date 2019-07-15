import ProductService from "./product_service";

const categoryArray = [
  { id: 1, name: "Fitness bands" },
  { id: 2, name: "Digital Cameras" },
  { id: 3, name: "Smart Radio" },
  { id: 10, name: "Computers & Accessories" }
];

function getCategory(categoryId) {
  return categoryArray.filter(c => c.id === categoryId);
}

function getCategories(criteria, orderBy, limit) {
  let tempCategoryArray = categoryArray.map(c => {
    return Object.assign({}, c);
  });

  let activeCategories = [];
  const { status, data: productData } = JSON.parse(
    ProductService.getAllProducts()
  );
  if (status) {
    productData.map(p => {
      if (!(p.category.id in activeCategories))
        activeCategories[p.category.id] = p.category;
      return p;
    });
  }

  let cArray = tempCategoryArray.filter(category => {
    let result = false;
    if (criteria && "active" in criteria && criteria.active) {
      if (category.id in activeCategories) result = true;
    } else result = true;

    return result;
  });

  let pageNo = null;
  if (limit && "pageNo" in limit) pageNo = limit.pageNo;

  let pageSize = null;
  if (limit && "pageSize" in limit) pageSize = limit.pageSize;

  let pagination = {};

  if (pageNo !== null && pageSize !== null) {
    cArray = cArray.slice(
      (pageNo - 1) * pageSize,
      ((pageNo - 1) * pageSize * 1 + pageSize * 1) * 1
    );
    pagination = {
      pageNo: pageNo,
      pageSize: pageSize,
      totalPages: Math.ceil(cArray.length / pageSize)
    };
  }

  return JSON.stringify({ status: true, data: cArray, pagination: pagination });
}

function getAllCategories() {
  const tempCategoryArray = categoryArray.map(c => {
    return Object.assign({}, c);
  });

  return tempCategoryArray;
}

export default {
  getCategory,
  getCategories,
  getAllCategories
};
