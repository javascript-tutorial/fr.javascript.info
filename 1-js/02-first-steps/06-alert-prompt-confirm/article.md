# Interaction: alert, prompt, confirm

Comme nous allons utiliser le navigateur comme environnement de démonstration, voyons quelques fonctions pour interagir avec l'utilisateur : `alert`, `prompt` et `confirm`.

## alert

Celui-ci, nous l'avons déjà vu. Il affiche un message et attend que l'utilisateur appuie sur "OK".

Par exemple :

```js run
alert("Hello");
```

La mini-fenêtre avec le message s'appelle une *fenêtre modale*. Le mot "modal" signifie que le visiteur ne peut pas interagir avec le reste de la page, appuyer sur d'autres boutons, etc., tant qu'il n'a pas traité la fenêtre. Dans ce cas -- jusqu'à ce qu'ils appuient sur "OK".

## prompt

La fonction `prompt` accepte deux arguments :

```js no-beautify
result = prompt(title, [default]);
```

Elle affiche une fenêtre modale avec un message texte, un champ de saisie pour le visiteur et les boutons OK/Annuler.

`title`
: Le texte à afficher au visiteur.

`default`
: Un deuxième paramètre facultatif, la valeur initiale du champ d'entrée.

<<<<<<< HEAD
```smart header="Les crochets dans la syntaxe `[...]`"
Les crochets autour de `default` dans la syntaxe ci-dessus indiquent que le paramètre est facultatif, non obligatoire.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter is optional, not required.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
```

Le visiteur peut taper quelque chose dans le champ de saisie d'invite et appuyer sur OK. Ensuite, nous obtenons ce texte dans le `result`. Ou ils peuvent annuler l'entrée en appuyant sur Annuler ou en appuyant sur la touche `key:Esc`, puis nous obtenons `null` comme `result`.

L'appel à `prompt` renvoie le texte du champ de saisie ou `null` si l'entrée a été annulée.

Par exemple :

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="Dans IE : fournissez toujours un `default`"
Le second paramètre est facultatif, mais si nous ne le fournissons pas, Internet Explorer insérera le texte `"undefined"` dans l'invite.

Exécutez ce code dans Internet Explorer pour voir :

```js run
let test = prompt("Test");
```

Donc, pour que les invites semblent bonnes dans IE, nous vous recommandons de toujours fournir le deuxième argument :

```js run
let test = prompt("Test", ''); // <-- pour IE
```
````

## confirm

La syntaxe :

```js
result = confirm(question);
```

La fonction `confirm` affiche une fenêtre modale avec une `question` et deux boutons : OK et Annuler.

Le résultat est `true` si vous appuyez sur OK et `false` dans le cas contraire.

Par exemple :

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true si OK est pressé
```

## Résumé

Nous avons couvert 3 fonctions spécifiques au navigateur pour interagir avec les visiteurs :

`alert`
: affiche un message.

`prompt`
: affiche un message demandant à l'utilisateur de saisir du texte. Il renvoie le texte ou `null`, si vous cliquez sur le bouton Annuler ou sur `key:Esc`.

`confirm`
: affiche un message et attend que l'utilisateur appuie sur "OK" ou "Annuler". Il retourne `true` pour OK et `false` pour Annuler/`key:Esc`.

Toutes ces méthodes sont modales: elles suspendent l'exécution du script et ne permettent pas au visiteur d'interagir avec le reste de la page tant que la fenêtre n'a pas été fermée.

Il existe deux limitations partagées par toutes les méthodes ci-dessus :

1. L'emplacement exact de la fenêtre modale est déterminé par le navigateur. Habituellement, c'est au centre.
2. L'aspect exact de la fenêtre dépend également du navigateur. Nous ne pouvons pas le modifier.

C'est le prix de la simplicité. Il existe d'autres moyens d'afficher des fenêtres plus jolies et une interaction plus riche avec le visiteur, mais si l'aspect graphique n'ont pas beaucoup d'importance, ces méthodes fonctionnent très bien.
