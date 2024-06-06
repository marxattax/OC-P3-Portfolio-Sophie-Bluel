
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

/* Appel APIs */
const cateFetch = fetch(urlCate).then(resp => resp.json())
const worksFetch = fetch(urlWorks).then(resp => resp.json())

Promise.all([cateFetch, worksFetch])
.then(([dataCate, dataWorks]) => {

/* Boutons pour filtrer en fonction de la categorie du projet */
    for(var i=0; i < dataCate.length; i++) {
        const cate = dataCate[i]
        const filtre = document.createElement("button")
        const id = cate.id
        filtre.className = "button-filtre"
        filtre.innerText = cate.name
        filtre.id = "cate" + id

        filtre.addEventListener("click", function() {
            const filtrage = dataWorks.filter(function(work) {
                return work.category.id == id
            })
            const activeButton = document.querySelector(".button-active")
            activeButton.classList.remove("button-active")
            filtre.classList.add("button-active")
            document.querySelector("#works").innerHTML = ""
            affichageWorks(filtrage)
        })
        divFiltres.appendChild(filtre)
    }
    const cate = Array.from(dataCate)
    window.localStorage.setItem("categorie", JSON.stringify(cate))


/* Affichage des projets et stockage dans le localstorage */
    affichageWorks(dataWorks)
    const works = Array.from(dataWorks)
    window.localStorage.setItem("works", JSON.stringify(works))
})

function affichageWorks(target) {
    for(i=0; i < target.length ; i++) {
        const figureWorks = document.querySelector("#works")
        const work = document.createElement("figure")
        work.className = "figWork"
        work.classList.add("projet" + target[i].id)


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

// Function to generate random number
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}