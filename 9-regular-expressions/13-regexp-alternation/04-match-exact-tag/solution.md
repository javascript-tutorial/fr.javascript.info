
Le début du modèle est évident: `pattern:<style`.

...Mais nous ne pouvons pas juste écrire `pattern:<style.*?>` puisque `match:<styler>` y correspondrait.

Nous avons besoin soit d'un espace après `match:<style` et après optionellement quelque chose d'autre, ou bien la fin `match:>`.

Dans le langage des regexp : `pattern:<style(>|\s.*?>)`.

En action :

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
