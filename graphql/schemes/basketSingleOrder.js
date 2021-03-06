import BasketSingleItem from './basketSingleItem'
import UserData from './userData'
import sampleData from '../../helpers/fakeData'

const BasketSingleOrder = `
type BasketSingleOrder {
  orderStatus: String,
  dateCreated: String,
  userData: UserData,
  comeDirectly: Boolean,
  orderId: String,
  basket: [BasketSingleItem],
}

type UpdateResult {
  n: Int,
  nModified: Int,
  ok: Int
}

input PushNewItemToBasket {
  item: String,
  itemCount: Int,
  unitPrice: Int
}

input UserDataParameter {
  mobileNum: String,
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
  addItemToBasket (newItem: PushNewItemToBasket!, orderId: String!): Boolean,
  addNewOrder (newOrder: PushNewOrder!): Boolean,
  changeOrderStatus (orderId: String!, newStatus: String!) : Boolean
}
`

export default () => [BasketSingleOrder, BasketSingleItem, UserData]
