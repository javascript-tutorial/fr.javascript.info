
Solution:

```js run
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```

Notez que le point est un caractère spécial, nous devons donc l'échapper et l'insérer comme ceci `\.`.
