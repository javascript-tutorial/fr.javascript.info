importance: 5

---

# Afficher une note près de l'élément

Créez une fonction `positionAt(anchor, position, elem)` qui positionne `elem`, en fonction de `position` près de l'élément `anchor`.

La `position` doit être une chaîne de caractères avec l'une des 3 valeurs :
- `"top"` - position `elem` juste au dessus de `anchor`
- `"right"` - position `elem` immédiatement à droite de `anchor`
- `"bottom"` - position `elem` juste en dessous `anchor`

Il est utilisé à l'intérieur de la fonction `showNote(anchor, position, html)`, fournie dans le code source de la tâche, qui crée un élément "note" avec `html` donné et l'affiche à la `position` donnée près de `anchor`.

Voici la démo des notes :

[iframe src="solution" height="350" border="1" link]
