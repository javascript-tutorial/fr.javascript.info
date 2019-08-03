importance: 5

---

# Info-bulle "Intelligente"

Ecrivez une fonction qui montre une info-bulle  sur un élément seulement si le visiteur déplace la souris *sur celui-ci*, et non pas *passe de travers*.

En d'autres termes, si l'usager déplace la souris sur l'élément et s'arrête-- montrez l'info bulle. Et si le visiteur déplace seulement la souris traverse rapidement l'élément, pas besoin  de le faire, qui a besoin d'un clignotement supplémentaire?

Techniquement, nous pouvons mesurer la vitesse de la souris sur un élément, et si elle est lente alors nous pouvons assumer qu'elle  arrive "sur l'élément" et monter l'info-bulle, si elle est rapide -- alors on l'ignore.

Créer un objet universel `new HoverIntent(options)` pour ce dernier. Avec les `options`:

- `elem` -- l'élément à surveiller.
- `over` -- un appel de fonction si la souris se déplace lentement sur un élément.
- `out` -- un appel de fonction lorsque la souris quitte l'élément (si `over` est appelé).

Un exemple d'usage d'un tel objet pour l'info-bulle:

```js
// un example d'info-bulle
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// L’objet va  suivre la souris et appeler les fonctions over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

La demo:

[iframe src="solution" height=140]

Si vous déplacez la souris rapidement sur la "montre" alors rien ne se passe, et si vous le faites lentement  ou que vous vous arrêtez, alors il y aura une info-bulle.

Notez bien: l'info-bulle ne "clignote" pas lorsque le curseur se déplace entre la montre et les sous éléments.
