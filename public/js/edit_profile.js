const nodeById = (id) => document.getElementById(id);
const nodeByQueries = (query) => document.querySelectorAll(query);
const editButton = nodeById("editButton");
const editProfileForm = nodeById("editProfileForm");
const formData = new FormData(editProfileForm);


const updateFormDataAsJson = async (url, formData) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "PUT",
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
    console.log(await response.json());
    return response;
}

const updateData = async()=>{
    try {
        const response = await updateFormDataAsJson('http://localhost:3005/users/update/profile', formData);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
   
}

editButton.addEventListener("click", () => { updateData() })