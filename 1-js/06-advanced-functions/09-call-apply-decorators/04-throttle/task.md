importance: 5

---

# Décorateur d'accélération

<<<<<<< HEAD
Créez un décorateur "d'accélération" `throttle(f, ms)` - qui retourne un wrapper, en passant l'appel à `f` au maximum une fois par `ms` millisecondes. Les appels qui tombent dans le "temps de charge" sont ignorés.

**La différence avec `debounce` - si un appel ignoré est le dernier pendant le temps de recharge, il s'exécute à la fin du délai.**
=======
Create a "throttling" decorator `throttle(f, ms)` -- that returns a wrapper.

When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

The difference with debounce is that it's completely different decorator:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

Examinons l'application réelle pour mieux comprendre cette exigence et voir d'où elle vient.

**Par exemple, nous voulons suivre les mouvements de la souris.**

<<<<<<< HEAD
Dans le navigateur, nous pouvons configurer une fonction à exécuter à chaque mouvement de la souris et obtenir l’emplacement du pointeur à mesure qu’il se déplace. Pendant une utilisation active de la souris, cette fonction est généralement utilisée très souvent et peut atteindre 100 fois par seconde (toutes les 10 ms).

**Nous aimerions mettre à jour certaines informations sur la page Web lorsque le pointeur se déplace.**
=======
In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
**We'd like to update some information on the web-page when the pointer moves.**
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

... Mais la mise à jour de la fonction `update()` est trop lourde pour tous les micro-mouvements. Il est également inutile de mettre à jour plus d'une fois toutes les 100 ms.

Nous allons donc l'envelopper dans le décorateur : utilisez `throttle(update, 100)` comme fonction à exécuter à chaque déplacement de souris à la place de `update()` d'origine. Le décorateur sera appelé souvent, mais `update()` sera appelé au maximum une fois toutes les 100 ms.

Visuellement, cela ressemblera à ceci:

1. Pour le premier mouvement de souris, la variante décorée passe l'appel à `update`. Cela est important, l'utilisateur voit notre réaction à leur mouvement immédiatement.
2. Puis, alors que la souris continue d'avancer, il ne se passe plus rien jusqu'à `100ms`. La variante décorée ignore les appels.
3. À la fin de `100ms` - une autre `update` se produit avec les dernières coordonnées.
4. Enfin, la souris s’arrête quelque part. La variante décorée attend que `100ms` expire, puis lance `update` avec les dernières coordonnées. Donc, peut-être le plus important, les coordonnées finales de la souris sont traitées.

Un exemple de code:

```js
function f(a) {
  console.log(a);
}

// f1000 passe les appels à f au maximum une fois toutes les 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // montre 1
f1000(2); // (étranglement, 1000ms pas encore écoulée)
f1000(3); // (étranglement, 1000ms pas encore écoulée)

// quand 1000ms expirent...
// ...sort 3, la valeur intermédiaire 2 a été ignorée
```

P.S. Les arguments et le contexte `this` transmis à `f1000` doivent être transmis à `f` d'origine.
