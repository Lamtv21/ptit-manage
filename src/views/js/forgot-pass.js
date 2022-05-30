function forgot() {
  let email = document.querySelector('.email')
  let acc = {
    email: email.value
  }
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'POST',
    url: 'http://localhost:3000/api/v1/auth/forgot-password',
    data: JSON.stringify(acc),
    success: function (result) {
      alert(result.message)
    }
  })
}
