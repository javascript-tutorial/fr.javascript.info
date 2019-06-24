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

<<<<<<< HEAD
JavaScript ne suppose pas un point-virgule avant un crochet `(user.go)()`, il lit donc le code comme ceci :
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD
Ensuite, nous pouvons également voir qu'une telle expression conjointe est syntaxiquement un appel de l'objet `{ go: ... }` en tant que fonction avec l'argument `(user.go)`. Et cela se produit également sur la même ligne avec `let user`, de sorte que l'objet `user` n'a même pas encore été défini, d'où l'erreur.
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

Si nous insérons le point-virgule, tout va bien :

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD
Veuillez noter que les crochets autour de `(user.go)` ne font rien ici. Habituellement, ils configurent l'ordre des opérations, mais ici le point `.` fonctionne toujours de toute façon, donc aucun effet. Seul le point-virgule compte.






=======
Please note that brackets around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
