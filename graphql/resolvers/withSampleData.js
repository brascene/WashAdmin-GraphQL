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
    addItemToBasket: (_, { newItem, orderId }) => {

      let ordersPromise =  Orders.findOne({ 'orderId': orderId }).exec()

      return ordersPromise.then((orderData) => {
        let currentBasket = orderData.basket
        currentBasket.push(newItem)

        let updateOrder = Orders.updateOne({ 'orderId': orderId}, { $set: { 'basket': currentBasket }}).exec()

        return updateOrder.then((res) => {
          console.log('Res iz update')
          console.log(res)
          let update = res.ok === 1 && res.n === 1 && res.nModified === 1
          return update
        })
      })

    },
    addNewOrder: (_, { newOrder }) => {
      let saveThisOrder = new Orders(newOrder)
      let savePromise = saveThisOrder.save()

      return savePromise.then((res) => {
        console.log('Narudzba uspjesno spasena')
        return res !== null
      })
    },
    changeOrderStatus: (_, { orderId, newStatus }) => {

      let updatePromise = Orders.updateOne({ 'orderId': orderId }, { $set: { 'orderStatus': newStatus }}).exec()
      return updatePromise.then((res) => {
        let updated = res.ok === 1 && res.n === 1 && res.nModified === 1
        if (updated) {
          console.log('Uspjesno upromijenjen status narudze')
        } else {
          console.log('Status narudzbe nije promijenjen')
        }
        return updated
      })

    }
  }
};

export default resolvers
