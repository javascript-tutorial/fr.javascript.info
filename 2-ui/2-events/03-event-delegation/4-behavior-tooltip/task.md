importance: 5

---

# Comportement info-bulle

Créez du code JS pour le comportement de l'info-bulle.

Lorsqu'une souris survole un élément avec `data-tooltip`, l'info-bulle devrait apparaître dessus, et quand elle est partie, se cacher.

Un exemple de HTML annoté:

```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

Devrait fonctionner comme ceci:

[iframe src="solution" height=200 border=1]

Dans cette tâche, nous supposons que tous les éléments avec `data-tooltip` ne contiennent que du texte. Aucune balise imbriquée (pour le moment).

Détails:

- La distance entre l'élément et l'info-bulle doit être de `5px`.
- L'info-bulle doit être centrée par rapport à l'élément, si possible.
- L'info-bulle ne doit pas traverser les bords de la fenêtre. Normalement, il devrait être au-dessus de l'élément, mais si l'élément est en haut de la page et qu'il n'y a pas d'espace pour l'info-bulle, alors en dessous.
- Le contenu de l'info-bulle est donné dans l'attribut `data-tooltip`. Cela peut être du HTML arbitraire.

Vous aurez besoin de deux événements ici:
- `mouseover` se déclenche lorsqu'un pointeur survole un élément.
- `mouseout` se déclenche lorsqu'un pointeur quitte un élément.

Veuillez utiliser la délégation d'événements: configurez deux gestionnaires sur `document` pour suivre tous les "survolage" et "sorties" des éléments avec `data-tooltip` et gérer les info-bulles à partir de là.

Une fois le comportement implémenté, même les personnes non familiarisées avec JavaScript peuvent ajouter des éléments annotés.

P.S. Une seule info-bulle peut apparaître à la fois.
