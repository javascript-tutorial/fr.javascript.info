importance: 5

---

# Modifier TD au clique

Rendre des cellules de table éditables au clique.

- Au clique -- la cellule doit devenir "éditable" (une zone de texte apparait à l'intérieur), nous pouvons changer le HTML. Il ne doit pas y avoir de redimensionnement, toute la géométrie doit rester la même.
- Les boutons OK et CANCEL apparaissent sous la cellule pour terminer/annuler l'édition.
- Seulement une cellule devrait être éditable à la fois. Pendant qu'un `<td>` est en "mode d'édition", les cliques sur les autres cellules sont ignorés.
- La table devrait avoir beaucoup de cellules. Utilisez la délégation d'évènements.

La démo:

[iframe src="solution" height=400]
