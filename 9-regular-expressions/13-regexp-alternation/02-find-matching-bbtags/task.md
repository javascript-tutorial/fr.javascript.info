# Trouver les paires de bbtag

Un "bb-tag" ressemble à `[tag]...[/tag]`, où `tag` peut être : `b`, `url` ou `quote`.

Par exemple :
```
[b]text[/b]
[url]http://google.com[/url]
```

Les BB-tags peuvent être imbriqués.
Mais un tag ne peut pas être imbriqué dans lui même, par exemple :

```
Normal:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

Ne peut pas arriver:
[b][b]text[/b][/b]
```

Les tags peuvent contenir des sauts de ligne, c'est normal :

```
[quote]
  [b]text[/b]
[/quote]
```

Créez une regexp pour trouver tous les BB-tags avec leur contenu.

Par exemple :

```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
alert(str.match(regexp)); // [url]http://google.com[/url]
```

Si les tags sont imbriqués, alors nous voulons le tag extérieur (si nous voulons nous pouvons continuer la recherche dans le contenu) :

```js
let regexp = /your regexp/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert(str.match(regexp)); // [url][b]http://google.com[/b][/url]
```
