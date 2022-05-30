function getUsers() {
  checkTokenExpired()
  $.ajax({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    type: 'GET',
    url: 'http://localhost:3000/api/v1/user/',
    success: function (result) {
      var data = result.data
      var content = `<tr>
                        <th style="width: 10%">ID</th>
                        <th style="width: 25%">Họ tên</th>
                        <th style="width: 25%">Email</th>
                        <th style="width: 20%">Vai trò</th>
                        <th style="width: 20%"></th>
                        </tr>`
      data.forEach(element => {
        content += `<tr>
                                <td style="width: 10%;">${element.id}</td>
                                <td style="width: 25%;">${element.firstName} ${element.lastName}</td>
                                <td style="width: 25%;">${element.email}</td>
                                <td style="width: 20%;">${element.userTypeId == 1 ? 'Quản lý' : 'Sinh viên'}</td>
                                <td style="width: 20%;">
                                    <a href="/info-user?id=${element.id}" class="detail-user">Chi tiết</a>
                                </td>
                            </tr>`
      })
      document.querySelector('table').innerHTML = content
    }
  })
}
