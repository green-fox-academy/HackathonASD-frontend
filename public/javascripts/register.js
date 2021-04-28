function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    var email = document.getElementById("email").value;

    if (username == null || username == "") {
        let errorMessage = document.getElementById("error-messages");
        errorMessage.innerHTML = "Please Enter Your Username";
        return false;
    } else if (password == null || password == "") {
        let errorMessage = document.getElementById("error-messages");
        errorMessage.innerHTML = "Please Enter Your Password";
        return false;
    } else if (email == null || email == "") {
        let errorMessage = document.getElementById("error-messages");
        errorMessage.innerHTML = "Please Enter Your Email Address";
        return false;
    } else if (password !== password2) {
        let errorMessage = document.getElementById("error-messages");
        errorMessage.innerHTML = "Your passwords didn't match";
        return false;
    }

    var requestData = {
        "username": username,
        "password": password,
        "email": email
    }

    async function register(data) {

        const response = await fetch("http://localhost:8080/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.status == 200) {
            return response.json();
        } else {
            response.json()
                .then(data => {
                    let errorMessage = document.getElementById("error-messages");
                    errorMessage.innerHTML = data.message;
                });
        }
    }

    async function registerAndFetchData() {

        register(requestData)
            .then(data => {
                if (typeof data !== "undefined") {
                    alert("Your registration was successful. Please verify your e-mail!");
                    window.location.replace("/");
                }
            }).catch(err => {
                console.log(err);
            });
    }

    registerAndFetchData();
}