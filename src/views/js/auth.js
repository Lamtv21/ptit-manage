function singin() {
  let email = document.querySelector('.email')
  let password = document.querySelector('.password')
  let acc = {
    email: email.value,
    password: password.value
  }
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    type: 'POST',
    url: 'http://localhost:3000/api/v1/auth/login',
    data: JSON.stringify(acc),
    success: function (result) {
      console.log(result.data.accessToken)
      setCookie('token', result.data.accessToken, 900)
      setCookie('refreshToken', result.data.refreshToken, 604800)

      document.location.href = '/home'
    }
  })
}

function resetPass() {
  let url = document.URL.replace('&userId', '')
  let refreshToken = url.split('=')[1]
  let userId = url.split('=')[2]
  let pass = document.querySelector('.new-pass').value
  let repass = document.querySelector('.re-pass').value
  let acc = {
    password: pass,
    confirmPassword: repass,
    resetToken: refreshToken,
    userId: userId
  }
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    type: 'PATCH',
    url: 'http://localhost:3000/api/v1/auth/reset-password',
    data: JSON.stringify(acc),
    success: function (result) {
      alert(result.message)
    }
  })
}
