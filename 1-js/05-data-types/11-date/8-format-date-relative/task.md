importance: 4

---

# Formater la date relative

Créez une fonction `formatDate(date)` qui devrait formater la `date` comme ceci:

- Si depuis la `date` il s'est passé moins de 1 seconde, alors `"right now"`.
- Sinon, si il s'est passé moins d'une minute, alors `"n sec.
ago"`.
- Sinon, si c'est moins d'une heure, alors `"m min.
ago"`.
- Sinon, la date complète au format `"DD.MM.YY HH:mm"`.
C'est à dire: `"day.month.year hours:minutes"`, le tout au format 2 chiffres, par exemple.
`31.12.16 10:00`.

Par exemple:

```js
alert(formatDate(new Date(new Date - 1))); // "right now"

alert(formatDate(new Date(new Date - 30 * 1000))); // "30 sec.
ago"

alert(formatDate(new Date(new Date - 5 * 60 * 1000))); // "5 min.
ago"

// date d'hier comme ceci 31.12.16 20:00
alert(formatDate(new Date(new Date - 86400 * 1000)));
```
