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

- Utiliser la délégation d’événements pour suivre le début du glissement: un seul gestionnaire d’événements sur `document` pour `mousedown`.
- Si des éléments sont déplacés vers les bords supérieur/inférieur de la fenêtre -- la page défilera vers le haut/le bas pour permettre un déplacement ultérieur.
- Il n'y a pas de défilement horizontal (cela simplifie un peu la tâche car l'ajouter est facile).
- Les éléments déplaçables ou leurs parties ne doivent jamais quitter la fenêtre, même après un déplacement rapide de la souris.

[demo src="solution"]
