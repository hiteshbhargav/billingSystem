//listen auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    document.querySelector(".logged-in").style.display = "block";
  } else {
    // console.log("user logged out");
    document.querySelector(".logged-in").style.display = "none";
    document.getElementById("main").style.display = "none";
  }
});

//logout user
const logout = document.querySelector(".logged-in");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "index.html";
});
