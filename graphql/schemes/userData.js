import Location from './location'

const UserData = `
type UserData {
  mobileNumber: String,
  userId: String,
  userCity: String,
  pickupLocation: Location,
  deliveryLocation: Location,
  pickupDateTime: String,
  deliveryDateTime: String
}
`

export default () => [UserData, Location]
