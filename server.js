var express = require('express');
import mongoose from 'mongoose'
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var lodash = require('lodash')
const find = lodash.find, filter = lodash.filter

// Sample data
import sampleData from './helpers/fakeData'

// Schemes
import BasketSingleOrder from './graphql/schemes/BasketSingleOrder'
import UserData from './graphql/schemes/userData'

// Resolvers
//import resolvers from './graphql/resolvers/withFetching'
import resolvers from './graphql/resolvers/withSampleData'

const RootQuery = `
type RootQuery {
  hello: String,
  orders: [BasketSingleOrder],
  ordersByStatus(orderStatus: String!): [BasketSingleOrder]
  orderById(orderId: String!): BasketSingleOrder
}
`
const SchemaDefinition = `
schema {
  query: RootQuery,
  mutation: Mutation
}`

var schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, BasketSingleOrder],
  resolvers: resolvers })

var app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

var db = mongoose.connect('mongodb://localhost:27017/wesh-admin')

app.listen(4000, () => console.log('Wash Ves GraphQL server is running at localhost:4000'))
