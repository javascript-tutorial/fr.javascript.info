Le constructeur `new Date` utilise le fuseau horaire local. Donc, la seule chose importante à retenir est que les mois commencent à zéro.

Donc février a le numéro 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
