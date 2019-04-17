# Ramasse-miettes (garbage collection)

La gestion de la mémoire en JavaScript est effectuée automatiquement et de manière invisible pour nous. Nous créons des primitives, des objets, des fonctions… Tout cela prend de la mémoire.

Que se passe-t-il quand quelque chose n'est plus nécessaire? Comment le moteur JavaScript le découvre et le nettoie ?

## Accessibilité

Le concept principal de la gestion de la mémoire en JavaScript est l’*accessibilité*.

En termes simples, les valeurs "accessibles" sont celles qui sont accessibles ou utilisables d’une manière ou d’une autre. Elles sont garanties d'être stockés en mémoire.

1. Il existe un ensemble de base de valeurs intrinsèquement accessibles, qui ne peuvent pas être supprimées pour des raisons évidentes.

    Par exemple :

    - Variables locales et paramètres de la fonction en cours.
    - Variables et paramètres pour d'autres fonctions sur la chaîne d'appels imbriqués en cours.
    - Variables globales.
    - (il y en a d'autres, internes aussi)

    Ces valeurs s'appellent des racines (*roots*).

2. Toute autre valeur est considérée comme accessible si elle est accessible depuis une racine par une référence ou par une chaîne de références.

    Par exemple, s’il existe un objet dans une variable locale et que cet objet a une propriété référençant un autre objet, cet objet est considéré comme accessible. Et ceux auxquels il fait référence sont également accessibles. Des exemples détaillés à suivre.

Il existe un processus d’arrière-plan dans le moteur JavaScript appelé [Ramasse-miettes (Garbage Collector)](https://fr.wikipedia.org/wiki/Ramasse-miettes_(informatique)). Il surveille tous les objets et supprime ceux qui sont devenus inaccessibles.

## Un exemple simple

Voici l'exemple le plus simple :

```js
// user a une référence à l'objet
let user = {
  name: "John"
};
```

![](memory-user-john.png)

Ici, la flèche représente une référence d'objet. La variable globale `"user"` fait référence à l’objet `{name: "John"}` (nous l’appellerons John par souci de brièveté). La propriété `"name"` de John stocke une primitive, elle est donc stockée à l'intérieur de l'objet.

Si la valeur de `user` est écrasée, la référence est perdue :

```js
user = null;
```

![](memory-user-john-lost.png)

Maintenant, John devient inaccessible. Il n’y a aucun moyen d’y accéder, pas de référence. Le ramasse-miettes (garbage collector) détruit les données et libère la mémoire.

## Deux références

Imaginons maintenant que nous ayons copié la référence de `user` à `admin` :

```js
// user a une référence à l'objet
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.png)

Maintenant si nous faisons la même chose :
```js
user = null;
```

… Ensuite, l’objet est toujours accessible via la variable globale `admin`, il est donc encore en mémoire. Si nous écrasons également `admin`, alors il sera supprimé.

## Objets liés

Maintenant, un exemple plus complexe. La famille :

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

La fonction `marry` "marie" deux objets en leur donnant des références et renvoie un nouvel objet les contenant tous les deux.

Le résultat de la structure de mémoire :

![](family.png)

À partir de maintenant, tous les objets sont accessibles.

Supprimons maintenant deux références :

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.png)

Il ne suffit pas de supprimer une seule de ces deux références, car tous les objets seraient toujours accessibles.

Mais si nous supprimons les deux, alors nous pouvons voir que John n’a plus de référence entrante :

![](family-no-father.png)

Les références sortantes importent peu. Seuls les objets entrants peuvent rendre un objet accessible. Ainsi, John est maintenant inaccessible et sera supprimé de la mémoire avec toutes ses données qui sont également devenues inaccessibles.

Après le passage du ramasse-miettes (garbage collector) :

![](family-no-father-2.png)

## Île inaccessible

Il est possible que toute l'île d'objets liés entre eux devienne inaccessible et soit supprimée de la mémoire.

L'objet source est le même que ci-dessus. Ensuite :

```js
family = null;
```

L'image en mémoire devient :

![](family-no-family.png)

Cet exemple montre à quel point le concept d'accessibilité est important.

Il est évident que John et Ann sont toujours liés, les deux ont des références entrantes. Mais cela ne suffit pas.

L’ancien objet `"family"` a été dissocié de la racine, elle n’y fait plus référence, toute l’île devient inaccessible et sera donc supprimée.

## Algorithmes internes

L'algorithme de base de la récupération de place (garbage collection) s'appelle "mark-and-sweep".

Les étapes suivantes du "ramasse-miettes" (garbage collection) sont régulièrement effectuées :

- Le ramasse-miettes prend des racines et les "marque" (se souvient).
- Ensuite, il visite et "marque" toutes les références.
- Ensuite, il visite les objets marqués et marque *leurs* références. Tous les objets visités sont mémorisés afin de ne pas visiter le même objet deux fois dans le futur.
- … Et ainsi de suite tant qu'il y a des références non consultées (accessibles depuis les racines).
- Tous les objets sont supprimés sauf ceux qui sont marqués.

Par exemple, imaginons notre structure d'objet ressembler à ceci :

![](garbage-collection-1.png)

Nous pouvons clairement voir une "île inaccessible" sur le côté droit. Voyons maintenant comment le garbage collector "mark-and-sweep" le gère.

La première étape marque les racines :

![](garbage-collection-2.png)

Ensuite, leurs références sont marquées :

![](garbage-collection-3.png)

… Et leurs références, autant que possible :

![](garbage-collection-4.png)

Désormais, les objets qui n'ont pas pu être visités sont considérés comme inaccessibles et seront supprimés :

![](garbage-collection-5.png)

C’est le concept de la façon dont le garbage collector fonctionne.

Les moteurs JavaScript appliquent de nombreuses optimisations pour accélérer l’exécution et ne pas affecter l’exécution.

Certaines des optimisations :

- **Collection générationnelle** -- les objets sont divisés en deux ensembles : les "nouveaux" et les "anciens". De nombreux objets apparaissent, font leur travail et meurent rapidement, ils peuvent être nettoyés de manière agressive. Ceux qui survivent assez longtemps deviennent "vieux" et sont examinés moins souvent.
- **Collection incrémentale** -- s'il y a beaucoup d'objets et que nous essayons de circuler et de marquer le jeu d'objets entier en même temps, cela peut prendre un certain temps et introduire des retards visibles dans l'exécution. Le moteur essaie donc de scinder le garbage collection (ramassage de miettes) en morceaux. Ensuite, ces parties sont exécutées une par une, séparément. Cela nécessite une comptabilité supplémentaire entre elles pour suivre les changements, mais nous avons beaucoup de petits retards au lieu d'un gros.
- **Collection par inactivité** -- le garbage collector tente de s'exécuter uniquement lorsque le processeur (CPU) est inactif, afin de réduire les conséquences sur l'exécution.

Il existe d'autres optimisations et variantes d'algorithmes de récupération de place. Même si je souhaite les décrire ici, je dois m'abstenir, car différents moteurs implémentent différentes techniques et ajustements. Et, ce qui est encore plus important, les choses changent à mesure que les moteurs se développent. Donc aller plus loin de manière plus poussée, sans réel besoin, n’en vaut probablement pas la peine. À moins, bien sûr, que ce soit une question qui vous intéresse vraiment, vous trouverez quelques liens pour vous ci-dessous.

## Résumé

Les principales choses à savoir :

- La garbage collection est effectuée automatiquement. Nous ne pouvons ni forcer ni empêcher cela.
- Les objets sont conservés en mémoire tant qu'ils sont accessibles.
- Être référencé n'est pas la même chose qu'être accessible (depuis une racine): un groupe d'objets liés entre eux peut devenir inaccessible dans son ensemble.

Les moteurs modernes implémentent des algorithmes avancés de récupération de place.

Un livre général intitulé "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al.) En parle.

Si vous êtes familiarisé avec la programmation de bas niveau, les informations plus détaillées sur le garbage collecor V8 se trouvent dans l'article [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8 blog](http://v8project.blogspot.com/) publie également des articles sur les modifications de la gestion de la mémoire de temps à autre. Naturellement, pour apprendre la récupération de place, vous feriez mieux de vous préparer en vous renseignant sur les éléments internes de V8 en général et en lisant le blog de [Vyacheslav Egorov](http://mrale.ph) qui a travaillé comme l'un des ingénieurs V8. Je dis: «V8», car c'est le plus couvert d'articles sur Internet. Pour d'autres moteurs, de nombreuses approches sont similaires, mais la récupération de place diffère à de nombreux égards.

Une connaissance approfondie des moteurs est utile lorsque vous avez besoin d'optimisations de bas niveau. Il serait sage de planifier cela comme prochaine étape après la connaissance du langage.
