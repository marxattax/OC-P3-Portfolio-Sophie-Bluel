if(userId) {

/*** Recuperation des noms de categories pour les inclure dans le selecteur ***/
const choixCategorie = document.querySelector(".choix-categorie")
categorie.forEach((item) => {
	const cateName = document.createElement("option")
	cateName.value = item.id
	cateName.innerText = item.name
	cateName.className = "categorie"
	choixCategorie.appendChild(cateName)
})
	
/**** Affichage de la galerie photo *****/

/* Bouton retour galerie */
const boutonRetour = document.querySelector("#bouton-retour")
let slider1 = document.querySelector(".slider1")
let slider2 = document.querySelector(".slider2")
boutonRetour.addEventListener("click", () => {
	slider1.style = "opacity:1;z-index:1;transition-duration:.5s"
	slider2.style = "opacity:0;z-index:0;transform:translateX(100%);transition-duration:.5s"
})

/* Bouton ajout photo */
const boutonAjout = document.querySelector("#bouton-ajout")
boutonAjout.addEventListener("click", () => {
	slider1.style = "opacity:0;z-index:0;transition-duration:.5s"
	slider2.style = "opacity:1;z-index:1;transform:translateX(0%);transition-duration:.5s"
})

/* Création de la galerie des projets */
const miniature = document.querySelector(".galerie-photos")
works.forEach((item) => {
	const projet = document.createElement("div")
	projet.className = "bg-image"
	projet.style.backgroundImage = "url('" + item.imageUrl + "')"
	projet.id = item.id

	/* Rajoute un bouton pour supprimer le projet */
	const trash = document.createElement("i")
	trash.className = "fa-solid fa-trash-can trash"
	miniature.appendChild(projet)
	projet.appendChild(trash)

	/* Requete pour supprimer le projet de l'Api */
	const chargeUtile = projet.id
	trash.addEventListener ("click", async () => {
		if(window.confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
			fetch(urlWorks + '/' + projet.id, {
   	 			method: "DELETE",
				headers: { "Authorization" : "Bearer " + token},
    			body: chargeUtile
    		})
			location.reload()
		}
	})
})

/*** Script pour ajouter un nouveau projet ***/

/* Selection de l'input de choix d'image et remise à zero du div */

const input = document.querySelector("input#file-upload")
const preview = document.querySelector(".ajout-photo")
input.addEventListener("change", removeSelect)
function removeSelect() {
	while(preview.firstChild) {
		preview.removeChild(preview.firstChild)
	}

	/* Tableau des fichiers autorises */

	const typesImage = 
		["image/png",
		"image/jpg",
		"image/jpeg"]

	/* Condition verifie qu'un seul fichier est selectionne, puis que l'image est au bon format (type, size) */
	const selectedFile = input.files
	if (selectedFile.length = 1) {
		for (const image of selectedFile) {
			if (typesImage.includes(image.type) && image.size <= "4000000") {

				/* L'input submit n'est plus disabled si le formulaire est bien rempli */
				const formFull = document.querySelector("#formAjout")
				const inputTitre = document.querySelector('[name=titre]')
				const inputObjets = document.querySelector('[name=categorie]')
				const btnValider = document.querySelector("#btn-valider")
				formFull.oninput = function() {
					if (inputTitre.validity.valueMissing == false && inputObjets.validity.valueMissing == false) {
						btnValider.removeAttribute("disabled")
					}
				}

				/* Alors on affiche la preview de l'image */
				const previewImage = document.createElement("img")
				previewImage.src = URL.createObjectURL(image)
				previewImage.style = "height:169px;"
				preview.appendChild(previewImage)

				/* Puis on crée un FormFata pour le formulaire d'ajout */
				const formAjout = document.getElementById("formAjout")
				formAjout.onsubmit = (e) => {
					e.preventDefault()
					const formData = new FormData(formAjout)
					formData.append('image', image, image.name)
					formData.append('title', e.target.querySelector('[name=titre]').value)
					formData.append('category', e.target.querySelector('[name=categorie]').value)

					/* et on envoie la requete a l'API */
					fetch("http://localhost:5678/api/works", {
            		method: "POST",
	    	        headers: { "Authorization" : "Bearer " + token },
    	    	    body: formData
        	    	})
					setTimeout(() => {location.reload()}, 500)
				}

			}

			/* Sinon on affiche que le type d'image n'est pas valide */
			else {
				const erreur = document.createElement("p")
				erreur.innerText = "Le fichier sélectionné ne correspond pas aux formats .jpg, .jpeg ou .png, ou fait plus de 4mo"
				preview.appendChild(erreur)
				const reSelect = document.createElement("div")
				reSelect.innerHTML = "<label for='file-upload' id='label-upload'>+ Ajouter photo</label>"
				preview.appendChild(reSelect)
				preview.appendChild(input)
			}
		}
	}

	/* Si l'utilisateur a ferme la fenetre de selection, on raffiche le bouton d'ajout */
	else {
		const erreur = document.createElement("p")
		erreur.innerText = "Veuillez sélectionner une seule image"
		preview.appendChild(erreur)
		const reSelect = document.createElement("div")
			reSelect.innerHTML = "<label for='file-upload' id='label-upload'>+ Ajouter photo</label>"
			preview.appendChild(reSelect)
			preview.appendChild(input)
	}

}

/* Interdiction d'une image de plus de 4mo */
function returnFileSize(number) {
	if (number < 1024) {
    	return number + 'bytes';
  	}
	else if (number >= 1024 && number < 1048576) {
    	return (number / 1024).toFixed(1) + 'KB'
  	}
	else if (number >= 1048576) {
    	return (number / 1048576).toFixed(1) + 'MB'
  	}
}

}