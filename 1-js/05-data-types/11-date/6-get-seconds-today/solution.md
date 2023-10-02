Pour obtenir le nombre de secondes, nous pouvons générer une date à l'aide du jour et de l'heure en cours 00:00:00, puis la soustraire de "maintenant".

La différence est le nombre de millisecondes à partir du début de la journée, qu'il faut diviser par 1000 pour obtenir les secondes:

```js run
function getSecondsToday() {
  let now = new Date();

  // crée un objet en utilisant le jour / mois / année en cours
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // arrondir en secondes
}

alert(getSecondsToday());
```

Une autre solution serait d’obtenir les heures / minutes / secondes et de les convertir en secondes:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert(getSecondsToday());
```
