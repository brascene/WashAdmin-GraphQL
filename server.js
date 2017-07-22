var express = require('express');
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
import resolvers from './graphql/resolvers/main'

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

var schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, BasketSingleOrder],
  resolvers: resolvers })

var app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.listen(4000, () => console.log('Wash Ves GraphQL server is running at localhost:4000'))
