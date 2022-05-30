function newAccount() {
  checkTokenExpired();
  var email = document.querySelector(".email").value;
  var firstname = document.querySelector(".firstname").value;
  var lastname = document.querySelector(".lastname").value;
  var password = document.querySelector(".password").value;
  var confirmPassword = document.querySelector(".confirm-password").value;
  var role = document.querySelector("input[name='role']:checked").value;
  var newAcc = {
    email: email,
    firstName: firstname,
    lastName: lastname,
    password: password,
    confirmPassword: confirmPassword,
    userTypeId: role,
  };
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    type: "POST",
    url: "http://localhost:3000/api/v1/auth/register",
    data: JSON.stringify(newAcc),
    success: function (result) {
      alert(result.message);
    },
  });
}
