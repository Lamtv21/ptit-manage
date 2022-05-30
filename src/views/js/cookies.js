function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function setCookie(cname, cvalue, expired) {
  var now = new Date()
  var time = now.getTime()
  var expireTime = time + 1000 * expired
  now.setTime(expireTime)
  document.cookie = cname + '=' + cvalue + ';expires=' + now.toUTCString() + ';path=/'
}

function deleteCookie() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

function logout() {
  document.location.href = '/login'
  deleteCookie()
}

//--kiểm tra token còn hạn không
function checkTokenExpired() {
  if (getCookie('token') == '') {
    refreshToken()
  }
}

function refreshToken() {
  if (getCookie('refreshToken') == '') {
    document.location.href = '/login'
  } else {
    let refresh = {
      refreshToken: getCookie('refreshToken')
    }
    $.ajax({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'http://localhost:3000/api/v1/auth/refresh-token',
      data: JSON.stringify(refresh),
      success: function (result) {
        console.log(result.data.accessToken)
        setCookie('token', result.data.accessToken, 900)
      }
    })
  }
}

function role() {
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'GET',
    url: 'http://localhost:3000/api/v1/user/me',
    success: function (result) {
      var data = result.data
      if (data.userTypeId == 3) {
        document.querySelector('.users').style.display = 'none'
        document.querySelector('.news').style.display = 'none'
      }
    }
  })
}
