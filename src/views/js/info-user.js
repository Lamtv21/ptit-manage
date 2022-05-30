function getInfoUser() {
  checkTokenExpired()
  var id = document.URL.split('?id=')[1]
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'GET',
    url: 'http://localhost:3000/api/v1/user/' + id,
    success: function (result) {
      var data = result.data
      document.querySelector('.id').value = data.id
      document.querySelector('.email').value = data.email
      document.querySelector('.firstname').value = data.firstName
      document.querySelector('.lastname').value = data.lastName
      document.querySelector('.address').value = data.address
      document.querySelector('.phone-number').value = data.phoneNumber
      document.querySelector('.sex').value = data.sex != 'unknown' ? data.sex : ''
      document.querySelector('.age').value = data.age
      document.querySelector('.role').value = data.userTypeId == 1 ? 'Quản lý' : 'Sinh viên'
      document.querySelector('.creat-at').value = data.createdAt
    }
  })
}

function updateInfoUser() {
  checkTokenExpired()
  var id = document.querySelector('.id').value
  var email = document.querySelector('.email').value
  var firstname = document.querySelector('.firstname').value
  var lastname = document.querySelector('.lastname').value
  var address = document.querySelector('.address').value
  var phoneNumber = document.querySelector('.phone-number').value
  var sex = document.querySelector('.sex').value
  var age = document.querySelector('.age').value
  var newInfoUser = {
    id: id,
    firstName: firstname,
    lastName: lastname,
    address: address,
    phoneNumber: phoneNumber,
    sex: sex,
    age: age
  }
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'PUT',
    url: 'http://localhost:3000/api/v1/user/' + id,
    data: JSON.stringify(newInfoUser),
    success: function (result) {
      alert(result.message)
    }
  })
}
