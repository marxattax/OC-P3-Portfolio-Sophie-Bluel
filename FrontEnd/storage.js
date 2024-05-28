/* Adresses API */

const urlWorks = "http://localhost:5678/api/works"
const urlCate = "http://localhost:5678/api/categories"
const urlLogin = "http://localhost:5678/api/users/login"

/* Recuperation du local storage */

const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

const lsCategorie = window.localStorage.getItem("categorie")
const categorie = JSON.parse(lsCategorie)

const lsWorks = window.localStorage.getItem("works")
const works = JSON.parse(lsWorks)

/* Changement si user connecte */
const loginLink = document.querySelector("#login-link")
if(userId) {
        loginLink.removeChild(loginLink.firstChild)
        const logout = document.createElement("a")
        logout.innerText = "logout"
        logout.href = "index.html"
        logout.addEventListener("click", () => {
            window.localStorage.removeItem("userId")
            window.localStorage.removeItem("token")
        })
        loginLink.appendChild(logout)
}
