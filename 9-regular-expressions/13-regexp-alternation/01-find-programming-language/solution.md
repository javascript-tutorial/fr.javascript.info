
La première idée peut être de lister les langages avec des `|` entre deux.

Mais cela ne fonctionne pas correctement :

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

Le moteur d'expression régulière regarde les alternances une par une. C'est-à-dire : il regarde d'abord si nous avons `match:Java`, sinon il recherche `match:JavaScript` et ainsi de suite.

Ainsi, `match:JavaScript` ne peut jamais être trouvé, puisque `match:Java` est vérifié en premier.

Pareil pour `match:C` et `match:C++`.

Il y a deux solutions à ce problème :

1. Changer l'ordre pour vérifier le mot le plus long en premier : `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Fusionner les mots commençant de la même manière : `pattern:Java(Script)?|C(\+\+)?|PHP`.

En action :

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
