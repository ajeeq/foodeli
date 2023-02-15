const Order = require("../../models/order");
const Category = require("../../models/category");
const Item = require("../../models/item");
const Vendor = require("../../models/vendor");
const Customer = require("../../models/customer");

const showDate = async (time) => {
  const dt = new Date(time);
  dt.setMinutes(dt.getMinutes() - 30); //Minute
  return dt.toISOString();
}

const orderCountUpdate = async (user) => {
  if (user.orderCount === 999) {
    const query = {
      _id: user.id
    };
    const newValue = {
      orderCount: 1
    };
    await Vendor.updateOne(
      query, {
      $set: newValue
    }
    );
  } else {
    const query = {
      _id: user.id
    };
    const newValue = {
      orderCount: user.orderCount + 1
    };
    await Vendor.updateOne(
      query, {
      $set: newValue
    }
    );
  }
};

const checkOrderHistory = (user) => {
  user.ordersHistory.forEach(async (orderId) => {
    try {
      const checkOrder = await Order.find({
        _id: orderId
      });
      if (Object.entries(checkOrder).length === 0) {
        await Vendor.updateOne({
          ordersHistory: orderId
        }, {
          $pull: {
            ordersHistory: orderId
          }
        });
        await Customer.updateOne({
          ordersHistory: orderId
        }, {
          $pull: {
            ordersHistory: orderId
          }
        });
      }
    } catch (err) {
      throw err;
    }
  });
}

const orderItems = async (orderItemId) => {
  try {
    return orderItemId.map((orderItem) => {
      return {
        ...orderItem._doc,
        _id: orderItem.id
      };
    });
  } catch (err) {
    throw err;
  }
};

const categoriez = async (categoryId) => {
  try {
    const categoriez = await Category.findById(categoryId);
    return transformCategory(categoriez);
  } catch (err) {
    throw err;
  }
};

const orders = async (orderId) => {
  try {
    const orders = await Order.find({
      _id: orderId
    });
    return orders.map((order) => {
      return transformOrder(order);
    });
  } catch (err) {
    throw err;
  }
};

const categories = async (categoryId) => {
  try {
    const categories = await Category.find({
      _id: categoryId
    });
    return categories.map((category) => {
      return transformCategory(category);
    });
  } catch (err) {
    throw err;
  }
};

const items = async (itemId) => {
  try {
    const items = await Item.find({
      _id: itemId
    });
    return items.map((item) => {
      return transformItem(item);
    });
  } catch (err) {
    throw err;
  }
};

const vendors = async (vendorId) => {
  try {
    const vendors = await Vendor.findById(vendorId)
    return transformVendor(vendors);
  } catch (err) {
    throw err;
  }
};

const customers = async (customerId) => {
  try {
    const customers = await Customer.findById(customerId)
    return transformCustomer(customers);
  } catch (err) {
    throw err;
  }
};

const transformOrder = (order) => {
  return {
    ...order._doc,
    _id: order.id,
    vendor: vendors.bind(this, order.vendor),
    customer: customers.bind(this, order.customer),
    orderedItems: orderItems.bind(this, order.orderedItems),
    createdAt: showDate.bind(this, order._doc.expiredAt)
  };
};

const transformCategory = (category) => {
  return {
    ...category._doc,
    _id: category.id,
    menuItems: items.bind(this, category._doc.menuItems),
    creatorVendor: vendors.bind(this, category._doc.creatorVendor)
  };
};

const transformItem = (item) => {
  return {
    ...item._doc,
    _id: item.id,
    category: categoriez.bind(this, item.category)
  };
};

const transformVendor = (vendor) => {
  return {
    ...vendor._doc,
    _id: vendor.id,
    password: null,
    latLong: String(vendor._doc.latLong.coordinates), // mongoose return [Long,Lat]
    createdCategories: categories(vendor._doc.createdCategories),
    ordersHistory: orders.bind(this, vendor._doc.ordersHistory)
  };
};

const transformCustomer = (customer) => {
  return {
    ...customer._doc,
    _id: customer.id,
    password: null,
    ordersHistory: orders.bind(this, customer._doc.ordersHistory)
  };
};

exports.orderCountUpdate = orderCountUpdate;
exports.checkOrderHistory = checkOrderHistory;
exports.transformOrder = transformOrder;
exports.transformCategory = transformCategory;
exports.transformItem = transformItem;
exports.transformVendor = transformVendor;
exports.transformCustomer = transformCustomer;