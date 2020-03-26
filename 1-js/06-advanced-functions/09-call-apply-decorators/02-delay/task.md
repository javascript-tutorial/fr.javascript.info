importance: 5

---

# Décorateur de retardement 

Créez un décorateur `delay(f, ms)` qui retarde chaque appel de `f` de `ms` millisecondes.

Par exemple:

```js
function f(x) {
  alert(x);
}

// créer des wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // montre "test" après 1000ms
f1500("test"); // montre "test" après 1500ms
```

En d'autres termes, `delay(f, ms)` renvoie une variante "retardée de `ms`" de `f`.

Dans le code ci-dessus, `f` est une fonction d'un seul argument, mais votre solution doit transmettre tous les arguments et le contexte `this`.