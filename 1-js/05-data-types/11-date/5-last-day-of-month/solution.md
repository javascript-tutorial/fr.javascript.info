Créons une date en utilisant le mois suivant, mais passons zéro comme jour:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Normalement, les dates commencent à 1, mais techniquement, nous pouvons passer n'importe quel nombre, la date s'ajustera automatiquement. Ainsi, lorsque nous passons 0, cela signifie "un jour avant le 1er jour du mois", autrement dit: "le dernier jour du mois précédent".
