import sampleData from '../../helpers/fakeData'

var resolvers = {
  RootQuery: {
    hello: (root) => 'Hello world',
    orders: () => sampleData.orders,
    orderedFrom: (_, { id }) => find(sampleData.orders, 'orderId', id)
  },
  Mutation: {
    addItemToBasket: (_, { newItem, id }) => {
      const order = find(sampleData.orders, 'orderId', id)
      if (!order) {
        throw new Error('Nema te narudzbe')
      }
      order.basket.push(newItem)
      return order
    },
    addNewOrder: (_, { newOrder }) => {
      var allOrders = sampleData.orders
      const currentTotal = allOrders.length
      //VALIDACIJA NOVE
      allOrders.push(newOrder)
      return allOrders.length > currentTotal
    }
  }
};

export default resolvers
