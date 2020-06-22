# Ninja code


```quote author="Confucius"
Apprendre sans réfléchir est vain. Réfléchir sans apprendre est dangereux.
```

Les programmeurs ninjas du passé ont utilisé ces astuces pour aiguiser l'esprit des mainteneurs de code.

Les gourous de la révision de code les recherchent dans les tâches de test.

Les développeurs novices les utilisent parfois encore mieux que les programmeurs ninjas.

Lisez-les attentivement et découvrez qui vous êtes: un ninja, un novice ou peut-être un critique de code ?


```warn header="Ironie detectée"
Beaucoup essaient de suivre les chemins des ninjas. Peu réussissent.
```


## La concision est l'âme de l'esprit

Faites le code aussi court que possible. Montrez à quel point vous êtes intelligent.

Laissez les fonctionnalités du langage subtiles vous guider.

Par exemple, jetez un oeil à cet opérateur ternaire `'?'` :

```js
// tiré d'une bibliothèque javascript bien connue
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Cool, non ? Si vous écrivez comme ça, le développeur qui arrive à cette ligne et essaie de comprendre quelle est la valeur de `i` va passer un bon moment. Ensuite vient votre tour, cherchant une réponse.

Dites-leur que le plus court est toujours mieux. Initiez-les dans les chemins du ninja.

## Variables à une lettre

```quote author="Laozi (Tao Te Ching)"
Le Dao se cache sans mots. Seul le Dao est bien commencé et bien terminé.
```

<<<<<<< HEAD
Une autre façon de coder plus rapidement consiste à utiliser des noms de variable d'une seule lettre partout. Comme `a`, `b` ou `c`.
=======
Another way to code shorter is to use single-letter variable names everywhere. Like `a`, `b` or `c`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

Une petite variable disparaît dans le code comme un vrai ninja dans la forêt. Personne ne pourra la trouver en utilisant la "recherche" de l'éditeur. Et même si quelqu'un le fait, il ne pourra pas "déchiffrer" la signification du nom `a` ou `b`.

… Mais il y a une exception. Un vrai ninja n'utilisera jamais `i` comme compteur dans une boucle `"for"`. N'importe où, mais pas ici. Regardez autour de vous, il y a beaucoup plus de lettres exotiques. Par exemple, `x` ou `y`.

Une variable exotique en tant que compteur de boucle est particulièrement intéressante si le corps de la boucle nécessite 1 à 2 pages (rallongez-la si vous le pouvez). Ensuite, si quelqu'un regarde au fond de la boucle, il ne sera pas en mesure de comprendre rapidement que la variable nommée `x` est le compteur de boucles.

## Utiliser des abréviations

Si les règles de l'équipe interdisent l'utilisation de noms d'une seule lettre et de noms vagues, abrégez-les, faites des abréviations.

Comme ceci :

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Seul celui qui a vraiment une bonne intuition sera capable de comprendre de tels noms. Essayez de tout raccourcir. Seule une personne digne de ce nom devrait être capable de soutenir le développement de votre code.

## Prenez de la hauteur. Soyez abstrait.

```quote author="Laozi (Tao Te Ching)"
The great square is cornerless<br>
The great vessel is last complete,<br>
The great note is rarified sound,<br>
The great image has no form.
```

En choisissant un nom, essayez d’utiliser le mot le plus abstrait. Comme `obj`, `data`, `value`, `item`, `elem` etc.

- **Le nom idéal pour une variable est `data`.** Utilisez-le partout où vous le pouvez. En effet, chaque variable contient des données, non ?

    … Mais que faire si `data` est déjà pris ? Essayez `value`, elle est aussi universelle. Après tout, une variable obtient finalement une *valeur*.

- **Nommez une variable par son type : `str`, `num`...**

    Accordez-leur une chance. Un jeune initié peut se demander : de tels noms sont-ils vraiment utiles à un ninja ? En effet, ils le sont !

    Bien sûr, le nom de la variable signifie toujours quelque chose. Il indique ce qui est à l’intérieur de la variable: une chaîne de caractères, un nombre ou autre chose. Mais quand une personne essaiera de comprendre le code, elle sera surprise de constater qu’il n’y a en réalité aucune information ! Et finalement, elle ne pourra pas modifier votre code bien pensé.

    Le type de valeur est facile à déterminer par le débogage. Mais quel est le sens de la variable ? Quelle chaîne de caractères/nombre est-il stocké ?

    Il n’est pas possible de comprendre sans une bonne méditation !

- **… Mais s'il n'y a plus de tels noms disponibles ?** Il suffit d'ajouter un numéro : `data1, item2, elem5`...

## Test d'attention

Seul un programmeur vraiment attentif devrait être capable de comprendre votre code. Mais comment vérifier ça ?

**Une des façons - utilisez des noms de variables similaires, comme `date` et `data`.**

Mélangez-les où vous pouvez.

Une lecture rapide de ce code devient impossible. Et quand il ya une faute de frappe… Humm… Nous sommes coincés longtemps, le temps de boire du thé.


## Des synonymes intelligents

```quote author="Confucius"
L'une des chose les plus difficiles est de trouver un chat noir dans une pièce sombre, surtout s’il n’y a pas de chat.
```

Utiliser des noms *similaires* pour les *mêmes* choses rend la vie plus intéressante et montre votre créativité au public.

Par exemple, considérons les préfixes de fonction. Si une fonction affiche un message à l'écran, lancez-la avec `display…`, comme `displayMessage`. Et puis, si une autre fonction affiche à l'écran quelque chose d'autre, comme un nom d'utilisateur, lancez-le avec `show…` (comme `showName`).

Insinuez qu’il existe une différence subtile entre ces fonctions, alors qu’il n’en existe aucune.

Faites un pacte avec les autres ninjas de l'équipe: si John commence à "afficher" des fonctions avec `display` ... dans son code, Peter pourra utiliser `render` ..., et Ann - `paint` ... Notez à quel point le code est devenu plus intéressant et diversifié.

… Et maintenant le tour de magie !

Pour deux fonctions présentant des différences importantes, utilisez le même préfixe !

Par exemple, la fonction `printPage(page)` utilisera une imprimante. Et la fonction `printText(text)` mettra le texte à l'écran. Laissez un lecteur inconnu réfléchir à la fonction `printMessage`, qui porte le même nom: "Où place-t-il le message ? Pour une imprimante ou à l'écran ?". Pour le rendre vraiment brillant, `printMessage(message)` devrait l'extraire dans la nouvelle fenêtre!

## Réutiliser des noms

```quote author="Laozi (Tao Te Ching)"
Une fois que le tout est divisé, les parties<br>
ont besoin de noms.<br>
Il y a déjà assez de noms.<br>
Il faut savoir quand s'arrêter.
```

Ajoutez une nouvelle variable uniquement lorsque cela est absolument nécessaire.

Au lieu de cela, réutilisez les noms existants. Il suffit d'écrire de nouvelles valeurs en eux.

Dans une fonction, n'utilisez que des variables passées en paramètres.

Cela va rendre vraiment difficile d’identifier ce qui est exactement dans la variable maintenant. Et aussi d'où ça vient. Le but est de développer l’intuition et la mémoire de la personne qui lit le code. Une personne ayant une faible intuition devrait analyser le code ligne par ligne et suivre les modifications dans chaque branche de code.

**Une variante avancée de l'approche consiste à remplacer secrètement (!) La valeur par quelque chose de similaire au milieu d'une boucle ou d'une fonction.**

Par exemple :

```js
function ninjaFunction(elem) {
  // 20 lignes de code fonctionnant avec elem

  elem = clone(elem);

  // 20 lignes supplémentaires, fonctionnant maintenant avec le clone de elem !
}
```

Un collègue programmeur qui veut travailler avec `elem` dans la seconde moitié de la fonction sera surpris… Seulement lors du débogage, après avoir examiné le code, ils découvrira qu’il travaille avec un clone !

MVu dans du code régulièrement. Mortellement efficace même contre un ninja expérimenté. 

## Underscores for fun

Placez les underscores `_` et `__` avant les noms de variables. Comme `_name` ou `__value`. Ce serait génial si seulement vous connaissiez leur signification. Ou, mieux, ajoutez-les juste pour le plaisir, sans signification particulière. Ou différentes significations dans différents endroits.

Vous faites d'une pierre deux coups. Premièrement, le code devient plus long et moins lisible, et deuxièmement, un autre développeur peut passer beaucoup de temps à essayer de comprendre ce que signifient les soulignements.

Un ninja intelligent place les traits de soulignement à un endroit du code et les évite à d’autres endroits. Cela rend le code encore plus fragile et augmente la probabilité d'erreurs futures.

## Montrez votre amour

Laissez tout le monde voir à quel point vos entités sont magnifiques! Des noms comme `superElement`, `megaFrame` et `niceItem` illumineront définitivement le lecteur.

En effet, d’une part, quelque chose s’écrit: `super ..`, `mega ..`, `nice ..`. Mais de l’autre -- cela n’apporte aucun détail. Un lecteur peut décider de chercher un sens caché et de méditer pendant une heure ou deux de leur temps de travail rémunéré.

## Chevaucher des variables externes



```quote author="Guan Yin Zi"
Lorsqu'on est dans la lumière, on ne peut rien voir dans l’obscurité.<br>
Lorsqu'on est dans l'obscurité, on peut tout voir dans la lumière.
```

Utilisez les mêmes noms pour les variables à l'intérieur et à l'extérieur d'une fonction. Aussi simple que cela. Pas besoin de faire des efforts pour inventer de nouveaux noms.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...beaucoup de lignes...
  ...
  ... // <-- un programmeur veut travailler avec l'utilisateur ici et …
  ...
}
```

