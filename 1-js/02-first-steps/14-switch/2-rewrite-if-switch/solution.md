Les deux premiers contrôles se transforment en deux `case`. Le troisième contrôle est divisé en deux `case` :

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Remarque: le `break` en bas n'est pas requis. Mais nous le mettons pour rendre le code à l'épreuve du temps.

Dans le futur, il est possible que nous voulions ajouter un `case` supplémentaire, par exemple le `case 4`. Et si nous oublions d’ajouter un `break` avant, à la fin du `case 3`, il y aura une erreur. C’est donc une sorte d’assurance.
