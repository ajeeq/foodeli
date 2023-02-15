const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Customer = require("../../models/customer");
const {
  transformCustomer
} = require("./merge");
const {
  createTokensCustomer
} = require("./createTokens");
// let pinGlobal;

module.exports = {
  customers: async () => {
    try {
      const fetchedcustomer = await Customer.find();
      return fetchedcustomer.map((customer) => {
        return transformCustomer(customer);
      });
    } catch (err) {
      throw err;
    }
  },

  oneCustomer: async (args) => {
    try {
      const fetchedCustomer = await Customer.findById(args.customerId);
      return transformCustomer(fetchedCustomer);
    } catch (err) {
      throw err;
    }
  },

  meCustomer: async (args, {
    req,
    errorName
  }) => {
    if (!req.customerId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const fetchedCustomer = await Customer.findById(req.customerId);
      return transformCustomer(fetchedCustomer);
    } catch (err) {
      throw err;
    }
  },

  createCustomer: async (args, {
    res,
    errorName
  }) => {
    try {
      const fetchedCustomer = await Customer.findOne({
        email: args.customerInput.email
      });
      if (fetchedCustomer) {
        throw new Error(errorName.CUSTOMER_EXIST);
      }
      const hashedPassword = await bcrypt.hash(args.customerInput.password, 12);
      const customer = new Customer({
        email: args.customerInput.email,
        password: hashedPassword,
        firstName: args.customerInput.firstName,
        lastName: args.customerInput.lastName,
        phone: args.customerInput.phone,
        validation: 1
      });
      const result = await customer.save();
      let pinLocal = Math.floor(100000 + Math.random() * 900000);
      // pinGlobal = pinLocal;
      let main = async () => {
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "hirodelinoreply@gmail.com",
            pass: "Qwerty1@345"
          }
        });
        let info = await transporter.sendMail({
          from: "<hirodelinoreply@gmail.com>",
          to: result.email,
          subject: "Hirodeli Registration Pin",
          text: "Here is the pin :" + pinLocal.toString(),
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      };
      main().catch(console.error);
      // const {accessToken, refreshToken} = createTokensCustomer(customer);
      // res.cookie("refresh-token", refreshToken, {httpOnly: true});
      return {
        // customerId: result.id, 
        // accessToken: accessToken, 
        // refreshToken: refreshToken, 
        pin: pinLocal
      };
    } catch (err) {
      throw err;
    }
  },

  validateRegisterCustomer: async ({
    email
  }, {
    res,
    errorName
  }) => {
    try {
      const fetchedcustomer = await Customer.findOne({
        email: email
      });
      if (!fetchedcustomer) {
        throw new Error(errorName.CUSTOMER_NOT_EXIST);
      }
      await Customer.findOneAndUpdate({
        email: email
      }, {
        $set: {
          validation: 2
        }
      }, {
        new: true
      });
      const {
        accessToken
      } = createTokensCustomer(fetchedcustomer);
      return {
        // customerId: fetchedcustomer.id, 
        accessToken: accessToken,
        // email: fetchedcustomer.email
      };
    } catch (err) {
      throw err;
    }
  },

  validateLoginCustomer: async ({
    email
  }, {
    res,
    errorName
  }) => {
    try {
      const fetchedcustomer = await Customer.findOne({
        email: email
      });
      if (!fetchedcustomer) {
        throw new Error(errorName.CUSTOMER_NOT_EXIST);
      }
      await Customer.findOneAndUpdate({
        email: email
      }, {
        $set: {
          validation: 2
        }
      }, {
        new: true
      });
      return true;
    } catch (err) {
      throw err;
    }
  },

  resendPin: async ({
    email
  }, {
    res,
    errorName
  }) => {
    try {
      const fetchedcustomer = await Customer.findOne({
        email: email
      });
      if (!fetchedcustomer) {
        throw new Error(errorName.CUSTOMER_NOT_EXIST);
      }
      let pinLocal = Math.floor(100000 + Math.random() * 900000);
      // pinGlobal = pinLocal;
      let main = async () => {
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "hirodelinoreply@gmail.com",
            pass: "Qwerty1@345"
          }
        });
        let info = await transporter.sendMail({
          from: "<hirodelinoreply@gmail.com>",
          to: email,
          subject: "Hirodeli Registration Pin (Resend)",
          text: "Here is the pin :" + pinLocal.toString()
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      };
      main().catch(console.error);
      return {
        pin: pinLocal
      };
    } catch (err) {
      throw err;
    }
  },

  loginCustomer: async ({
    email,
    password
  }, {
    res,
    errorName
  }) => {
    try {
      const fetchedcustomer = await Customer.findOne({
        email: email
      });
      if (!fetchedcustomer) {
        throw new Error(errorName.CUSTOMER_NOT_EXIST);
      }
      if (fetchedcustomer.validation == 1) {
        throw new Error(errorName.EMAIL_NOT_VERIFIED);
      }
      const isEqual = await bcrypt.compare(password, fetchedcustomer.password);
      if (!isEqual) {
        throw new Error(errorName.INVALID_PASSWORD);
      }
      const {
        accessToken
      } = createTokensCustomer(fetchedcustomer);
      // const {accessToken, refreshToken} = createTokensCustomer(fetchedcustomer);
      // res.cookie("refresh-token", refreshToken, {httpOnly: true});
      return {
        customerId: fetchedcustomer.id,
        accessToken: accessToken,
        // refreshToken: refreshToken, 
        email: fetchedcustomer.email
      };
    } catch (err) {
      throw err;
    }
  },

  updateCustomer: async (args, {
    req,
    errorName
  }) => {
    if (!req.customerId && !req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    try {
      const query = {
        _id: req.customerId
      };
      const newValue = {};
      if (args.customerInput.firstName) {
        newValue.firstName = args.customerInput.firstName;
      }
      if (args.customerInput.lastName) {
        newValue.lastName = args.customerInput.lastName;
      }
      if (args.customerInput.phone) {
        newValue.phone = args.customerInput.phone;
      }
      if (args.customerInput.email) {
        const fetchedCustomer = await Customer.findOne({
          email: args.customerInput.email
        });
        const emptyCustomer = {};
        if (fetchedCustomer == null) {
          emptyCustomer.email = "erts";
        } else {
          emptyCustomer.email = fetchedCustomer.email;
        }
        if (fetchedCustomer && !(emptyCustomer.email == req.email)) {
          throw new Error(errorName.EMAIL_TAKEN);
        }
        newValue.email = args.customerInput.email;
      }
      if (args.customerInput.password) {
        newValue.password = await bcrypt.hash(args.customerInput.password, 12);
      }
      const updatingCustomer = await Customer.findByIdAndUpdate(
        query, {
        $set: newValue
      }, {
        new: true
      }
      );
      return {
        ...updatingCustomer._doc,
        _id: updatingCustomer.id,
        password: null,
      };
    } catch (err) {
      throw err;
    }
  }
};