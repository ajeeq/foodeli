const Category = require("../../models/category");
const Item = require("../../models/item");
const Vendor = require("../../models/vendor");
const {
  transformCategory
} = require("./merge");

module.exports = {
  categories: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedCategory = await Category.find();
      return fetchedCategory.map((category) => {
        return transformCategory(category);
      });
    } catch (err) {
      throw err;
    }
  },

  createCategory: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const category = new Category({
        name: args.categoryInput.name,
        creatorVendor: req.vendorId
      });
      const result = await category.save();
      const fetchedVendor = await Vendor.findById(req.vendorId);
      fetchedVendor.createdCategories.push(category);
      await fetchedVendor.save();
      return transformCategory(result);
    } catch (err) {
      throw err;
    }
  },

  updateCategory: async (args, {
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
      const query = {
        _id: args.categoryId
      };
      const newValue = {
        name: args.categoryInput.name
      }
      const updatingCategory = await Category.findByIdAndUpdate(
        query, {
        $set: newValue
      }, {
        new: true
      }
      );
      return transformCategory(updatingCategory);
    } catch (err) {
      throw err;
    }
  },

  deleteCategory: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedCategory = await Category.findOne({
        _id: args.categoryId
      });
      if (!fetchedCategory) {
        throw new Error(errorName.CATEGORY_NOT_FOUND);
      }
      await Category.deleteOne({
        _id: args.categoryId
      });
      await Vendor.updateOne({
        createdCategories: args.categoryId
      }, {
        $pull: {
          createdCategories: args.categoryId
        }
      });
      const fetchedItem = await Item.findOne({
        category: args.categoryId
      })
      if (fetchedItem) {
        await Item.deleteMany({
          category: args.categoryId
        });
      }
      return transformCategory(fetchedCategory);
    } catch (err) {
      throw err;
    }
  },
};