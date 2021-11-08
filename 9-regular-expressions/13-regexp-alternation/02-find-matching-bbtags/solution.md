
<<<<<<< HEAD
Un tag d'ouverture correspond à `pattern:\[(b|url|quote)\]`.
=======
Opening tag is `pattern:\[(b|url|quote)]`.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6

Ensuite pour trouver tout jusqu'au tag de fermeture, utilisons le modèle `pattern:.*?` avec le flag `pattern:s` pour trouver n'importe quel caractère en plus des sauts de ligne, puis ajoutons une référence au tag de fermeture.

<<<<<<< HEAD
Le modèle : `pattern:\[(b|url|quote)\].*?\[/\1\]`.
=======
The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6

En action :

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

<<<<<<< HEAD
Veuillez noter qu'en plus de `pattern:[` et `pattern:]`, nous avons dû échapper un slash pour le tag de fermeture `pattern:[\/\1]` puisque normalement un slash ferme le modèle.
=======
Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6
