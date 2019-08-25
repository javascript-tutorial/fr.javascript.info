importance: 5

---

# Info-bulle "Intelligente"

Ecrivez une fonction qui montre une info-bulle  sur un élément seulement si le visiteur déplace la souris *sur celui-ci*, et non pas *en le traversant*.

En d'autres termes, si l'usager déplace la souris sur l'élément et s'arrête dessus -- afficher l'info bulle. Et si le visiteur déplace seulement la souris en traversant rapidement l'élément, pas besoin de le faire, qui a besoin d'un clignotement supplémentaire ?

Techniquement, nous pouvons mesurer la vitesse de la souris sur un élément, et si elle est lente alors nous pouvons assumer qu'elle  arrive "sur l'élément" et monter l'info-bulle, si elle est rapide -- alors on l'ignore.

Créer un objet universel `new HoverIntent(options)` pour cela. 

Ses `options` :

- `elem` -- l'élément à surveiller.
- `over` -- une fonction à appeler si la souris arrive sur l’élément : c’est-à-dire qu’elle se déplace lentement ou s’arrête dessus.
- `out` -- une fonction à appeler quand la souris quitte l'élément (si `over` était appelé).

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
