async function getAuthUser(token) {
  const auth = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await auth.json();
  console.log(data);

  if (data.message === "Invalid token") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "index-login.html";
  }

  return data;
}

async function checkLogin() {
  const token = localStorage.getItem("access_token");
  console.log(window.location.href);
  if (token) {
    console.log(token);
    const auth = await getAuthUser(token);
    console.log(auth);

    if (auth && window.location.href.indexOf("index-login.html") != -1) {
      window.location.href = "index.html";
      return;
    }

    if (
      window.location.href.indexOf("index.html") != -1 ||
      window.location.href === "https://hellookittyyy.github.io/labss/lab_13/"
    ) {
      const name = document.getElementById("username");
      name.innerText = auth.firstName;
      insertUsers();
    }

    if (window.location.href.indexOf("index-user.html") != -1) {
      const name = document.getElementById("name");
      name.innerText = auth.firstName;
      const id = window.location.search.split("=")[1];
      loadUserInfo(id);
    }
  } else if (window.location.href.indexOf("login.html") == -1) {
    window.location.href = "index-login.html";
  }
}

function loadUserInfo(id) {
  const url = `https://dummyjson.com/users/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const fullName = document.getElementById("fullName");
      fullName.innerText = `${data.firstName} ${data.lastName}`;

      const email = document.getElementById("email");
      email.innerText = data.email;

      const phone = document.getElementById("phone");
      phone.innerText = data.phone;

      const gender = document.getElementById("gender");
      gender.innerText = data.gender;

      const age = document.getElementById("age");
      age.innerText = data.age;

      const address = document.getElementById("address");
      address.innerText = data.address.address + ", " + data.address.city;

      const country = document.getElementById("country");
      country.innerText = data.address.country;

      const image = document.getElementById("userImage");
      image.src = data.image;

      const username = document.getElementById("username");
      username.innerText = data.username;

      const password = document.getElementById("password");
      password.innerText = data.password;
    });
}

async function insertUsers() {
  const url = "https://dummyjson.com/users";

  const users = await fetch(url);

  const data = await users.json();

  const usersContainer = document.getElementById("users");

  data.users.forEach((user) => {
    const article = document.createElement("article");
    article.classList.add("user");

    article.innerHTML = `
    <h2>${user.username}</h2>
    <img src="${user.image}">
    <p>First name: ${user.firstName}</p>
    <p>Last name: ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Gender: ${user.gender}</p>
    <a href="index-user.html?id=${user.id}">More info</a>
    `;

    usersContainer.appendChild(article);
  });
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(username, password);

  const login = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    mode: "cors",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await login.json();
  console.log(data);

  if (!data.accessToken) {
    const error = document.getElementById("error");
    error.innerText = data.message;
  } else {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "index-login.html";
}

checkLogin();
