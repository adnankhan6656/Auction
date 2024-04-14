const nodeById = (id) => document.getElementById(id);
const nodeByQueries = (query) => document.querySelectorAll(query);
const editProfile = nodeById("editProfile");

editProfile.addEventListener("click", () => window.location.pathname = "users/update/profile")