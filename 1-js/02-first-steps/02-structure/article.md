# Structure du code

La première chose à apprendre est de construire des blocs de code.

## Instructions

Les instructions sont des constructions syntaxiques qui effectuent des actions.

Nous avons déjà vu une instruction `alert("Hello World!")` qui affiche le message.

Nous pouvons avoir autant d'instructions dans le code que nous le souhaitons. Une autre instruction peut être séparée par un point-virgule.

Par exemple, ici nous divisons le message en deux :

```js run no-beautify
alert("Hello"); alert("World");
```

Chaque instruction est généralement écrite sur une ligne distincte - le code devient donc plus lisible :

```js run no-beautify
alert("Hello");
alert("World");
```

## Les points-virgules [#semicolon]

Un point-virgule peut être omis dans la plupart des cas lorsqu'une rupture de ligne existe.

Cela fonctionnerait aussi :

```js run no-beautify
alert("Hello")
alert("World")
```

Ici, JavaScript interprète le saut de ligne comme un point-virgule "implicite". Cela s'appelle également [une insertion automatique de point-virgule](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**Dans la plupart des cas, une nouvelle ligne implique un point-virgule. Mais "dans la plupart des cas" ne signifie pas "toujours"!**

Il y a des cas où une nouvelle ligne ne signifie pas un point-virgule, par exemple :

```js run no-beautify
alert(3 +
1
+ 2);
```

Le code génère `6`, car JavaScript n'insère pas de point-virgule ici. Il est intuitivement évident que si la ligne se termine par un plus `"+"` (un opérateur ou une opérande), alors c'est une "expression incomplète", donc un point-virgule serait incorrect. Et dans ce cas, cela fonctionne comme prévu.

**Mais il existe des situations où JavaScript "échoue" à prendre un point-virgule là où il est vraiment nécessaire.**

Les erreurs qui surviennent dans de tels cas sont assez difficiles à trouver et à corriger.

````smart header="Un exemple d'erreur"
Si vous êtes curieux de voir un exemple concret d’une telle erreur, vérifiez ce code :

```js run
alert("Hello");

[1, 2].forEach(alert);
```

Pas besoin de penser à la signification des crochets `[]` et `forEach` pour le moment. Nous les étudierons plus tard, pour l'instant, retenons simplement le résultat de l’exécution du code : il affiche `Hello`, puis `1`, puis `2`.

Supprimons maintenant le point-virgule après l’`alert` :

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
```

La différence par rapport au code ci-dessus n'est qu'un caractère : le point-virgule à la fin de la première ligne a disparu.

Si nous exécutons ce code, seul le premier `Hello` s'affiche (et il y a une erreur, vous devrez peut-être ouvrir la console pour le voir). Il n'y a plus de chiffres.

C'est parce que JavaScript ne suppose pas de point-virgule avant les crochets `[...]`. Ainsi, le code du dernier exemple est traité comme une seule instruction.

Voici comment le moteur le voit :

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

Ça a l'air bizarre, non ? Une telle fusion dans ce cas est tout simplement une erreur. Nous devons mettre un point-virgule après l'`alert` pour que le code fonctionne correctement.

Cela peut arriver dans d'autres situations aussi.
````

Il est recommandé de mettre les points-virgules entre les instructions, même si elles sont séparées par des nouvelles lignes. Cette règle est largement adoptée par la communauté. Notons encore une fois - _il est possible_ de laisser de côté les points-virgules la plupart du temps. Mais il est plus sûr -- surtout pour un débutant -- de les utiliser.

## Les Commentaires [#code-comments]

Au fil du temps, le programme devient de plus en plus complexe. Il devient nécessaire d'ajouter des _commentaires_ qui décrivent ce qui se passe et pourquoi.

Les commentaires peuvent être placés à n'importe quel endroit du script. Ils n'affectent pas l'exécution, car le moteur les ignore simplement.

**Les commentaires sur une ligne commencent par deux barres obliques `//`.**

Le reste de la ligne est un commentaire. Il peut occuper une ligne complète ou suivre une déclaration.

Comme ici :

```js run
// Ce commentaire occupe une ligne à part
alert("Hello");

alert("World"); // Ce commentaire suit l'instruction
```

**Les commentaires multilignes commencent par une barre oblique et un astérisque <code>/\*</code> et se termine par un astérisque et une barre oblique <code>\*/</code>.**

Comme ceci :

```js run
/* Un exemple avec deux messages.
C'est un commentaire multiligne.
*/
alert("Hello");
alert("World");
```

Le contenu des commentaires est ignoré, donc si nous mettons du code à l'intérieur <code>/\* ... \*/</code> il ne s'exécutera pas.

Parfois, il est utile de désactiver temporairement une partie du code :

```js run
/* Commenter le code
alert('Hello');
*/
alert("World");
```

```smart header="Utiliser les raccourcis !"
Dans la plupart des éditeurs, une ligne de code peut être commentée par le raccourci `key:Ctrl+/` pour un commentaire sur une seule ligne et quelque chose comme `key:Ctrl+Shift+/` -- pour les commentaires multilignes (sélectionnez un morceau de code et appuyez sur la combinaison de touches). Pour Mac essayez `key:Cmd` au lieu de `key:Ctrl` et `key:Option` au lieu de `key:Shift`.
```

````warn header="Les commentaires imbriqués ne sont pas supportés !"
Il peut ne pas y avoir `/*...*/` à l'intérieur d'un autre `/*...*/`.

Un tel code se terminera avec une erreur :

```js run no-beautify
/*
  /* commentaire imbriqué ?!? */
*/
alert( 'World' );
```
````

N'hésitez pas à commenter votre code.

Les commentaires augmentent la taille globale du code, mais ce n'est pas un problème du tout. De nombreux outils permettent de réduire le code avant de le publier sur le serveur de production. Ils suppriment les commentaires, ils n'apparaissent donc pas dans les scripts de travail. Les commentaires n'ont donc aucun effet négatif sur la production.

Plus loin dans le tutoriel, il y aura un chapitre <info:coding-style> qui explique également comment écrire de meilleurs commentaires.
