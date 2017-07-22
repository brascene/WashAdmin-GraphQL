var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var lodash = require('lodash')
const find = lodash.find, filter = lodash.filter

import sampleData from './helpers/fakeData'

import BasketSingleOrder from './graphql/schemes/BasketSingleOrder'
import UserData from './graphql/schemes/userData'

const RootQuery = `
type RootQuery {
  hello: String,
  orders: [BasketSingleOrder],
  orderedFrom(userId: String!): UserData
}
`
const SchemaDefinition = `
schema {
  query: RootQuery,
  mutation: Mutation
}`

var resolvers = {
  RootQuery: {
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

var schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, BasketSingleOrder],
  resolvers: resolvers })

var app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.listen(4000, () => console.log('Wash Ves GraphQL server is running at localhost:4000'))
