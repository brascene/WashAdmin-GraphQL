var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var lodash = require('lodash')
const find = lodash.find, filter = lodash.filter

import sampleData from './helpers/fakeData'

var typeDefs = [`
type Query {
  hello: String,
  orders: [BasketSingleOrder],
  orderedFrom(userId: String!): UserData
}

fragment singleBasketItemFields on BasketSingleItem {
  item
  itemCount
  unitPrice
}

input PushNewItemToBasket {
  item: String,
  itemCount: Int,
  unitPrice: Int
}

input UserDataParameter {
  mobileNumber: String,
  userId: String,
  userCity: String,
  pickupLocation: LocationParameter,
  deliveryLocation: LocationParameter,
  pickupDateTime: String,
  deliveryDateTime: String
}

input LocationParameter {
  latitude: String,
  longitude: String,
  street: String
}

input PushNewOrder {
  orderStatus: String,
  orderId: String,
  dateCreated: String,
  basket: [PushNewItemToBasket],
  totalItems: Int,
  userData: UserDataParameter,
  comeDirectly: Boolean
}

type Mutation {
  addItemToBasket (newItem: PushNewItemToBasket!, orderId: String!): BasketSingleOrder,
  addNewOrder (newOrder: PushNewOrder!): Boolean
}

type BasketSingleItem {
  item: String,
  itemCount: Int,
  unitPrice: Int
}

type Location {
  latitude: String,
  longitude: String,
  street: String
}

type UserData {
  mobileNumber: String,
  userId: String,
  userCity: String,
  pickupLocation: Location,
  deliveryLocation: Location,
  pickupDateTime: String,
  deliveryDateTime: String
}

type BasketSingleOrder {
  orderStatus: String,
  orderId: String,
  dateCreated: String,
  basket: [BasketSingleItem],
  totalItems: Int,
  userData: UserData,
  comeDirectly: Boolean
}

schema {
  query: Query,
  mutation: Mutation
}`];

var resolvers = {
  Query: {
    hello: (root) => 'Hello world',
    orders: () => sampleData.orders,
    orderedFrom: (_, { id }) => find(sampleData.orders, { orderId: id})
  },
  Mutation: {
    addItemToBasket: (_, { newItem, id }) => {
      const order = find(sampleData.orders, 'orderId', id)
      console.log('Nasli smo order')
      console.log(order)
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

var schema = makeExecutableSchema({ typeDefs, resolvers })

var app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.listen(4000, () => console.log('Wash Ves GraphQL server is running at localhost:4000'))
