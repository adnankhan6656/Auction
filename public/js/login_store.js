const submit_button = document.getElementById("submit-button");
const form = document.querySelector("#login-form");

const postFormDataAsJson = async (url, formData) => {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response;
};

async function start() {
  const url = window.location.href;
  const form_data = new FormData(form);
  let response = await postFormDataAsJson(url, form_data);
  response = await response.json();

  invalid(response);
}

function invalid(response) {
  const invalidError = document.getElementById("invalid-error");
  if (invalidError) {
    invalidError.remove();
  }
  if (response.error === false && response.role) {
    window.location.href = `/${response.role}/dashboard`;
  } else {
    const div = document.getElementById("login-form");
    const p = document.createElement("p");
    p.id = "invalid-error";
    p.innerHTML = "Login failed - Email or password did not match";
    p.classList.add("text-base", "text-red-600", "p-3", "mx-auto");
    div.append(p);
  }
}

submit_button.addEventListener("click", () => {
  const valid = validateForm();
  if (valid) {
    start();
  }
});
