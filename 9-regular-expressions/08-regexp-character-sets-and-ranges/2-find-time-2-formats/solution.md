Réponse : `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

A noter que `pattern:'-'` à un sens particulier entre crochet, mais seulement entre deux autres caractères, et pas lorsqu'il débute ou termine l'ensemble, nous n'avons donc pas besoin de l'échapper ici.
