Pour que les secondes parenthèses fonctionnent, les premières doivent renvoyer une fonction.

Comme ceci :

```js run
function sum(a) {

  return function(b) {
    return a + b; // prend "a" de l'environnement lexical externe
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

