# Interaction : alert, prompt, confirm

Dans cette partie du didacticiel nous allons couvrir le JavaScript "tel quel", sans modifications spécifiques à l’environnement.

Mais nous utilisons toujours un navigateur comme environnement de démonstration. Nous devrions donc connaître au moins quelques fonctions d’interface utilisateur. Dans ce chapitre, nous allons nous familiariser avec les fonctions du navigateur `alert`,  `prompt` et `confirm`.

## alert

Syntax:

```js
alert(message);
```

Cela affiche un message et met en pause l'exécution du script jusqu'à ce que l'utilisateur appuie sur "OK".

Par exemple :

```js run
alert("Hello");
```

La mini-fenêtre avec le message s'appelle une `fenêtre modale`. Le mot "modal" signifie que le visiteur ne peut pas interagir avec le reste de la page, appuyer sur d’autres boutons, jusqu’à ce qu’ils aient pris en charge la fenêtre. Dans ce cas précis - jusqu'à ce qu'ils appuient sur "OK".

## prompt

La fonction `prompt` accepte deux arguments :

```js no-beautify
result = prompt(title, [default]);
```

Elle affiche une fenêtre modale avec un message texte, un champ de saisie pour le visiteur et les boutons `OK/ANNULER`.

`title`
: Le texte à afficher au visiteur.

`default`
: Un deuxième paramètre facultatif, la valeur initiale du champ de saisie.

Le visiteur peut taper quelque chose dans le champ de saisie et appuyer sur `OK`. Ou ils peuvent annuler l'entrée en appuyant sur le bouton `ANNULER` ou en appuyant sur la touche `key:Esc`.

L'appel du `prompt` renvoie le texte du champ de saisie ou `null` si l'entrée a été annulée.

Par exemple :

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // Vous avez 100 ans !
```

````warn header="IE: toujours fournir un `default`"
Le deuxième paramètre est facultatif. Mais si nous ne le fournissons pas, Internet Explorer insère le texte `"undefined"` dans le `prompt`.

Exécutez ce code dans Internet Explorer pour le voir :

```js run
let test = prompt("Test");
```

Donc, pour bien paraître dans IE, il est recommandé de toujours fournir le second argument :

```js run
let test = prompt("Test", ''); // <-- pour IE
```
````

## confirm

La syntaxe :

```js
result = confirm(question);
```

La fonction `confirm` affiche une fenêtre modale avec une `question` et deux boutons: OK et Annuler.

Le résultat est `true` si OK est pressé et `false` dans les autres cas.

Par exemple :

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true si OK est pressé
```

## Résumé

Nous avons couvert 3 fonctions spécifiques au navigateur pour interagir avec le visiteur :

`alert`
: affiche un message.

`prompt`
: affiche un message demandant à l'utilisateur de saisir du texte. Il renvoie le texte ou, si on clique sur `Annuler` ou `key:Esc`, `null`.

`confirm`
: affiche un message et attend que l'utilisateur appuie sur "OK" ou "Annuler". Il renvoie `true` pour OK et `false` pour Annuler/`key:Esc`.

Toutes ces méthodes sont modales: elles interrompent l'exécution du script et n'autorisent pas le visiteur à interagir avec le reste de la page tant que le message n'a pas disparu.

Il existe deux limitations communes à toutes les méthodes ci-dessus :

1. L'emplacement exact de la fenêtre modale est déterminé par le navigateur. C’est généralement au centre.
2. L'aspect exact de la fenêtre dépend également du navigateur. Nous ne pouvons pas le modifier.

C'est le prix de la simplicité. Il y a d'autres manières d'afficher des fenêtres plus belles et une interaction plus riche avec le visiteur, mais si les apparences vous importent peu, ces méthodes fonctionnent très bien.
