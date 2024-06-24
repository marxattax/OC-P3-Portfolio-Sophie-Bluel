function connexion() {

    const formulaire = document.querySelector("#formulaire-login")
    formulaire.addEventListener("submit", function (event) {
        event.preventDefault()
        const donnees = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
            }
        const chargeUtile = JSON.stringify(donnees)
        fetch(urlLogin, {
            method: "POST",
            headers: { "Content-type" : "application/json" },
            body: chargeUtile
            })
        .then(resp => {
            if (resp.status != "200") {
                const erreur = document.querySelector(".erreur")
                erreur.innerText = "Email ou mot de passe incorrect(s). Veuillez réessayer"
            }

            else {
                return resp.json()
                .then(login => {
                    const token = window.localStorage.setItem("token", login.token);
                    const userId = window.localStorage.setItem("userId", login.userId);
                    const submit = document.querySelector("#connexion")
                    submit.onclick = redirection()
                })
            }
        })
    })
}

async function redirection () {
    window.location.href = await ('index.html')
}

connexion()