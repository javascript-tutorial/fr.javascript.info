# Le Défilement

Les évènements de défilement permettent de réagir sur le défilement de la page ou de l'élément. Il y a assez de bons trucs que nous pouvons faire.

Par exemple:
- Montrer/cacher des contrôles additionnelles ou information selon la ou se trouve l'utilisateur sur le document.
- Charger plus de données lorsque l'utilisateur défile vers le bas jusqu'à la fin de la page.

Voici une petite fonction pour montrer la position actuelle du défilement:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});
```

```online
en action:

Current scroll = <b id="showScroll">Faites défiler la fenêtre</b>
```

L'évènement `scroll` fonctionne aussi bien avec `window` qu'avec les éléments defilables.

## Empêcher le défilement

Comment empêchons-nous quelque chose de défiler? Nous ne pouvons empêcher le défilement en utilisant `event.preventDefault()` dans l'écouteur d'évènement `onscroll`, parce que elle peut se déclencher *après* que le défilement ait eu lieu.

Mais nous pouvons empêcher le défilement en utilisant `event.preventDefault()` sur un évènement qui effectue le défilement.

Par exemple:
- l'évènement `wheel`-- un roulement de la roulette de la souris (une action de "défilement" pave tactile le génère aussi).
- `keydown` event for `key:pageUp` and `key:pageDown`.

Si nous ajoutons un gestionnaire d'évènement a ces évènements et à `event.preventDefault()` , alors le défilement ne pas se déclencher.

Des fois cela peut aider, mais il est plus fiable d'utiliser CSS pour empêcher le défilement de quelque chose, tel que la propriété `overflow`.

Voici quelques taches que vous pouvez résoudre oubien regarder afin de voir une application de l'évènement `onscroll`.