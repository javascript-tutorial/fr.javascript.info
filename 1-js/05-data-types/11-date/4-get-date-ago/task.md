importance: 4

---

# Quel jour du mois était il y a plusieurs jours ?

Créez une fonction `getDateAgo(date, days)` pour renvoyer le `days` précédent la date `date`.

Par exemple, si aujourd'hui on est le 20, alors `getDateAgo(new Date(), 1)` doit être le 19 et `getDateAgo(new Date(), 2)` doit être le 18.

elle doit fonctionner de manière fiable sur plus de 365 jours.

```js
let date = new Date(2015, 0, 2);

alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
```

P.S.
La fonction ne doit pas modifier la `date` donnée.
