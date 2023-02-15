const Order = require("../../models/order");
const Customer = require("../../models/customer");
const Vendor = require("../../models/vendor");
const {
  transformOrder,
  orderCountUpdate
} = require("./merge");
const customer = require("../../models/customer");

module.exports = {
  createOrder: async (args, {
    req,
    errorName
  }) => { //Error
    if (!req.customerId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedVendor = await Vendor.findById(args.orderInput.vendorId);
      if (!fetchedVendor) {
        throw new Error(errorName.VENDOR_NOT_FOUND);
      }
      const fetchedCust = await Customer.findById(req.customerId);
      if (!fetchedCust) {
        throw new Error(errorName.CUSTOMER_NOT_FOUND);
      }
      const insertValue = {
        vendor: fetchedVendor,
        customer: fetchedCust,
        orderNumber: fetchedVendor.orderCount,
        orderStatus: 1,
        subtotal: +args.orderInput.subtotal
      };
      if (fetchedVendor.tableNumber != 0) {
        insertValue.orderTable = +args.orderInput.orderTable;
      }
      const order = new Order(insertValue);
      orderCountUpdate(fetchedVendor);
      args.orderedItemInput.forEach((cartItem) => {
        const cartItemObj = {
          itemName: cartItem.itemName,
          itemPrice: +cartItem.itemPrice,
          itemQuantity: +cartItem.itemQuantity
        }
        if (cartItem.special) {
          cartItemObj.special = cartItem.special
        }
        order.orderedItems.push(cartItemObj);
      });
      const result = await order.save();
      fetchedVendor.ordersHistory.push(order);
      await fetchedVendor.save();
      fetchedCust.ordersHistory.push(order);
      await fetchedCust.save();
      return transformOrder(result);
    } catch (err) {
      throw err;
    }
  },

  meOrderCustomer: async (args, {
    req,
    errorName
  }) => {
    if (!req.customerId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedOrder = await Order.find({
        customer: req.customerId
      });
      return fetchedOrder.map((order) => {
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },

  meOrderVendor: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedOrder = await Order.find({
        vendor: req.vendorId
      });
      return fetchedOrder.map((order) => {
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },

  updateOrder: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const query = {
        _id: args.orderId
      };
      const newValue = {
        orderStatus: args.orderInput.orderStatus
      };
      const updatingOrder = await Order.findByIdAndUpdate(
        query, {
        $set: newValue
      }, {
        new: true
      }
      );
      return transformOrder(updatingOrder);
    } catch (err) {
      throw err;
    }
  },
};