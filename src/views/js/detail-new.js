function getDetailNew() {
  checkTokenExpired();
  var id = document.URL.split("?id=")[1];
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    type: "GET",
    url: "http://localhost:3000/api/v1/news/" + id,
    success: function (result) {
      var data = result.data;
      document.querySelector(
        ".content-new"
      ).innerHTML = `<h2 class="title">${data.title}</h2>
        <img src="${data.imgUrl}" alt="" class="imgurl">
        <p class="content">${data.content}</p>`;
    },
  });
}
