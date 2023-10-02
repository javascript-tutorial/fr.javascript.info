# Trouver la balise entière

Écrivez une regexp pour trouver la balise `<style...>`. Il devrait trouver la balise en entier: il pourrait ne pas avoir d'attributs `<style>` ou en avoir plusieurs `<style type="..." id="...">`.

...Mais la regexp ne devrait pas trouver `<styler>`!

Par exemple:

```js
let regexp = /your regexp/g;

alert('<style> <styler> <style test="...">'.match(regexp)); // <style>, <style test="...">
```
