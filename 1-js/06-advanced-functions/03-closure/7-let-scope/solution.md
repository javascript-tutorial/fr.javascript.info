Le résultat est : **error**.

Essayez de l'exécuter :

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

Dans cet exemple, nous pouvons observer la différence particulière entre une variable "non existante" et "non initialisée".

Comme vous l'avez peut-être lu dans l'article [](info:closure), une variable démarre à l'état "non initialisée" à partir du moment où l'exécution entre dans un bloc de code (ou une fonction). Et elle reste non initialisée jusqu'à la déclaration `let` correspondante.

En d'autres termes, une variable existe techniquement, mais ne peut pas être utilisée avant `let`.

Le code ci-dessus le démontre.

```js
function func() {
*!*
  // la variable locale x est connue du moteur depuis le début de la fonction,
  // mais "non initialisée" (inutilisable) jusqu'à let ("zone morte")
  // d'où l'erreur
*/!*

  console.log(x); // ReferenceError: Cannot access 'vx before initialization

  let x = 2;
}
```

Cette zone d'inutilisabilité temporaire d'une variable (du début du bloc de code jusqu'à `let`) est parfois appelée "dead zone" (zone morte).
