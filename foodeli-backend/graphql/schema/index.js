const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type OrderedItem {
  _id: ID!
  itemName: String!
  itemPrice: Float!
  itemQuantity: Int!
  special: String
}

type Order {
  _id: ID!
  vendor: Vendor!
  customer: Customer!
  orderedItems: [OrderedItem!]
  orderTable: Int
  orderNumber: Int!
  orderStatus: Int!
  subtotal: Float!
  createdAt: String!
}

type Category {
  _id: ID!
  name: String!
  menuItems: [Item!]
  creatorVendor: Vendor!
}

type Item {
  _id: ID!
  itemName: String!
  itemPrice: Float!
  itemDescription: String
  category: Category!
  itemAvailability: Int!
}

type Vendor {
  _id: ID!
  name: String!
  email: String!
  password: String
  phone: String!
  description: String!
  createdCategories: [Category!]
  ordersHistory: [Order!]
  orderCount: Int!
  tableNumber: Int!
  latLong: String!
}

type Customer {
  _id: ID!
  email: String!
  password: String
  firstName: String!
  lastName: String!
  phone: String!
  ordersHistory: [Order!]
  validation: Int!
}

type AuthDataVendor {
  vendorId: ID!
  accessToken: String!
  email: String!
}

type AuthDataCustomer {
  customerId: ID!
  accessToken: String!
  email: String!
  pin: String!
}

input OrderedItemInput {
  itemName: String!
  itemPrice: Float!
  itemQuantity: Int!
  special: String
}

input OrderInput {
  vendorId: ID!
  orderTable: Int!
  subtotal: Float!
}

input CategoryInput {
  name: String!
}

input ItemInput {
  itemName: String!
  itemPrice: Float!
  itemDescription: String
}

input VendorInput {
  name: String!
  email: String!
  password: String!
  phone: String!
  description: String!
  latLong: String!
}

input CustomerInput {
  email: String!
  firstName: String!
  lastName: String!
  phone: String!
  password: String!
}

input OrderUpdateInput{
  orderStatus : Int!
}

input CategoryUpdateInput {
  name: String
}

input ItemUpdateInput {
  itemName: String
  itemDescription: String
  itemPrice: Float
  itemAvailability: Int
}

input VendorUpdateInput {
  name: String
  email: String
  password: String
  phone: String
  description: String
  tableNumber: Int
  latLong: String
}

input CustomerUpdateInput {
  email: String
  firstName: String
  lastName: String
  phone: String
  password: String
}

type RootQuery {
  categories: [Category!]!

  items: [Item!]!
  oneItem(itemId: ID!): Item!
  
  vendors: [Vendor!]!
  nearVendors(maxDistance: Int, latitude: Float, longitude: Float): [Vendor!]!
  oneVendor(vendorId: ID!): Vendor!
  meVendor: Vendor!
  meOrderVendor: [Order!]!

  customers: [Customer!]!
  oneCustomer(customerId: ID!): Customer!
  meCustomer: Customer!
  meOrderCustomer: [Order!]!

  loginVendor(email: String!,password: String!): AuthDataVendor!
  loginCustomer(email: String!,password: String!): AuthDataCustomer!
}

type RootMutation {
    createOrder(orderedItemInput: [OrderedItemInput], orderInput: OrderInput): Order
    updateOrder(orderId: ID!, orderInput: OrderUpdateInput): Order

    createCategory(categoryInput: CategoryInput): Category
    updateCategory(categoryId: ID!, categoryInput: CategoryUpdateInput): Category
    deleteCategory(categoryId: ID!): Category!

    createItem(categoryId: ID!, itemInput: ItemInput): Item
    updateItem(itemId: ID!, itemInput: ItemUpdateInput): Item
    deleteItem(itemId: ID!): Item!

    createVendor(vendorInput: VendorInput): AuthDataVendor!
    updateVendor(vendorInput: VendorUpdateInput): Vendor

    createCustomer(customerInput: CustomerInput): AuthDataCustomer!
    validateRegisterCustomer(email: String!): AuthDataCustomer!
    validateLoginCustomer(email: String!): Boolean!
    resendPin(email: String!): AuthDataCustomer!
    updateCustomer(customerInput: CustomerUpdateInput): Customer
  }

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
