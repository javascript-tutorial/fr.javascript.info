**Erreur**!

Essayez le :

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

Le message d'erreur dans la plupart des navigateurs ne permet pas de comprendre ce qui s'est mal passé.

**L'erreur apparaît parce qu'un point-virgule est manquant après `user = {...}`.**

JavaScript n'insert pas automatiquement un point-virgule avant une accolade `(user.go)()`, il lit donc le code comme ceci :

```js no-beautify
let user = { go:... }(user.go)()
```

Ensuite, nous pouvons également voir qu'une telle expression conjointe est syntaxiquement un appel de l'objet `{ go: ... }` en tant que fonction avec l'argument `(user.go)`. Et cela se produit également sur la même ligne avec `let user`, alors que l'objet `user` n'a même pas encore été défini, d'où l'erreur.

Si nous insérons le point-virgule, tout va bien :

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Veuillez noter que les parenthèses autour de `(user.go)` ne font rien ici. Habituellement, elles configurent l'ordre des opérations, mais ici le point `.` fonctionne toujours en premier de toute façon, donc aucun effet. Seul le point-virgule compte.

