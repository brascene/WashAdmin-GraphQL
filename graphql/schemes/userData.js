import { PickupLocation, DeliveryLocation } from './location'

const UserData = `
type UserData {
  mobileNum: String,
  userId: String,
  userCity: String,
  pickupLocation: PickupLocation,
  deliveryLocation: DeliveryLocation,
  pickupDateTime: String,
  deliveryDateTime: String
}
`

export default () => [UserData, PickupLocation, DeliveryLocation]
