'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var _require = require('graphql-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var _require2 = require('graphql-tools'),
    makeExecutableSchema = _require2.makeExecutableSchema;

var lodash = require('lodash');
var find = lodash.find,
    filter = lodash.filter;

var sampleData = require('./fakeData');
var _orders = [];

var typeDefs = ['\ntype Query {\n  hello: String,\n  orders: [BasketSingleOrder],\n  orderedFrom(userId: String!): UserData\n}\n\nfragment singleBasketItemFields on BasketSingleItem {\n  item\n  itemCount\n  unitPrice\n}\n\ninput PushNewItemToBasket {\n  item: String,\n  itemCount: Int,\n  unitPrice: Int\n}\n\ntype Mutation {\n  addOrderToBasket (newItem: PushNewItemToBasket!, orderId: String!): BasketSingleOrder\n}\n\ntype BasketSingleItem {\n  item: String,\n  itemCount: Int,\n  unitPrice: Int\n}\n\ntype Location {\n  latitude: String,\n  longitude: String,\n  street: String\n}\n\ntype UserData {\n  id: ID!,\n  mobileNumber: String,\n  userId: String,\n  userCity: String,\n  pickupLocation: Location,\n  deliveryLocation: Location,\n  pickupDateTime: String,\n  deliveryDateTime: String\n}\n\ntype BasketSingleOrder {\n  id: ID!,\n  orderStatus: String,\n  orderId: String,\n  dateCreated: String,\n  basket: [BasketSingleItem],\n  totalItems: Int,\n  userData: UserData,\n  comeDirectly: Boolean\n}\n\nschema {\n  query: Query,\n  mutation: Mutation\n}'];

var resolvers = {
  Query: {
    hello: function hello(root) {
      return 'Hello world';
    },
    orders: function orders() {
      return _orders;
    },
    orderedFrom: function orderedFrom(_, _ref) {
      var id = _ref.id;
      return find(_orders, { orderId: id });
    }
  },
  Mutation: {
    addOrderToBasket: function addOrderToBasket(_, _ref2) {
      var newItem = _ref2.newItem,
          id = _ref2.id;

      var order = find(_orders, { orderId: id });
      if (!order) {
        throw new Error('Nema te narudzbe');
      }
      order.basket.add(newItem);
      return order;
    }
  }
};

var schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });

var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(4000, function () {
  return console.log('Wash Ves GraphQL server is running at localhost:4000');
});
