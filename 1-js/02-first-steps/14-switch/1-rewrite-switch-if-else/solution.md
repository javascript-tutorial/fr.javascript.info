Pour correspondre précisément à la fonctionnalité du `switch`, le `if` doit utiliser une comparaison stricte `'==='`.

Cependant, pour des chaînes de caractères données, un simple `'=='` fonctionne également.

```js no-beautify
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}
```

Remarque: la construction `browser == 'Chrome' || navigateur == 'Firefox'…` est divisée en plusieurs lignes pour une meilleure lisibilité.

Mais la construction `switch` est toujours plus propre et plus descriptive.
