import BasketSingleItem from './basketSingleItem'
import UserData from './userData'
import sampleData from '../../helpers/fakeData'

const BasketSingleOrder = `
type BasketSingleOrder {
  orderStatus: String,
  orderId: String,
  dateCreated: String,
  basket: [BasketSingleItem],
  totalItems: Int,
  userData: UserData,
  comeDirectly: Boolean
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
`

export default () => [BasketSingleOrder, BasketSingleItem, UserData]
