const Location = `
type Location {
  latitude: String,
  longitude: String,
  street: String
}
`

const PickupLocation = `
type PickupLocation {
  latitude: String,
  longitude: String,
  pickupStreet: String,
  longitudeDelta: String,
  latitudeDelta: String
}
`

const DeliveryLocation = `
type DeliveryLocation {
  latitude: String,
  longitude: String,
  deliveryStreet: String,
  longitudeDelta: String,
  latitudeDelta: String
}
`



export default () => [Location]

export {
  PickupLocation,
  DeliveryLocation
}
