const jwt = require("jsonwebtoken");
const Vendor = require("../models/vendor")
const Customer = require("../models/customer")
const { createTokensCustomer, createTokensVendor } = require("../graphql/resolvers/createTokens");

module.exports = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }

    const accessToken = authHeader.split(" ")[1]; //Bearer token
    if (!accessToken || accessToken === "") {
      req.isAuth = false;
      return next();
    }    
    
    let data;
    try{
        data = jwt.verify(accessToken, process.env.AUTH_KEY);
        console.log(data);
    } 
    catch (err)
    {
      console.log(err);
        req.isAuth = false;
        return next();
    }
    
    if(data.vendorId) // if vendor
    {
      req.vendorId = data.vendorId;
      req.isAuth = true;
    }
    if(data.customerId) // if customer
    {
        req.customerId = data.customerId;
        req.isAuth = true;
    }
    return next();
}; 