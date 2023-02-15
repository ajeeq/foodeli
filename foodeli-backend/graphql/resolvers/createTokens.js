const jwt = require("jsonwebtoken");
const {
    checkOrderHistory
} = require("./merge");

const createTokensVendor = (vendor) => {
    // const refreshToken = jwt.sign(
    //     { vendorId: vendor.id, count: vendor.count },
    //      process.env.AUTH_KEY, 
    //     {expiresIn: "7d"}
    // );
    checkOrderHistory(vendor);
    const accessToken = jwt.sign({
        vendorId: vendor.id,
        email: vendor.email
    },
        process.env.AUTH_KEY);
    return {
        accessToken
    };
};

const createTokensCustomer = (customer) => {
    // const refreshToken = jwt.sign(
    //     { customerId: customer.id, count: customer.count },
    //      process.env.AUTH_KEY, 
    //     {expiresIn: "7d"}
    // );
    checkOrderHistory(customer);
    const accessToken = jwt.sign({
        customerId: customer.id,
        email: customer.email
    },
        process.env.AUTH_KEY);
    return {
        accessToken
    };
};
exports.createTokensVendor = createTokensVendor;
exports.createTokensCustomer = createTokensCustomer;