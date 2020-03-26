importance: 5

---

# Ajouter la méthode "f.defer(ms)" aux fonctions

Ajoutez au prototype de toutes les fonctions la méthode `defer(ms)`, qui exécute la fonction après `ms` millisecondes.

Une fois que vous le faites, ce code devrait fonctionner:

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // montre "Hello!" après 1 seconde
```
