const FormatError = require("easygraphql-format-error");

const formatError = new FormatError([{
  name: 'CUSTOMER_EXIST',
  message: 'Customer with the email already exists!',
  statusCode: '400'
},
{
    name: 'VENDOR_EXIST',
    message: 'Vendor with the email already exists!',
    statusCode: '400'
},
{
    name: 'CUSTOMER_NOT_EXIST',
    message: 'Customer does not exist!',
    statusCode: '400'
},
{
    name: 'VENDOR_NOT_EXIST',
    message: 'Vendor does not exist!',
    statusCode: '400'
},
{
  name: 'VENDOR_NOT_FOUND',
  message: 'Vendor not found!',
  statusCode: '400'
},
{
    name: 'CUSTOMER_NOT_FOUND',
    message: 'Customer not found!',
    statusCode: '400'
},
{
    name: 'EMAIL_TAKEN',
    message: 'Email is taken!',
    statusCode: '400'
},
{
  name: 'EMAIL_NOT_VERIFIED',
  message: 'Email is not verified.',
  statusCode: '400'
},
{
  name: 'INVALID_PASSWORD',
  message: 'Email or Password is incorrect!',
  statusCode: '400'
},
{
    name: 'CATEGORY_NOT_FOUND',
    message: 'Category not found!',
    statusCode: '400'
},  
{
    name: 'ITEM_NOT_FOUND',
    message: 'Item not found!',
    statusCode: '400'
},  
{
  name: 'ORDER_NOT_EXIST',
  message: 'Order does not exists!',
  statusCode: '400'
},
]);

exports.formatError = formatError;
