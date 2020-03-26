importance: 5

---

# Décorateur debounce

Le résultat du décorateur `debounce(f, ms)` devrait être un wrapper qui transmet l'appel à `f` au maximum une fois par `ms`, millisecondes.

En d'autres termes, lorsque nous appelons une fonction "debounce", cela garantit que tous les futurs appels à la fonction effectuée moins de `ms` millisecondes après l'appel précédent seront ignorés.

Par exemple:

```js no-beautify
let f = debounce(alert, 1000);

f(1); // exécute immédiatement
f(2); // ignorée

setTimeout( () => f(3), 100); // ignorée (seulement 100 ms passé)
setTimeout( () => f(4), 1100); // exécute
setTimeout( () => f(5), 1500); // ignorée (moins de 1000 ms à partir de la dernière exécution)
```

En pratique, `debounce` est utile pour les fonctions qui récupèrent/mettent à jour quelque chose quand on sait que rien de nouveau ne peut être fait dans un laps de temps aussi court, il est donc préférable de ne pas gaspiller de ressources.
