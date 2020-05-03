const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      loginForm.reset();
      window.location.href = "home.html";
    })
    .catch((err) => {
      console.log(err.message);
      document.querySelector(".error").innerHTML = err.message;
    });
});
