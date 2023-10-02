importance: 5

---

# Quelles variables sont disponibles ?

La fonction `makeWorker` ci-dessous crée une autre fonction et la renvoie.
Cette nouvelle fonction peut être appelée ailleurs.

Aura-t-elle accès aux variables externes depuis son lieu de création, ou depuis le lieu d'invocation, ou les deux ?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// créons une fonction
let work = makeWorker();

// appelons-la
work(); // que va-t-elle afficher ?
```

Quelle valeur va-t-elle afficher ? "Pete" ou "John" ?
