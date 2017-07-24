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

const orders = [
      {
        "orderId": "1129",
        "orderStatus": "Zavrsena",
        "comeDirectly": false,
        "dateCreated": "2017-07-11T12:19:56.954Z",
        "userData": {
          "userId": "830067403585441792",
          "userCity": "Sarajevo",
          "mobileNum": "38761552940",
          "pickupLocation": {
            "latitude": "43.864233999999996",
            "longitude": "18.4203681",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "pickupDateTime": "2017-07-12T15:00:00.000Z",
          "deliveryLocation": {
            "latitude": "43.864233999999996",
            "longitude": "18.4203681",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "deliveryDateTime": "2017-07-15T17:00:00.000Z"
        },
        "basket": [
          {
            "item": "Grudnjak",
            "itemCount": 3,
            "unitPrice": 3
          },
          {
            "item": "Potkošulja",
            "itemCount": 4,
            "unitPrice": 2
          },
          {
            "item": "Gaće",
            "itemCount": 5,
            "unitPrice": 2
          },
          {
            "item": "Mantil",
            "itemCount": 2,
            "unitPrice": 20
          },
          {
            "item": "Jakna",
            "itemCount": 2,
            "unitPrice": 20
          },
          {
            "item": "Kaput",
            "itemCount": 1,
            "unitPrice": 25
          }
        ]
      },
      {
        "orderId": "1130",
        "orderStatus": "Zavrsena",
        "comeDirectly": false,
        "dateCreated": "2017-07-11T12:21:51.835Z",
        "userData": {
          "userId": "830067403585441792",
          "userCity": "Sarajevo",
          "mobileNum": "38761552940",
          "pickupLocation": {
            "latitude": "43.864233999999996",
            "longitude": "18.4203681",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "pickupDateTime": "2017-07-11T14:21:00.000Z",
          "deliveryLocation": {
            "latitude": "43.864233999999996",
            "longitude": "18.4203681",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "deliveryDateTime": "2017-07-14T16:21:00.000Z"
        },
        "basket": [
          {
            "item": "Kravata",
            "itemCount": 6,
            "unitPrice": 4
          }
        ]
      },
      {
        "orderId": "1131",
        "orderStatus": "Završena",
        "comeDirectly": true,
        "dateCreated": "2017-07-11T14:10:27.732Z",
        "userData": {
          "userId": "830067403585441792",
          "userCity": "Sarajevo",
          "mobileNum": "38761552940",
          "pickupLocation": {
            "latitude": "43.8555347",
            "longitude": "18.4186769",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "pickupDateTime": "2017-07-27T02:09:00.000Z",
          "deliveryLocation": {
            "latitude": "43.8555347",
            "longitude": "18.4186769",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "deliveryDateTime": "2017-07-31T19:09:00.000Z"
        },
        "basket": []
      },
      {
        "orderId": "1132",
        "orderStatus": "Zavrsena",
        "comeDirectly": false,
        "dateCreated": "2017-07-11T14:11:11.969Z",
        "userData": {
          "userId": "830067403585441792",
          "userCity": "Sarajevo",
          "mobileNum": "38761552940",
          "pickupLocation": {
            "latitude": "43.8555347",
            "longitude": "18.4186769",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "pickupDateTime": "2017-07-24T16:11:00.000Z",
          "deliveryLocation": {
            "latitude": "43.8555347",
            "longitude": "18.4186769",
            "latitudeDelta": "0.0922",
            "longitudeDelta": "0.0421"
          },
          "deliveryDateTime": "2017-07-24T16:11:00.000Z"
        },
        "basket": [
          {
            "item": "Duga suknja",
            "itemCount": 1,
            "unitPrice": 9
          },
          {
            "item": "Kratka suknja",
            "itemCount": 5,
            "unitPrice": 5
          }
        ]
      }
  ]

export default orders
