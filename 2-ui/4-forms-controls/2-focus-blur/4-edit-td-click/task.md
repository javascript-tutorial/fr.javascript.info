importance: 5

---

# Modifier TD au clique

Rendre des cellules de table éditables au clique.

<<<<<<< HEAD
- Au clique -- la cellule doit devenir "éditable" (une zone de texte apparait à l'intérieur), nous pouvons changer le HTML. Il ne doit pas y avoir de redimensionnement, toute la géométrie doit rester la même.
- Les boutons OK et CANCEL apparaissent sous la cellule pour terminer/annuler l'édition.
- Seulement une cellule devrait être éditable à la fois. Pendant qu'un `<td>` est en "mode d'édition", les cliques sur les autres cellules sont ignorés.
- La table devrait avoir beaucoup de cellules. Utilisez la délégation d'évènements.
=======
- On click -- the cell should become "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.
>>>>>>> 8558fa8f5cfb16ef62aa537d323e34d9bef6b4de

La démo:

[iframe src="solution" height=400]
