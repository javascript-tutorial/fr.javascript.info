importance: 5

---

# Liste sélectionnable

Créer une liste où les éléments sont sélectionnables, comme dans les gestionnaires de fichiers.

- Un click sur une liste d'éléments selectionne seulement cet élément (ajout de la classe `.selected`), désélectionne tous les autres.
- Si un click est fait en pressant `key:Ctrl` (`key:Cmd` pour Mac), alors la sélection est basculée sur l'élément, mais les autres éléments ne sont pas modifiés.

La démonstration:

[iframe border="1" src="solution" height=180]

P.S. Pour cet exercice, nous partons du principe que les éléments de la liste sont seulement du texte. Il n'y a pas de bloc imbriqué.

P.P.S. Empêcher la sélection native du texte par le navigateur lors des clics.
