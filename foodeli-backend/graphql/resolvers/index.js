const authVendorResolver = require("./authVendor");
const authCustomerResolver = require("./authCustomer");
const categoriesResolver = require("./categories");
const itemsResolver = require("./items");
const orderResolver = require("./order");


const rootResolver = {
  ...authVendorResolver,
  ...authCustomerResolver,
  ...categoriesResolver,
  ...itemsResolver,
  ...orderResolver
};

module.exports = rootResolver;