// Query to make an order

const MAKE_ORDER = gql`
    mutation{
        createOrder(
            orderedItemInput: [
            {
              itemName: "ciken weng",
              itemPrice: 20,
              itemQuantity: 1
            }],
        orderInput: {
            vendorId: "5fb513fcbf1e9e0017c3b84a",
            orderTable: 1,
            subtotal: 23
        }) {
        _id
        vendor{
            email
        }
        customer{
            email
            firstName
        }
        orderedItems{
            itemName
            itemPrice
            itemQuantity
        }
        orderTable
        orderNumber
        orderStatus
        subtotal
        createdAt
    }
}`;