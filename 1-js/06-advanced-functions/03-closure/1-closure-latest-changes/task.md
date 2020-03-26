importance: 5

---

# Une fonction récupère-t-elle les dernières modifications ?

La fonction sayHi utilise un nom de variable externe. Lorsque la fonction s'exécute, quelle valeur va-t-elle utiliser ?

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // qu'affichera-t-elle : "John" ou "Pete" ?
```

De telles situations sont courantes à la fois dans le développement côté navigateur et côté serveur. Une fonction peut être programmée pour s'exécuter plus tard qu'elle n'est créée, par exemple après une action de l'utilisateur ou une demande réseau.

Donc, la question est : reprend-elle les derniers changements ?
