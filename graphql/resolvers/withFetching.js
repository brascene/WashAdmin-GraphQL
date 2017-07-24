import rp from 'request-promise'

import sampleData from '../../helpers/fakeData'
import { getAllOrdersFromHeroku, changeOrderStatus } from '../fetching/fetchFunctions'

var resolvers = {
  RootQuery: {
    hello: (root) => 'Hello world',
    // Change orders to fetch orders from heroku db
    orders: (root, args, content) => {
      return getAllOrdersFromHeroku()
    },
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
    },
    changeOrderStatus: (_, { orderId, newStatus }) => {
      let changeStatus = changeOrderStatus(orderId, newStatus)
      console.log('Change status result')
      console.log(changeStatus)
      return changeStatus
    }
  }
};

export default resolvers
