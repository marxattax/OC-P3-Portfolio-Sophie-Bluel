/* Creation d'une fonction pour afficher les projets */
function affichageWorks(target) {
    for(i=0; i < target.length ; i++) {
        const figureWorks = document.querySelector("#works")
        const work = document.createElement("figure")
        work.className = "figWork"

        const image = document.createElement("img")
        image.src = target[i].imageUrl
        image.alt = target[i].title

        const title = document.createElement("figcaption")
        title.innerHTML = target[i].title

        figureWorks.appendChild(work)
        work.appendChild(image)
        work.appendChild(title)
    }
}

affichageWorks(works)

/* Bouton affichage sans filtre */
const divFiltres = document.querySelector("#filtres")
const nofiltre = document.createElement("button")
nofiltre.innerText = "Tous"
nofiltre.id ="tous"
nofiltre.classList = "button-filtre button-active"
divFiltres.appendChild(nofiltre)
const btnNofiltre = document.querySelector("#tous")
btnNofiltre.addEventListener("click", function() {
    const activeButton = document.querySelector(".button-active")
    activeButton.classList.remove("button-active")
    nofiltre.classList.add("button-active")
    document.querySelector("#works").innerHTML = ""
    affichageWorks(works)
})

/* Boutons pour filtrer en fonction de la categorie du projet */
for(var i=0; i < categorie.length; i++) {
    const cate = categorie[i]
    const filtre = document.createElement("button")
    filtre.className = "button-filtre"
    filtre.innerText = cate.name
    filtre.id = "cate" + cate.id

    filtre.addEventListener("click", function() {
        const filtrage = works.filter(function(work) {
            return work.category.id == cate.id
        })
        const activeButton = document.querySelector(".button-active")
        activeButton.classList.remove("button-active")
        filtre.classList.add("button-active")
        document.querySelector("#works").innerHTML = ""
        affichageWorks(filtrage)
    })
    divFiltres.appendChild(filtre)
}


