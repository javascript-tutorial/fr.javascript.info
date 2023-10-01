
Cela fonctionnera sûrement très bien.

Les deux fonctions imbriquées sont créées dans le même environnement Lexical externe. Elles partagent donc l'accès à la même variable `count` :

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
 
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
