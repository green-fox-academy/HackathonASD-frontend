function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == null || username == "") {
        let errorMessage = document.getElementById("error-messages");
        errorMessage.innerHTML = "Please Enter Your Username"
        return false;
    } else if (password == null || password == "") {
        let errorMessage = document.getElementById("error-messages");
        errorMessage.innerHTML = "Please Enter Your  Password"
        return false;
    }

    var requestData = {
        "username": username,
        "password": password,
    }

    async function register(url = '', data = {}) {
        const response = await fetch(url, {
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

    async function registerAndFetch() {
        const BACKEND_URL = await fetch('/api').then(res => {
            return res.text();
        })

        register(BACKEND_URL + '/login', requestData)
            .then(data => {
                if (typeof data !== "undefined") {
                    window.localStorage.setItem('X-tribes-token', data.jwt);
                    window.location.replace("/kingdom");
                    //  console.log(window.localStorage.getItem('X-tribes-token'))
                }
            }).catch(err => {
                console.log(err);
            });

    }

    registerAndFetch();
}