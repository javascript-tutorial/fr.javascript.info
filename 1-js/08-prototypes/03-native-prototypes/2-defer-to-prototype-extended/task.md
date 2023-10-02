importance: 4

---

# Ajouter la décoration "defer()" aux fonctions

Ajoutez au prototype de toutes les fonctions la méthode `defer(ms)`, qui renvoie un wrapper, retardant l’appel de `ms` millisecondes.

Voici un exemple de la façon dont cela devrait fonctionner :

```js
function f(a, b) {
  alert(a + b);
}

f.defer(1000)(1, 2); // montre 3 après 1 seconde
```

Veuillez noter que les arguments doivent être passés à la fonction d'origine.
