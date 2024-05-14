const cateFetch = fetch(urlCate).then(resp => resp.json())
const worksFetch = fetch(urlWorks).then(resp => resp.json())
Promise.all([cateFetch, worksFetch])
.then(([dataCate, dataWorks]) => {

/* Creation d'une fonction pour afficher les projets */
function affichageWorks(works) {
    for(i=0; i < works.length ; i++) {
        const figureWorks = document.querySelector("#works")
        const worksElement = document.createElement("figure")

        const imageElement = document.createElement("img")
        imageElement.src = works[i].imageUrl
        imageElement.alt = works[i].title

        const titleElement = document.createElement("figcaption")
        titleElement.innerHTML = works[i].title

        figureWorks.appendChild(worksElement)
        worksElement.appendChild(imageElement)
        worksElement.appendChild(titleElement)
    }
}

affichageWorks(dataWorks)

/* Construction d'un bouton sans filtre */
const divFiltres = document.querySelector("#filtres")
const nofiltre = document.createElement("button")
nofiltre.id = "tous"
nofiltre.innerText = "Tous"
divFiltres.appendChild(nofiltre)

/* Ajout du clic sur le bouton "tous" */
const btnNofiltre = document.querySelector("#tous")
btnNofiltre.addEventListener("click", function() {
    document.querySelector("#works").innerHTML = ""
    affichageWorks(dataWorks)
})

/* Construction de boutons pour filtrer en fonction de la categorie du projet */
for(var i=0; i < dataCate.length; i++) {
    const cate = dataCate
    const divFiltres = document.querySelector("#filtres")
    const filtreElement = document.createElement("button")
    filtreElement.innerText = cate[i].name
    filtreElement.id = "cate" + cate[i].id
    
    divFiltres.appendChild(filtreElement)
}
        
/* Filtre des projets en fonction de la categorie, puis affichage */
for(var i=0; i < dataCate.length; i++) {
    const idCate = dataCate[i].id
    const boutonFiltre = document.querySelectorAll("#cate" + idCate)
    boutonFiltre.forEach(filtre => {
        filtre.addEventListener("click", function() {
            const filtrage = dataWorks.filter(function(categorie) {
                return categorie.category.id == idCate
            })
            document.querySelector("#works").innerHTML = ""
            affichageWorks(filtrage)
        })
    })
}
        
})

