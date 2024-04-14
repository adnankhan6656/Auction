function errorHandler(errorfield, message) {
  errorfield.style.display = "block";
  errorfield.textContent = message;
}
function validateForm() {
  let sapn = document.querySelectorAll("span");
  sapn.forEach((span) => {
    span.style.display = "none";
    span.classList.add("text-red-600");
  });

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let passwordError = document.querySelector(".passwordError");
  let errorEmail = document.querySelector(".errorEmail");

  if (email.value == "") {
    errorHandler(errorEmail, "email is required");
    return false;
  } else {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.value.match(mailformat)) {
      errorHandler(errorEmail, "Enter Valid Email");
      isValid = false;
      return false;
    }
  }
  if (password.value == "") {
    errorHandler(passwordError, "Password is required");
    return false;
  }
  return true;
}
