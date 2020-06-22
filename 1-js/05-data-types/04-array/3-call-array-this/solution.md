L'appel de `arr[2]()` est syntaxiquement le bon vieux `obj[method]()`, dans le rôle de `obj` on a `arr`, et dans le rôle de `method` on a `2`.

Nous avons donc un appel de la fonction `arr[2]` comme méthode d'objet. Naturellement, il reçoit `this` en référençant l'objet` arr` et sort le tableau:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

Le tableau a 3 valeurs: il en avait initialement deux, plus la fonction.
