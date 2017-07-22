const PickupLocation = {
  latitude: 'toliko i toliko',
  longitude: 'tamo vamo',
  pickupStreet: 'Prkanj',
  longitudeDelta: '0.001',
  latitudeDelta: '0.01'
}

const DeliveryLocation = {
  latitude: 'toliko i toliko',
  longitude: 'tamo vamo',
  deliveryStreet: 'Prkanj',
  longitudeDelta: '0.001',
  latitudeDelta: '0.01'
}

const UserData = {
  userId: 'unique ID 1',
  mobileNum: '555 555 555',
  userCity: 'City 1',
  pickupLocation: PickupLocation,
  deliveryLocation: DeliveryLocation,
  pickupDateTime: 'pickup data 1',
  deliveryDateTime: 'delivery data 1'
}

const basket1 = {
  item: 'Majica',
  itemCount: 4,
  unitPrice: 10
}

const basket2 = {
  item: 'Sorc',
  itemCount: 10,
  unitPrice: 5
}

const basket3 = {
  item: 'Gace',
  itemCount: 20,
  unitPrice: 2
}

const BasketSingleOrder = {
  orderStatus: 'Poslana',
  dateCreated: 'danas',
  userData: UserData,
  comeDirectly: false,
  orderId: '2332',
  basket: [basket1, basket2, basket3],
}

const sampleData = {
  orders: [BasketSingleOrder, BasketSingleOrder]
}

export default sampleData
