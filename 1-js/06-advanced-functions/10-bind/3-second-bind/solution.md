La réponse : **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

L'objet exotique [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) retourné par `f.bind(...)` se souvient du  contexte (et des arguments s'ils sont fournis) seulement au moment de la création. 

Une fonction ne peut pas être contrainte à nouveau.
