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

<<<<<<< HEAD
function clockStart() { // exécute l'horloge
  timerId = setInterval(update, 1000);
=======
function clockStart() { // run the clock  
  if (!timerId) { // only set a new interval if the clock is not running
    timerId = setInterval(update, 1000);
  }
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

<<<<<<< HEAD
Veuillez noter que l'appel à `update()` est non seulement planifié dans `clockStart()`, mais s'exécute immédiatement dans la ligne `(*)`. Sinon, le visiteur devra attendre la première exécution de `setInterval`. Et l'horloge serait vide jusque-là.
=======
Please note that the call to `update()` is not only scheduled in `clockStart()`, but immediately run in the line `(*)`. Otherwise the visitor would have to wait till the first execution of `setInterval`. And the clock would be empty till then.

Also it is important to set a new interval in `clockStart()` only when the clock is not running. Otherways clicking the start button several times would set multiple concurrent intervals. Even worse - we would only keep the `timerID` of the last interval, losing references to all others. Then we wouldn't be able to stop the clock ever again! Note that we need to clear the `timerID` when the clock is stopped in the line `(**)`, so that it can be started again by running `clockStart()`.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
