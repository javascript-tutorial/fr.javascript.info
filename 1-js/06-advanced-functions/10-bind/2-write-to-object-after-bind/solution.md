La réponse : `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

Le contexte de la fonction contrainte est corrigé en dur. Il n'y a aucun moyen de le modifier.

Ainsi, même quand on lance `user.g()`, la fonction originale est appelée avec `this=null`.
