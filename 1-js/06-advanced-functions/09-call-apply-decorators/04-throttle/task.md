importance: 5

---

# Décorateur d'étranglement

Créez un décorateur "d'étranglement" `throttle(f, ms)` - qui retourne un wrapper, en passant l'appel à `f` au maximum une fois par `ms` millisecondes. Les appels qui tombent dans le "temps de recharge" sont ignorés.

**La différence avec `debounce` - si un appel ignoré est le dernier pendant le temps de recharge, il s'exécute à la fin du délai.**

Examinons l'application réelle pour mieux comprendre cette exigence et voir d'où elle vient.

**Par exemple, nous voulons suivre les mouvements de la souris.**

Dans le navigateur, nous pouvons configurer une fonction à exécuter à chaque mouvement de la souris et obtenir l’emplacement du pointeur à mesure qu’il se déplace. Pendant une utilisation active de la souris, cette fonction est généralement utilisée très souvent et peut atteindre 100 fois par seconde (toutes les 10 ms).

<<<<<<< HEAD
**La fonction de suivi devrait mettre à jour certaines informations sur la page Web.**

La mise à jour de la fonction `update()` est trop lourde pour le faire à chaque micro-mouvement. Cela n’a également aucun sens de le faire plus d’une fois toutes les 100 ms.

Nous allons donc l'envelopper dans le décorateur: utilisez `throttle(update, 100)` comme fonction à exécuter à chaque déplacement de souris à la place de `update()` d'origine. Le décorateur sera appelé souvent, mais `update()` sera appelé au maximum une fois toutes les 100 ms.
=======
**We'd like to update some information on the web-page when the pointer moves.**

...But updating function `update()` is too heavy to do it on every micro-movement. There is also no sense in updating more often than once per 100ms.

So we'll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but forward the call to `update()` at maximum once per 100ms.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Visuellement, cela ressemblera à ceci:

<<<<<<< HEAD
1. Pour le premier mouvement de souris, la variante décorée passe l'appel à `update`. Cela est important, l'utilisateur voit notre réaction à leur mouvement immédiatement.
2. Puis, alors que la souris continue d'avancer, il ne se passe plus rien jusqu'à 100ms. La variante décorée ignore les appels.
3. À la fin de `100ms` - une autre `update` se produit avec les dernières coordonnées.
4. Enfin, la souris s’arrête quelque part. La variante décorée attend que `100ms` expire, puis lance `update` avec les dernières coordonnées. Donc, peut-être le plus important, les coordonnées finales de la souris sont traitées.
=======
1. For the first mouse movement the decorated variant immediately passes the call to `update`. That's important, the user sees our reaction to their move immediately.
2. Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3. At the end of `100ms` -- one more `update` happens with the last coordinates.
4. Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, quite important, the final mouse coordinates are processed.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Un exemple de code:

```js
function f(a) {
  console.log(a)
};

// f1000 passe les appels à f au maximum une fois toutes les 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // montre 1
f1000(2); // (étranglement, 1000ms pas encore écoulée)
f1000(3); // (étranglement, 1000ms pas encore écoulée)

// quand 1000ms expirent...
// ...sort 3, la valeur intermédiaire 2 a été ignorée
```

P.S. Les arguments et le contexte `this` transmis à `f1000` doivent être transmis à `f` d'origine.
