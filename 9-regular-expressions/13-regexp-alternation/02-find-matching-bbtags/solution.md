
Un tag d'ouverture est `pattern:\[(b|url|quote)\]`.

Ensuite pour trouver tout jusqu'au tag de fermeture, utilisons le modèle `pattern:.*?` avec le flag `pattern:s` pour trouver n'importe quel caractère en plus des sauts de ligne, puis ajoutons une référence au tag de fermeture.

Le modèle complet : `pattern:\[(b|url|quote)\].*?\[/\1]`.

En action :

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert(str.match(regexp)); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Veuillez noter qu'en plus d'échapper `pattern:[`, nous avons dû échapper une barre oblique pour la balise de fermeture `pattern:[\/\1]`, car normalement la barre oblique ferme le modèle.
