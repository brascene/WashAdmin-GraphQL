const Location = {
  latitude: 'toliko i toliko',
  longitude: 'toliko i toliko',
  street: 'Ulica 1'
}

const UserData = {
  mobileNumber: '555 555 555',
  userId: 'unique ID 1',
  userCity: 'City 1',
  pickupLocation: Location,
  deliveryLocation: Location,
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
  orderId: '2332',
  dateCreated: 'danas',
  basket: [basket1, basket2, basket3],
  totalItems: 15,
  userData: UserData,
  comeDirectly: false
}

const sampleData = {
  orders: [BasketSingleOrder, BasketSingleOrder]
}

export default sampleData