Un programmeur qui saute dans le `render` ne remarquera probablement pas qu’il ya un `user` local qui masque celui de l’extérieur.

Ensuite, il essaiera de travailler avec l’`user` en supposant que c’est la variable externe, le résultat de `authenticateUser()`… Le piège est déclenché ! Bonjour debugger…


## Effets secondaires partout !

Certaines fonctions donnent l’impression de ne rien changer. Comme `isReady()`, `checkPermission()`, `findTags()`… Elles sont supposés effectuer des calculs, trouver et renvoyer les données, sans rien changer en dehors d'eux. En d'autres termes, sans "effets secondaires".

**Une très belle astuce consiste à leur ajouter une action "utile", en plus de la tâche principale.**


L’expression de surprise hébétée sur le visage de vos collègues quand ils voient une fonction nommée `is..`, `check..` ou `find...` changer quelque chose -- va certainement élargir vos limites de la raison.

**Une autre façon de surprendre est de renvoyer un résultat non standard.**

Montrez votre pensée originale ! Laissez l'appel de `checkPermission` renvoyer non pas `true/false`, mais un objet complexe avec les résultats de la vérification.

Les développeurs qui essaient d’écrire `if(checkPermission(..))` se demanderont pourquoi cela ne fonctionne pas. Dites-leur : "Lisez la documentation!". Et donnez cet article.


