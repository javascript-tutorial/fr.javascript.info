importance: 5

---

# Glisser les superhéros à l’intérieur du terrain

Cette tache peut vous aider à contrôler votre compréhension de plusieurs aspects du Glissez-déplacez et du DOM

Donnez tous les éléments la classe `draggable` -- déplaçable. Comme une balle dans le chapitre. 
Etapes requises:

- Utilisez la délégation d’évènement pour détecter start: un gestionnaire d’évènement unique  sur `document` pour l’évènement  `mousedown`.
- Si les éléments sont glisses jusqu’a aux limites supérieures ou inferieure de la fenêtre – la page défile en haut/bas pour permettre plus de déplacement.
- IL n’y a pas de défilement horizontal.
- Les éléments déplaçables éléments ne doivent jamais quitter la fenêtre, même si après un déplacement  rapide de la souris.

<<<<<<< HEAD
La démonstration est trop longue pour être contenue ici, voici un lien de cette dernière.
=======
- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges -- the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

[demo src="solution"]