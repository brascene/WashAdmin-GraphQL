import rp from 'request-promise'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTE2ZWI3MmZiYmU4MTliYTU5MDM3OSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTQ5NjU4NzkwMH0.YuvEB5By7r-lZuGyRqP_BNgDVjyWEZBMshu1ff8Uswo'

var options = {
  uri: 'https://realcleaner.herokuapp.com/api/orders',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  json: true
}

export function getAllOrdersFromHeroku() {
  return rp(options)
  .then((data) => {
    console.log('Narudze primljene')
    return data
  })
  .catch((err) => {
    console.error(err)
  })
}
