importance: 5

---

# Décorateur debounce

Le résultat du décorateur `debounce(f, ms)` est un wrapper qui suspend les appels à `f` jusqu'à ce qu'il y ait `ms` millisecondes d'inactivité (pas d'appels, "période de cooldown"), puis invoque `f` une fois avec les derniers arguments.

<<<<<<< HEAD
Par exemple, nous avons eu une fonction `f` et l'avons remplacée par `f = debounce(f, 1000)`.
=======
In other words, `debounce` is like a secretary that accepts "phone calls", and waits until there's `ms` milliseconds of being quiet. And only then it transfers the latest call information to "the boss" (calls the actual `f`).

For instance, we had a function `f` and replaced it with `f = debounce(f, 1000)`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Ensuite, si la fonction encapsulée est appelée à 0ms, 200ms et 500ms, et qu'il n'y a aucun appel, alors le `f` actuel ne sera appelé qu'une seule fois, à 1500 ms. Autrement dit: après la période de temps de recharge de 1000 ms à partir du dernier appel.

![](debounce.svg)

... Et il récupérera les arguments du tout dernier appel, les autres appels sont ignorés.

<<<<<<< HEAD
Voici le code pour cela (utilise le décorateur debounce de la [librairie Lodash](https://lodash.com/docs/4.17.15#debounce)):
=======
Here's the code for it (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce)):
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
let f = _.debounce(alert, 1000);

f("a"); 
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500); 
// la fonction debounce attend 1000ms après le dernier appel puis exécute : alert("c")
```

<<<<<<< HEAD

Maintenant, un exemple pratique. Disons que l'utilisateur tape quelque chose et que nous aimerions envoyer une requête au serveur lorsque l'entrée est terminée.
=======
Now a practical example. Let's say, the user types something, and we'd like to send a request to the server when the input is finished.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Il ne sert à rien d'envoyer la requête pour chaque caractère saisi. Au lieu de cela, nous aimerions attendre, puis traiter l'ensemble du résultat.

Dans un navigateur Web, nous pouvons configurer un gestionnaire d'événements - une fonction qui est appelée à chaque modification d'un champ de saisie. Normalement, un gestionnaire d'événements est appelé très souvent, pour chaque touche tapée. Mais si on le `debounce` de 1000ms, il ne sera appelé qu'une seule fois, après 1000ms après la dernière entrée.

```online

Dans cet exemple en live, le gestionnaire place le résultat dans une case ci-dessous, essayez-le :

[iframe border=1 src="debounce" height=200]

Vous voyez ? La deuxième entrée appelle la fonction "debounced", donc son contenu est traité après 1000ms à partir de la dernière entrée.
```

Donc, `debounce` est un excellent moyen de traiter une séquence d'événements: que ce soit une séquence de touches, de mouvements de souris ou autre.

<<<<<<< HEAD

Il attend le temps donné après le dernier appel, puis exécute sa fonction, qui peut traiter le résultat.
=======
It waits the given time after the last call, and then runs its function, that can process the result.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

La tâche est d'implémenter le décorateur `debounce`.

<<<<<<< HEAD
Indice : ce ne sont que quelques lignes si vous y réfléchissez :)
=======
Hint: that's just a few lines if you think about it :)
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
