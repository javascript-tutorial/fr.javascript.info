# Interaction : alert, prompt, confirm

Comme nous allons utiliser le navigateur comme environnement de démonstration, voyons quelques fonctions pour interagir avec l'utilisateur : `alert`, `prompt` et `confirm`.

## La fonction alert

Celle-ci, nous l'avons déjà vu.
Elle affiche un message et attend que l'utilisateur appuie sur "OK".

Par exemple :

```js run
alert("Hello");
```

La mini-fenêtre avec le message s'appelle une *fenêtre modale*.
Le mot "modal" signifie que le visiteur ne peut pas interagir avec le reste de la page, tant qu'il n'a pas traité la fenêtre.
Dans ce cas -- jusqu'à ce qu'il appuie sur "OK".

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

```smart header="Les crochets dans la syntaxe `[...]`"
Les crochets autour de `default` dans la syntaxe ci-dessus indiquent que le paramètre est facultatif, non requis.
```

Le visiteur peut taper quelque chose dans le champ de saisie et appuyer sur OK.
Ensuite, nous obtenons ce que l'utilisateur a entré dans la variable `result`.
Ou il peut annuler la saisie en appuyant sur Annuler ou en appuyant sur la touche `key:Esc`, puis nous obtenons `null` comme valeur de la variable `result`.

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

Donc, pour que les modales semblent bonnes dans IE, nous vous recommandons de toujours fournir le deuxième argument :

```js run
let test = prompt("Test", ''); // <-- pour IE
```
````

## La fonction confirm

La syntaxe :

```js
result = confirm(question);
```

La fonction `confirm` affiche une fenêtre modale avec une `question` et deux boutons : OK et Annuler.

Le résultat est `true` si le visiteur appuie sur OK et `false` si le visiteur appuie sur Annuler.

Par exemple :

```js run
let isBoss = confirm("Are you the boss?");

alert(isBoss); // True si OK est pressé
```

## Résumé

Nous avons vu 3 fonctions spécifiques aux interactions avec les visiteurs dans le navigateur :

`alert`
: Affiche un message.

`prompt`
: Affiche un message demandant à l'utilisateur de saisir du texte.
Il renvoie le texte ou `null`, si vous cliquez sur le bouton Annuler ou sur `key:Esc`.

`confirm`
: Affiche un message et attend que l'utilisateur appuie sur "OK" ou "Annuler".
Il retourne `true` pour OK et `false` pour Annuler/`key:Esc`.

Toutes ces méthodes sont modales : elles suspendent l'exécution du script et ne permettent pas au visiteur d'interagir avec le reste de la page tant que la fenêtre n'a pas été fermée.

Il existe deux limitations partagées par toutes les méthodes ci-dessus :

1.
L'emplacement exact de la fenêtre modale est déterminé par le navigateur.
Habituellement, au centre.
2.
L'aspect exact de la fenêtre dépend également du navigateur.
Nous ne pouvons pas le modifier.

C'est le prix de la simplicité.
Il existe d'autres moyens d'afficher des fenêtres plus jolies et une interaction plus riche avec le visiteur, mais si l'aspect graphique n'a pas beaucoup d'importance, ces méthodes feront très bien l'affaire.