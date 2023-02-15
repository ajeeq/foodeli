const bcrypt = require("bcryptjs");
const Vendor = require("../../models/vendor");
const {
  transformVendor
} = require("./merge");
const {
  createTokensVendor
} = require("./createTokens");
const loadash = require("lodash");

module.exports = {
  vendors: async () => {
    try {
      const fetchedvendor = await Vendor.find();
      return fetchedvendor.map((vendor) => {
        return transformVendor(vendor);
      });
    } catch (err) {
      throw err;
    }
  },

  nearVendors: async (args, res) => {
    try {
      const fetchedvendor = await Vendor.find({
        "latLong.coordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [args.longitude, args.latitude]
            },
            $maxDistance: args.maxDistance
          }
        },
        "createdCategories": {
          $exists: true,
          $ne: []
        },
      }).populate([{
        path: 'createdCategories',
        model: 'Category',
        match: {
          "menuItems": {
            $exists: true,
            $ne: []
          }
        }
      }]);
      const fetchedvendore = loadash.filter(
        fetchedvendor.map((vendor) => {
          if (vendor.createdCategories.length != 0) {
            return vendor;
          }
        })
      );
      console.log(fetchedvendore);
      return fetchedvendore.map((vendor) => {
        return transformVendor(vendor);
      });
    } catch (err) {
      throw err;
    }
  },

  oneVendor: async (args) => {
    try {
      const fetchedVendor = await Vendor.findById(args.vendorId);
      return transformVendor(fetchedVendor);
    } catch (err) {
      throw err;
    }
  },

  meVendor: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedVendor = await Vendor.findById(req.vendorId);
      return transformVendor(fetchedVendor);
    } catch (err) {
      throw err;
    }
  },

  createVendor: async (args, {
    res,
    errorName
  }) => {
    try {
      const fetchedVendor = await Vendor.findOne({
        email: args.vendorInput.email
      });
      if (fetchedVendor) {
        throw new Error(errorName.VENDOR_EXIST);
      }
      const hashedPassword = await bcrypt.hash(args.vendorInput.password, 12);
      const latLong = args.vendorInput.latLong.split(','); // split latLong to assign into coordinates geoJson
      const vendor = new Vendor({
        name: args.vendorInput.name,
        email: args.vendorInput.email,
        password: hashedPassword,
        phone: args.vendorInput.phone,
        description: args.vendorInput.description,
        orderCount: 1,
        tableNumber: 0,
        latLong: {
          type: "Point",
          coordinates: [latLong[1], latLong[0]] // [Long,Lat] - mongoose format
        }
      });

      const result = await vendor.save();
      const {
        accessToken
      } = createTokensVendor(vendor);
      // const {accessToken, refreshToken} = createTokensVendor(vendor);
      // res.cookie("refresh-token", refreshToken, {httpOnly: true});
      return {
        vendorId: result.id,
        accessToken: accessToken,
        // refreshToken: refreshToken, 
        email: result.email
      };
    } catch (err) {
      throw err;
    }
  },

  loginVendor: async ({
    email,
    password
  }, {
    res,
    errorName
  }) => {
    try {
      const fetchedvendor = await Vendor.findOne({
        email: email
      });
      if (!fetchedvendor) {
        throw new Error(errorName.VENDOR_NOT_EXIST);
      }
      const isEqual = await bcrypt.compare(password, fetchedvendor.password);
      if (!isEqual) {
        throw new Error(errorName.INVALID_PASSWORD);
      }
      const {
        accessToken
      } = createTokensVendor(fetchedvendor);
      // const {accessToken, refreshToken} = createTokensVendor(fetchedvendor);
      // res.cookie("refresh-token", refreshToken, {httpOnly: true});
      return {
        vendorId: fetchedvendor.id,
        accessToken: accessToken,
        // refreshToken: refreshToken, 
        email: fetchedvendor.email
      };
    } catch (err) {
      throw err;
    }
  },

  updateVendor: async (args, {
    req,
    errorName
  }) => {
    if (!req.vendorId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const query = {
        _id: req.vendorId
      };
      const newValue = {};
      if (args.vendorInput.name) {
        newValue.name = args.vendorInput.name
      }
      if (args.vendorInput.email) {
        const fetchedVendor = await Vendor.findOne({
          email: args.vendorInput.email
        });
        const emptyVendor = {};
        if (fetchedVendor == null) {
          emptyVendor.email = "erts";
        } else {
          emptyVendor.email = fetchedVendor.email;
        }
        if (fetchedVendor && !(emptyVendor.email == req.email)) {
          throw new Error(errorName.EMAIL_TAKEN);
        }
        newValue.email = args.vendorInput.email;
      }
      if (args.vendorInput.password) {
        newValue.password = await bcrypt.hash(args.vendorInput.password, 12);
      }
      if (args.vendorInput.phone) {
        newValue.phone = args.vendorInput.phone
      }
      if (args.vendorInput.description) {
        newValue.description = args.vendorInput.description
      }
      if (args.vendorInput.tableNumber) {
        newValue.tableNumber = +args.vendorInput.tableNumber
      }
      if (args.vendorInput.latLong) {
        const latLong = args.vendorInput.latLong.split(','); // split latLong to assign into coordinates geoJson
        newValue.latLong = {
          type: "Point",
          coordinates: [latLong[1], latLong[0]] // [Long,Lat] - mongoose format
        }
      }
      const updatingVendor = await Vendor.findByIdAndUpdate(
        query, {
        $set: newValue
      }, {
        new: true
      }
      );
      return {
        ...updatingVendor._doc,
        _id: updatingVendor.id,
        latLong: String(updatingVendor._doc.latLong.coordinates), // mongoose return [Long,Lat]
        password: null
      };
    } catch (err) {
      throw err;
    }
  }
};