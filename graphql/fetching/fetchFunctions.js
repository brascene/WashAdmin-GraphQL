import rp from 'request-promise'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTE2ZWI3MmZiYmU4MTliYTU5MDM3OSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTQ5NjU4NzkwMH0.YuvEB5By7r-lZuGyRqP_BNgDVjyWEZBMshu1ff8Uswo'

var allOrdersConfig = {
  uri: 'https://realcleaner.herokuapp.com/api/orders',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  json: true
}

export function getAllOrdersFromHeroku() {
  return rp(allOrdersConfig)
  .then((data) => {
    console.log('Narudze primljene')
    return data
  })
  .catch((err) => {
    console.error(err)
  })
}

export function changeOrderStatus(orderId, newStatus) {
  var options = {
    method: 'POST',
    uri: 'https://realcleaner.herokuapp.com/api/orders/editstatus',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: {
      orderId: orderId,
      newStatus: newStatus
    },
    json: true
  }

  return rp(options)
  .then((data) => {
    console.log('Status promijenjen')
    console.log(data)
    return data.ok
  })
  .catch((err) => {
    console.error(err)
  })
}
