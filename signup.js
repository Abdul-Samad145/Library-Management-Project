
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();

 
  let users = JSON.parse(localStorage.getItem("users")) || [];


  if (users.some(user => user.email === email)) {
    alert(" Email already registered!");
    return;
  }


  users.push({ email, password });


  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
 
  window.location.href = "signin.html";
});

