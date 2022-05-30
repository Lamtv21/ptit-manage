function getProfile() {
  checkTokenExpired();
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    type: "GET",
    url: "http://localhost:3000/api/v1/user/me",
    success: function (result) {
      var data = result.data;
      document.querySelector(".firstname").value = data.firstName;
      document.querySelector(".lastname").value = data.lastName;
      document.querySelector(".email").value = data.email;
      document.querySelector(".address").value = data.address;
      document.querySelector(".phone-number").value = data.phoneNumber;
      document.querySelector(".sex").value = data.sex;
      document.querySelector(".age").value = data.age;
    },
  });
}

function updateProfile() {
  checkTokenExpired();
  var firstname = document.querySelector(".firstname").value;
  var lastname = document.querySelector(".lastname").value;
  var address = document.querySelector(".address").value;
  var phoneNumber = document.querySelector(".phone-number").value;
  var sex = document.querySelector(".sex").value;
  var age = document.querySelector(".age").value;
  var newProfile = {
    firstName: firstname,
    lastName: lastname,
    address: address,
    phoneNumber: phoneNumber,
    sex: sex,
    age: age,
  };
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    type: "PUT",
    url: "http://localhost:3000/api/v1/user/me",
    data: JSON.stringify(newProfile),
    success: function (result) {
      alert(result.message);
    },
  });
}

function changePassword() {
  checkTokenExpired();
  var pass = document.querySelector(".new-password").value;
  var confirmPass = document.querySelector(".confirm-password").value;
  var newPass = {
    password: pass,
    confirmPassword: confirmPass,
  };
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    type: "PATCH",
    url: "http://localhost:3000/api/v1/auth/change-password",
    data: JSON.stringify(newPass),
    success: function (result) {
      alert(result.message);
    },
  });
}
