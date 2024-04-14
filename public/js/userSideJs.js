function errorHandler(errorfield, message) {

    errorfield.style.display = "block";
    errorfield.textContent = message;

  }

  function validateForm() {
    let sapn = document.querySelectorAll("span");
    sapn.forEach((span) => {
      span.style.display = "none"
      span.classList.add("text-red-600")
    });
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let dob = document.getElementById("dob");
    let role = document.getElementsByName("role");
    let gender= document.getElementsByName("gender");

    // For Handling errors
    let errorFirstName = document.querySelector(".errorFirstName");
    let errorLastName = document.querySelector(".errorLastName");
    let errorEmail = document.querySelector(".errorEmail");
    let errorDate = document.querySelector(".errorDob");
    let errorRole = document.querySelector(".errorRole");
    let errorGender = document.querySelector(".errorGender");

    if (firstName.value == "") {
      errorHandler(errorFirstName, "Firstname is required")
      return false
    }
    if (lastName.value == "") {
      errorHandler(errorLastName, "LastName is required")
      return false
    }
    if (email.value == "") {
      errorHandler(errorEmail, "email is required")
      return false
    } else {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (!email.value.match(mailformat)) {               
                  errorHandler(errorEmail,"Enter Valid Email");
                  isValid = false;
              }

    }
    if(dob.value==""){
      errorHandler(errorDate,"Date is required")
      return false
    }
  
    if (!role[0].checked &&!role[1].checked) {
        errorHandler(errorRole, "Role is required");
        return false
    }
    if (!gender[0].checked &&!gender[1].checked) {
        errorHandler(errorGender, "Gender is required");
        return false
    }

    Data();
}

    async function Data(){
        let form = document.getElementById("Register");
        const data = new URLSearchParams(new FormData(form));
        let bodyData = await fetch(`http://localhost:3000/auth/register`,{
        method:"POST",
        headers: {
                'Content-Type': ' application/x-www-form-urlencoded'
        },
        body: data
    });
    let al = await bodyData.json();
       if(al.code == 1){
            let activationlink = al.activationlink;
            let id = al.id;
            document.getElementById('al').style.display='block';
            document.getElementById('al').innerHTML = `Account Created Successfull please copy this link and paste in url http://localhost:3000/auth/activation?ac=${activationlink}&Id=${id} For Activating the account`;
       }
       else{
            let message = al.message;
            alert(message)
       }
  }