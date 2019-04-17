La réponse: le premier et le troisième vont s'exécuter.

Details:

```js run
// S'éxécute
// le résultat de -1 || 0 = -1, vrai
if (-1 || 0) alert( 'first' );

// Ne s'éxécute pas
// -1 && 0 = 0, faux
if (-1 && 0) alert( 'second' );

// S'éxécute
// L'opérateur && a une précédence plus élevée que ||
// donc -1 && 1 s'exécute en premier, nous donnant la chaîne :
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );
```

