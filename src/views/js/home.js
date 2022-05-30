function getNews() {
  checkTokenExpired()
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'GET',
    url: 'http://localhost:3000/api/v1/news/',
    success: function (result) {
      var data = result.data
      var content = ``
      data.forEach(element => {
        content += `<a href="/detail-new?id=${element.id}" class="new">
                                <img src="${element.imgUrl}" alt="" class="img-new">
                                <div class="title-new">${element.titleShort}</div>  
                            </a>`
      })
      document.querySelector('.main').innerHTML = content
    }
  })
}

function getBySearch() {
  checkTokenExpired()
  var title = document.querySelector('.input-search').value
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'GET',
    url: 'http://localhost:3000/api/v1/news/search?title=' + title,
    success: function (result) {
      var data = result.data
      var content = ``
      data.forEach(element => {
        content += `<a href="/detail-new?id=${element.id}" class="new">
                                <img src="${element.imgUrl}" alt="" class="img-new">
                                <div class="title-new">${element.titleShort}</div>  
                            </a>`
      })
      document.querySelector('.main').innerHTML = content
    }
  })
}
