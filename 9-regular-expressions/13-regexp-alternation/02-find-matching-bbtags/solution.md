
Un tag d'ouverture correspond à `pattern:\[(b|url|quote)\]`.

Ensuite pour trouver tout jusqu'au tag de fermeture, utilisons le modèle `pattern:.*?` avec le flag `pattern:s` pour trouver n'importe quel caractère en plus des sauts de ligne, puis ajoutons une référence au tag de fermeture.

Le modèle : `pattern:\[(b|url|quote)\].*?\[/\1\]`.

En action :

```js run
let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Veuillez noter qu'en plus de `pattern:[` et `pattern:]`, nous avons dû échapper un slash pour le tag de fermeture `pattern:[\/\1]` puisque normalement un slash ferme le modèle.
