L'idée est simple: soustraire un nombre donné de jours à partir de la `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Mais la fonction ne doit pas changer la `date`. C'est une chose importante, car le code externe qui nous donne la date ne s'attend pas à ce qu'il change.

Pour le mettre en oeuvre, clonons la date, comme ceci:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
