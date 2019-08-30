Pour obtenir le nombre de millisecondes jusqu'à demain, nous pouvons, à partir de "demain 00:00:00", soustraire la date actuelle.

Tout d'abord, nous générons ce "demain", puis nous le faisons:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // date de demain
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```

solution alternative:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Veuillez noter que de nombreux pays ont l'heure d'été (DST), il peut donc y avoir des jours avec 23 ou 25 heures. Nous voudrons peut-être traiter ces jours séparément.
