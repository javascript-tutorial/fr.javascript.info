Pour correspondre précisément à la fonctionnalité du `switch`, le `if` doit utiliser une comparaison stricte `'==='`.

Cependant, pour des chaînes de caractères données, un simple `'=='` fonctionne également.

```js no-beautify
if(browser == 'Edge') {
  alert("У вас браузер Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Мы поддерживаем и эти браузерыo' );
} else {
  alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```

Remarque: la construction `browser == 'Chrome' || navigateur == 'Firefox'…` est divisée en plusieurs lignes pour une meilleure lisibilité.

Mais la construction `switch` est toujours plus propre et plus descriptive.
