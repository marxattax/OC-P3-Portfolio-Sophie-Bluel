/* affiche le bouton modifier pour ouvrir la modale si l'utilisateur est connecte */
if(userId) {
    const modifier = document.querySelector(".modifier")
    const boutonModif = document.createElement("a")
    boutonModif.href = "#"
    boutonModif.id = "modale"
    boutonModif.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> modifier"
    modifier.appendChild(boutonModif)
}

let boiteModale

/* Tableau des objets de la modale qui réagissent à Tab */
const focusables = "button, a, input, img, i"
let focusable = []

/* Création d'une boite modale et son systeme de fermeture */

const lienModale = document.querySelector("#modale")
lienModale.addEventListener("click", (e) => {
    e.preventDefault()
    boiteModale = document.querySelector("#boite-modale")
    focusable = Array.from(boiteModale.querySelectorAll(focusables))
    boiteModale.style.display = null
    boiteModale.addEventListener("click", close)
    boiteModale.querySelector('.js-stop-close').addEventListener("click", stopPropagation)
})

/* Fonction pour fermer la modale quand on clique */

const close = function (e) {
    e.preventDefault()
    boiteModale.style.display = "none"
}

/* Fonction qui empêche la propagation de la fonction close au contenu de la boite */

const stopPropagation = function (e) {
    e.stopPropagation()
}

/* Fonction qui permet de passer d'un focusable à l'autre */

const focusModal = function(e) {
    e.preventDefault()
    let index = focusable.findIndex(f => f === boiteModale.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    }
    else {
        index++
    }
    if (index >= focusable.length) {
        index = 0
    }
    if (index < 0) {
        index = focusable.length - 1
    }
    focusable[index].focus()
}

/* Ecoute du clavier */
/** Ferme la modale si on appuie sur echap **/

window.addEventListener('keydown', function(e) {
    if(e.key === "Escape") {
        close(e)
    }

/** si la modale est ouverte, passe les focusables en revue en appuyant sur tab **/
    if(e.key === "Tab" && boiteModale !== null) {
        focusModal(e)
    }
})