if (userId) {

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
	fetch(urlWorks)
		.then(resp => resp.json())
		.then(dataworks => {
			affichageGaleries(dataworks)
		})

		function affichageGalerie(target) {
			const galerie = document.querySelector(".galerie-photos")
				const miniature = document.createElement("div")
				miniature.className = "bg-image"
				miniature.style.backgroundImage = "url('" + target.imageUrl + "')"
				const id = target.id
				miniature.id = id
				miniature.classList.add("projet" + id)

				/* Rajoute un bouton pour supprimer le projet */
				const trash = document.createElement("i")
				trash.className = "fa-solid fa-trash-can trash"
				galerie.appendChild(miniature)
				miniature.appendChild(trash)

				/* Requete pour supprimer le projet de l'Api */
				trash.addEventListener("click", async () => {
					await fetch(urlWorks + '/' + id, {
						method: "DELETE",
						headers: { "Authorization": "Bearer " + token }
					})
						.then(resp => {
							if (resp.status == "204") {
								return document.querySelectorAll(".projet" + id).forEach(el => el.remove())
							}
						})
				})
			
		}

		function affichageGaleries(target) {
			if(target.length > 0) {
				target.forEach((target) => {
					affichageGalerie(target)
				})
			}
			else {
				affichageGalerie(target)
			}
		}

/*** Script pour ajouter un nouveau projet ***/

	/* Selection de l'input de choix d'image et remise à zero du div */

	const input = document.querySelector("input#file-upload")
	const preview = document.querySelector(".ajout-photo")
	input.addEventListener("change", removeSelect)
	function removeSelect() {
		while (preview.firstChild) {
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

					/* Alors on affiche la preview de l'image */
					const previewImage = document.createElement("img")
					previewImage.src = URL.createObjectURL(image)
					previewImage.style = "height:169px;"
					preview.appendChild(previewImage)

					/* L'input submit n'est plus disabled si le formulaire est bien rempli */
					const formFull = document.querySelector("#formAjout")
					const inputTitre = document.querySelector('[name=titre]')
					const inputObjets = document.querySelector('[name=categorie]')
					const btnValider = document.querySelector("#btn-valider")
					formFull.oninput = function () {
						if (inputTitre.validity.valueMissing == false && inputObjets.validity.valueMissing == false) {
							btnValider.removeAttribute("disabled")
						}
					}

					/* Puis on crée un FormFata pour le formulaire d'ajout */
					const formAjout = document.getElementById("formAjout")
					formAjout.onsubmit = async (e) => {
						e.preventDefault()
						const formData = new FormData(formAjout)
						formData.append('image', image, image.name)
						formData.append('title', e.target.querySelector('[name=titre]').value)
						formData.append('category', e.target.querySelector('[name=categorie]').value)

						/* et on envoie la requete a l'API */
						await fetch(urlWorks, {
							method: "POST",
							headers: { "Authorization": "Bearer " + token },
							body: formData
						})
							.then(resp => {
								if (resp.status == "201") {
									while (formAjout.firstChild) {
										formAjout.removeChild(formAjout.firstChild)
									}
									const succes = document.createElement("p")
									succes.innerText = "Votre projet a bien été ajouté !"
									succes.style = "margin-top:50px;"
									const retour = document.createElement("a")
									retour.style = "color:black;"
									retour.href = ""
									retour.innerText = "Revenir à l'accueil"
									retour.addEventListener("click", () => {
										location.reload()
									})
									retour.style.marginTop = "30px"
									formAjout.appendChild(succes)
									formAjout.appendChild(retour)
									resp.json()
									.then(data => {
										affichageWorks(data)
										affichageGaleries(data)
									})
									
								}
								else {
									const erreur = document.createElement("p")
									erreur.innerText = "Erreur. Veuillez remplir correctement le formulaire."
									formAjout.appendChild(erreur)
								}
					
							})
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
}