## Fonctions puissantes !

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Ne limitez pas la fonction à ce qui est écrit dans son nom. Soyez plus large.

Par exemple, une fonction `validateEmail(email)` pourrait (en plus de vérifier l'exactitude de l'email) afficher un message d'erreur et demander à ressaisir l'email.

Les actions supplémentaires ne doivent pas être évidentes à partir du nom de la fonction. Un vrai codeur ninja ne les rendra pas évidents à partir du code non plus.

**La jonction de plusieurs actions en une seule protège votre code de la réutilisation.**

Imaginez, un autre développeur souhaitant uniquement vérifier le courrier électronique et ne pas générer de message. Votre fonction `validateEmail(email)` qui fait les deux ne leur conviendra pas. Donc, ils ne briseront pas votre méditation en posant des questions à ce sujet.

## Résumé

Tous les "conseils" ci-dessus sont tirés de code réel … Parfois écrits par des développeurs expérimentés. Peut-être même plus expérimenté que vous ;)

- Suivez certains d'entre eux et votre code deviendra plein de surprises.
- Suivez beaucoup d'entre eux, et votre code deviendra vraiment le vôtre, personne ne voudra le changer.
- Suivez tout et votre code deviendra une leçon précieuse pour les jeunes développeurs à la recherche d'illumination.
