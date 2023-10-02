Un nombre hexadécimal à deux chiffres correspond à `pattern:[0-9a-f]{2}` (avec le marqueur `pattern:i`).

Nous avons besoin de ce nombre `NN`, et ensuite `:NN` répété 5 fois (pour les autres nombres) ;

L'expression régulière est : `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Montrons maintenant que la correspondance se fait bien sur l'ensemble du texte : commence dès le début de la chaîne testée et termine à la fin. Cela se fait en entourant le motif de `pattern:^...$`.

Finalement :

```js run
let regexp = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert(regexp.test('01:32:54:67:89:AB')); // true

alert(regexp.test('0132546789AB')); // false (pas de double point)

alert(regexp.test('01:32:54:67:89')); // false (5 nombres, au lieu de 6)

alert(regexp.test('01:32:54:67:89:ZZ')) // false (ZZ à la fin)
```
