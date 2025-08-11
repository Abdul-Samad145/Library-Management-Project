document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); 

  let email = document.getElementById("signinEmail").value.trim();
  let password = document.getElementById("signinPassword").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    alert("Login successful!");
    window.location.href = "home.html"; // Redirect to home page
  } else {
    alert("Invalid email or password!");
  }
});
