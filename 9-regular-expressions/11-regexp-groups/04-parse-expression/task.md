# Parsez une expression

Une expression arithmétique consiste en 2 nombres et un opérateur entre les deux, par exemple :

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

L'opérateur l'un des : `"+"`, `"-"`, `"*"` ou `"/"`.

Il peut y avoir des espaces supplémentaires au début, à la fin ou entre chaque partie.

Créez une fonction `parse(expr)` qui prend une expression et retourne un tableau de trois éléments :

1. Le premier nombre.
2. L'opérateur.
3. Le second nombre.

Par exemple :

```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```
