import orders from '../../helpers/fakeData'
var _ = require('lodash')

import { findIndex } from 'lodash'

import Orders from '../../mongo/models/order'

var resolvers = {
  RootQuery: {
    hello: (root) => 'Hello world',
    orders: () => {
      let orders = Orders.find({ $query: {} }, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          return data
        }
      })
      return orders
    },
    orderedFrom: (_, { id }) => find(orders, 'orderId', id)
  },
  Mutation: {
    addItemToBasket: (_, { newItem, id }) => {
      const order = find(orders, 'orderId', id)
      if (!order) {
        throw new Error('Nema te narudzbe')
      }
      order.basket.push(newItem)
      return order
    },
    addNewOrder: (_, { newOrder }) => {
      var allOrders = orders
      const currentTotal = allOrders.length
      //VALIDACIJA NOVE
      allOrders.push(newOrder)
      return allOrders.length > currentTotal
    },
    changeOrderStatus: (_, { orderId, newStatus }) => {

      let result = Orders.findOneAndUpdate({ 'orderId': orderId }, { $set: { 'orderStatus': newStatus }}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Apdejtovan')
          console.log(data)
          return data.orderStatus
        }
      })
      console.log('Result: '+result)
      return result === newStatus
    }
  }
};

export default resolvers
