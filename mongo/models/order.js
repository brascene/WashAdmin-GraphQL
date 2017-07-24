var mongoose = require('mongoose')
var Schema = mongoose.Schema

var basketSingleItem = new Schema({
	item: String,
	itemCount: Number,
	unitPrice: Number
})

var userData = new Schema({
	mobileNum: String,
	userId: String,
	userCity: String,
	pickupLocation: {
		latitude: String,
		longitude: String,
		latitudeDelta: {
			type: String,
			default: '0'
		},
		longitudeDelta: {
			type: String,
			default: '0'
		},
		pickupStreet: String
	},
	pickupDateTime: {
		type: Date,
		default: Date.now
	},
	deliveryLocation: {
		latitude: String,
		longitude: String,
		latitudeDelta: {
			type: String,
			default: '0'
		},
		longitudeDelta: {
			type: String,
			default: '0'
		},
		deliveryStreet: String
	},
	deliveryDateTime: {
		type: Date,
		default: Date.now
	}
})

var basketSingleOrder = new Schema({
	orderStatus: String,
	orderId: String,
	dateCreated: Date,
	basket: [basketSingleItem],
	userData: userData,
	comeDirectly: Boolean
})

module.exports = mongoose.model('order', basketSingleOrder)
