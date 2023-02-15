const Item = require("../../models/item");
const Category = require("../../models/category");
const {
  transformItem
} = require("./merge");

module.exports = {
  items: async (args, {
    req,
    errorName
  }) => {
    try {
      const fetchedItem = await Item.find();
      return fetchedItem.map((item) => {
        return transformItem(item);
      });
    } catch (err) {
      throw err;
    }
  },

  oneItem: async (args) => {
    try {
      const fetchedItem = await Item.findById(args.itemId);
      return transformItem(fetchedItem);
    } catch (err) {
      throw err;
    }
  },

  createItem: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedCategory = await Category.findById(args.categoryId);
      if (!fetchedCategory) {
        throw new Error(errorName.CATEGORY_NOT_FOUND);
      }
      const item = new Item({
        itemName: args.itemInput.itemName,
        itemPrice: +args.itemInput.itemPrice,
        itemDescription: args.itemInput.itemDescription,
        category: fetchedCategory,
        itemAvailability: 2
      });
      const result = await item.save();
      fetchedCategory.menuItems.push(item);
      await fetchedCategory.save();
      return transformItem(result);
    } catch (err) {
      throw err;
    }
  },

  updateItem: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedItem = await Item.findById(args.itemId);
      if (!fetchedItem) {
        throw new Error(errorName.ITEM_NOT_FOUND);
      }
      const query = {
        _id: args.itemId
      };
      const newValue = {};
      if (args.itemInput.itemName) {
        newValue.itemName = args.itemInput.itemName;
      }
      if (args.itemInput.itemPrice) {
        newValue.itemPrice = args.itemInput.itemPrice;
      }
      if (args.itemInput.itemDescription) {
        newValue.itemDescription = args.itemInput.itemDescription;
      }
      if (arg.itemInput.itemAvailability) {
        newValue.itemAvailability = arg.itemInput.itemAvailability;
      }
      const updatingItem = await Item.findByIdAndUpdate(
        query, {
        $set: newValue
      }, {
        new: true
      }
      );
      return transformItem(updatingItem);
    } catch (err) {
      throw err;
    }
  },

  deleteItem: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedItem = await Item.findById(args.itemId);
      if (!fetchedItem) {
        throw new Error(errorName.ITEM_NOT_FOUND);
      }
      await Item.deleteOne({
        _id: args.itemId
      });
      await Category.updateOne({
        menuItems: args.itemId
      }, {
        $pull: {
          menuItems: args.itemId
        }
      });
      return transformItem(fetchedItem);
    } catch (err) {
      throw err;
    }
  },
};