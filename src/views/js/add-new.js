function createNew() {
  checkTokenExpired()
  var titleNew = document.querySelector('.title-new').value
  var contentNew = document.querySelector('#content-new').value
  var imgNew = document.querySelector('.img-new').value
  var aNew = {
    title: titleNew,
    content: contentNew,
    imgUrl: imgNew
  }
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'POST',
    url: 'http://localhost:3000/api/v1/news/',
    data: JSON.stringify(aNew),
    success: function (result) {
      alert(result.message)
    }
  })
}

function updateNew() {
  checkTokenExpired()
  var id = document.URL.split('?id=')[1]
  var titleNew = document.querySelector('.title-new').value
  var contentNew = document.querySelector('#content-new').value
  var imgNew = document.querySelector('.img-new').value
  var aNew = {
    title: titleNew,
    content: contentNew,
    imgUrl: imgNew
  }
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'PUT',
    url: 'http://localhost:3000/api/v1/news/' + id,
    data: JSON.stringify(aNew),
    success: function (result) {
      alert(result.message)
    }
  })
}

function getDetailNew() {
  checkTokenExpired()
  var id = document.URL.split('?id=')[1]
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'GET',
    url: 'http://localhost:3000/api/v1/news/' + id,
    success: function (result) {
      var data = result.data
      document.querySelector('.title-new').value = data.title
      document.querySelector('#content-new').value = data.content
      document.querySelector('.img-new').value = data.imgUrl
    }
  })
}
