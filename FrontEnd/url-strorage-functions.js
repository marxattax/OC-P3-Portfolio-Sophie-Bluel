/* Adresses API */

const urlWorks = "http://localhost:5678/api/works"
const urlCate = "http://localhost:5678/api/categories"
const urlLogin = "http://localhost:5678/api/users/login"

/* Recuperation des donnees API */

fetch(urlCate)
.then(resp => resp.json())
.then(dataCate => {

    const cate = Array.from(dataCate)
    window.localStorage.setItem("categorie", JSON.stringify(cate))
})

fetch(urlWorks)
.then(resp => resp.json())
.then(dataWorks => {

    const works = Array.from(dataWorks)
    window.localStorage.setItem("works", JSON.stringify(works))
})

/* Recuperation du local storage */

const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

const lsCategorie = window.localStorage.getItem("categorie")
const categorie = JSON.parse(lsCategorie)

const lsWorks = window.localStorage.getItem("works")
const works = JSON.parse(lsWorks)