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
      var content = `<tr>
                            <th style="width: 10%">ID</th>
                            <th style="width: 50%">Tiêu đề</th>
                            <th style="width: 15%">Người tạo</th>
                            <th style="width: 10%">Ngày tạo</th>
                            <th style="width: 15%"></th>
                        </tr>`
      data.forEach(element => {
        content += `<tr>
                                <td style="width: 10%;">${element.id}</td>
                                <td style="width: 50%;">${element.titleShort}</td>
                                <td style="width: 10%;">${element.user.firstName} ${element.user.lastName}</td>
                                <td style="width: 10%;">${element.createdAt}</td>
                                <td style="width: 15%;">
                                    <a href="/add-new?id=${element.id}" class="detail-user">Sửa</a>
                                    <a onclick = "deleteNew(${element.id})" class="detail-user">Xóa</a>
                                </td>
                            </tr>`
      })
      document.querySelector('table').innerHTML = content
    }
  })
}

function deleteNew(id) {
  checkTokenExpired()
  if (confirm('Xóa bài viết?')) {
    $.ajax({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      type: 'DELETE',
      url: 'http://localhost:3000/api/v1/news/' + id,
      success: function (result) {
        alert(result.message)
        getNews()
      }
    })
  }
}
