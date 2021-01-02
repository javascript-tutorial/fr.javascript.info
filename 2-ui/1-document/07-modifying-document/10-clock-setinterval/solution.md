Tout d'abord, créons notre HTML/CSS.

Chaque composante du temps aurait fière allure dans son propre `<span>` :

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Nous aurons également besoin de CSS pour les colorer.

La fonction `update` rafraîchira l'horloge, qui sera appelée par `setInterval` toutes les secondes :

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

Dans la ligne `(*)` nous vérifions à chaque fois la date actuelle. Les appels à `setInterval` ne sont pas fiables : ils peuvent survenir avec des retards.

Les fonctions de gestion d'horloge :

```js
let timerId;

function clockStart() { // exécute l'horloge
  if (!timerId) { // défini un nouvel intervalle uniquement si l'horloge ne fonctionne pas
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Veuillez noter que l'appel à `update()` est non seulement planifié dans `clockStart()`, mais s'exécute immédiatement dans la ligne `(*)`. Sinon, le visiteur devra attendre la première exécution de `setInterval`. Et l'horloge serait vide jusque-là.

Il est également important de définir un nouvel intervalle dans `clockStart()` uniquement lorsque l'horloge ne fonctionne pas. Sinon, cliquer plusieurs fois sur le bouton de démarrage définirait plusieurs intervalles simultanés. Pire encore, nous ne garderions que le `timerID` du dernier intervalle, perdant ainsi les références à tous les autres. Alors nous ne pourrions plus jamais arrêter le chronomètre! Notez que nous devons effacer le `timerID` lorsque l'horloge est arrêtée dans la ligne `(**)`, afin qu'elle puisse être redémarrée en exécutant `clockStart()`.
