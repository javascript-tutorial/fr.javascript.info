importance: 5

---

# Positionnez la note à l'intérieur (absolute)

Étendre l'exercice précédent <info:task/position-at-absolute> : enseigner la fonction `positionAt(anchor, position, elem)` pour inserer `elem` dans le `anchor`.

Nouvelles valeurs pour `position` :

- `top-out`, `right-out`, `bottom-out` -- fonctionnent de la même manière qu'avant, ils insèrent le `elem` au-dessus/à droite/sous le `anchor`.
- `top-in`, `right-in`, `bottom-in` -- insèrent `elem` à l'intérieur de `anchor` : collez-le sur le bord supérieur/droit/inférieur.

Par exemple :

```js
// affiche la note au dessus de blockquote
positionAt(blockquote, "top-out", note);

// affiche la note à l'intérieur de blockquote, en haut
positionAt(blockquote, "top-in", note);
```

Le resultat :

[iframe src="solution" height="310" border="1" link]

En tant que code source, prenez la solution de l'exercice <info:task/position-at-absolute>.
