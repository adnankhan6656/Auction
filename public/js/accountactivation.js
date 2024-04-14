function errorHandler(errorfield, message) {

    errorfield.style.display = "block";
    errorfield.textContent = message;
    
    }
function validatepassword()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('Id')
    let sapn = document.querySelectorAll("span");
      sapn.forEach((span) => {
        span.style.display = "none"
        span.classList.add("text-red-600")
      });
        let password = document.getElementById("password");
        let confirm_password = document.getElementById("confirmPassword");
        let passwordError = document.querySelector(".passwordError");
        let pr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
               if(password.value==""){
               return errorHandler(passwordError,"Password is required")
               }
               if(confirm_password.value==""){
                return errorHandler(passwordError,"Confirm Password is required")
               }
              if(password.value != confirm_password.value) {
               return errorHandler(passwordError,"password Does not match")
              }
              if(!password.value.match(pr)){
                return errorHandler(passwordError,"password Does not match the format")
              }

    passwordvalid(id);
}

async function passwordvalid(id)
{
    console.log("Hello")
    const queryString = window.location.href;
    if(queryString.includes('activation')){
        let form = document.getElementById('passwordform');
        const data = new URLSearchParams(new FormData(form));
        let bodyData = await fetch(`http://localhost:3000/auth/activation?Id=${id}`,{
            method:"POST",
            headers: {
                    'Content-Type': ' application/x-www-form-urlencoded'
            },
            body: data
        });

        let message = await bodyData.json();
        if(message.code == 1){
            alert(message.alert)
            window.location.href=`http://localhost:3000/auth/login`;
        }
    }

}