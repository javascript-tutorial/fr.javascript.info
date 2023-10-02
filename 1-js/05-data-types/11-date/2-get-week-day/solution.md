La méthode `date.getDay()` renvoie le numéro du jour de la semaine à partir du dimanche.

Faisons un tableau des jours de la semaine afin d’obtenir le nom du jour par son numéro:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert(getWeekDay(date)); // FR
```
