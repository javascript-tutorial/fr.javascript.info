
# Propriétés et méthodes privées et protégées

L'un des principes les plus importants de la programmation orientée objet - délimiter l'interface interne de l'interface externe.

C’est une pratique «incontournable» dans le développement de quelque chose de plus complexe que l’application «hello world».

Pour comprendre cela, écartons nous du développement et tournons nos yeux dans le monde réel.

Habituellement, les appareils que nous utilisons sont assez complexes.
Mais délimiter l'interface interne de l'interface externe permet de les utiliser sans problèmes.

## Un exemple concret

Par exemple, une machine à café.
Simple de l'extérieur: un bouton, un écran, quelques trous ...
Et le résultat: un café génial! :)

![](coffee.jpg)

Mais à l'intérieur ...
(une image du manuel de réparation)

![](coffee-inside.jpg)

Beaucoup de détails.
Mais on peut l'utiliser sans rien savoir.

Les machines à café sont assez fiables, n'est-ce pas? Nous pouvons en utiliser une pendant des années, et seulement en cas de problème, la faire réparer.

Le secret de la fiabilité et de la simplicité d'une machine à café - tous les détails sont bien réglés et cachés à l'intérieur.

Si nous retirons le capot de protection de la machine à café, son utilisation sera beaucoup plus complexe (où appuyer?) et dangereuse (elle peut électrocuter).

Comme nous le verrons, les objets de programmation ressemblent à des machines à café.

Mais pour masquer les détails intérieurs, nous n'utiliserons pas une couverture de protection, mais une syntaxe spéciale du langage et des conventions.

## Interface interne et externe

En programmation orientée objet, les propriétés et les méthodes sont divisées en deux groupes:

- *Interface interne* - méthodes et propriétés, accessibles à partir d'autres méthodes de la classe, mais pas de l'extérieur.
- *Interface externe* - méthodes et propriétés, accessibles aussi de l'extérieur de la classe.

Si nous continuons l'analogie avec la machine à café - ce qui est caché à l'intérieur: un tube de chaudière, un élément chauffant, etc.
-, c'est son interface interne.

Une interface interne est utilisée pour que l’objet fonctionne, ses détails s’utilisent les uns les autres.
Par exemple, un tube de chaudière est attaché à l'élément chauffant.

Mais de l'extérieur, une machine à café est fermée par le capot de protection, de sorte que personne ne puisse y accéder.
Les détails sont cachés et inaccessibles.
Nous pouvons utiliser ses fonctionnalités via l'interface externe.

Il suffit donc de connaître son interface externe pour utiliser un objet.
Nous ne savons peut-être pas comment cela fonctionne à l'intérieur, et c'est très bien.

C'était une introduction générale.

En JavaScript, il existe deux types de champs d’objet (propriétés et méthodes):

- Publique : accessible de n'importe où.
Ils comprennent l'interface externe.
Jusqu'à présent, nous utilisions uniquement des propriétés et méthodes publiques.
- Privée : accessible uniquement de l'intérieur de la classe.
Ce sont pour l'interface interne.

Dans de nombreuses autres langues, il existe également des champs "protégés": accessibles uniquement de l'intérieur de la classe et de ceux qui l'étendent (comme privé, mais avec accès des classes héritées).
Ils sont également utiles pour l'interface interne.
En un sens, elles sont plus répandues que les méthodes privées, car nous souhaitons généralement que les classes héritées puissent y accéder.

Les champs protégés ne sont pas implémentés en JavaScript au niveau de la langue, mais dans la pratique, ils sont très pratiques, ils sont donc imités.

Nous allons maintenant créer une machine à café en JavaScript avec tous ces types de propriétés.
Une machine à café a beaucoup de détails, nous ne les modéliserons pas pour rester simples (bien que nous puissions).

## Protection de "waterAmount"

Faisons d'abord une classe de machine à café simple:

```js run
class CoffeeMachine {
  waterAmount = 0; // la quantité d'eau à l'intérieur

  constructor(power) {
    this.power = power;
    alert(`Created a coffee-machine, power: ${power}`);
  }

}

// créer la machine à café
let coffeeMachine = new CoffeeMachine(100);

// ajoutez de l'eau
coffeeMachine.waterAmount = 200;
```

À l'heure actuelle, les propriétés `waterAmount` et `power` sont publiques.
Nous pouvons facilement les accéder/muter de l’extérieur à n’importe quelle valeur.

Changeons la propriété `waterAmount` en protégée pour avoir plus de contrôle sur celle-ci.
Par exemple, nous ne voulons pas que quiconque la règle en dessous de zéro.

**Les propriétés protégées sont généralement précédées d'un trait de soulignement `_`.**

Cela n'est pas appliqué au niveau de la langue, mais il existe une convention bien connue entre les programmeurs selon laquelle ces propriétés et méthodes ne doivent pas être accessibles de l'extérieur.

Donc notre propriété s'appellera `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// créer la machine à café
let coffeeMachine = new CoffeeMachine(100);

// ajoutez de l'eau
coffeeMachine.waterAmount = -10; // _waterAmount va devenir 0, pas -10
```

Maintenant, l'accès est sous contrôle, donc le réglage de l'eau en dessous de zéro échoue.

## "power" en lecture seule

Pour la propriété `power`, rendons-le en lecture seule.
Il arrive parfois qu'une propriété doit être définie au moment de la création, puis ne jamais être modifiée.

C'est exactement le cas pour une machine à café: la puissance ne change jamais.

Pour ce faire, il suffit de définir l'accésseur, mais pas le mutateur:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// créer la machine à café
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)
```

````smart header="Fonctions Accesseur/Mutateur"
Ici, nous avons utilisé la syntaxe accesseur/mutateur.

Mais la plupart du temps, les fonctions `get ...
/ set ...` sont préférées, comme ceci:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Cela semble un peu plus long, mais les fonctions sont plus flexibles.
Elles peuvent accepter plusieurs arguments (même si nous n'en avons pas besoin maintenant).

D'un autre côté, la syntaxe accesseur/mutateur est plus courte, donc il n'y a pas de règle stricte, c'est à vous de décider.
````

```smart header="Les champs protégés sont hérités"
Si nous héritons de `classe MegaMachine extends CoffeeMachine`, rien ne nous empêche d'accéder à` this._waterAmount` ou `this._power` à partir des méthodes de la nouvelle classe.

Les champs protégés sont donc naturellement héritables.
Contrairement aux champs privés que nous verrons ci-dessous.
```

## "#waterLimit" privée

[recent browser=none]

Il existe une proposition JavaScript finie, presque dans la norme, qui fournit une prise en charge au niveau de la langue pour les propriétés et méthodes privées.

Les propriétés privées devraient commencer par `#`.
Ils ne sont accessibles que de l'intérieur de la classe.

Par exemple, voici une propriété privée `#waterLimit` et la méthode privée de vérification du niveau de l'eau `#fixWaterAmount` :

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// ne peut pas accéder aux propriétés privées de l'extérieur de la classe
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

Au niveau de la langue, `#` est un signe spécial que le champ est privé.
Nous ne pouvons pas y accéder de l'extérieur ou des classes héritées.

Les champs privés n'entrent pas en conflit avec les champs publics.
Nous pouvons avoir les champs privés `#waterAmount` et publics `waterAmount` en même temps.
Pour l'exemple, faisons de `waterAmount` un accesseur pour `#waterAmount`:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

Contrairement aux champs protégés, les champs privés sont imposés par le langage lui-même.
C'est une bonne chose.

Mais si nous héritons de `CoffeeMachine`, nous n’aurons aucun accès direct à `#waterAmount`.
Nous aurons besoin de compter sur l'accesseur/mutateur `waterAmount`:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert(this.#waterAmount); // Error: can only access from CoffeeMachine
*/!*
  }
}
```

Dans de nombreux scénarios, une telle limitation est trop sévère.
Si nous étendons une `CoffeeMachine`, nous pouvons avoir une raison légitime d’accéder à ses composants internes.
C'est pourquoi les champs protégés sont utilisés plus souvent, même s'ils ne sont pas pris en charge par la syntaxe du langage.

````warn header="Les champs privés ne sont pas disponibles par this[nom]"
Les champs privés sont spéciaux.

Comme nous le savons, nous pouvons généralement accéder aux champs en utilisant `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

C'est impossible avec les champs privés: `this['#name']` ne fonctionne pas.
C'est une limitation de syntaxe pour assurer la confidentialité.
````

## Résumé

En termes de POO, la délimitation de l'interface interne de l'interface externe est appelée [encapsulation]("https://fr.wikipedia.org/wiki/Encapsulation_(programmation)").

Cela offre les avantages suivants:

Protection des utilisateurs pour qu'ils ne se tirent pas une balle dans le pied
: Imaginez, il y a une équipe de développeurs utilisant une machine à café.
Elle a été fabriquée par la société "Best CoffeeMachine" et fonctionne parfaitement, mais une coque de protection a été retirée.
Donc, l'interface interne est exposée.

    Tous les développeurs sont civilisés - ils utilisent la machine à café comme prévu.
Mais l'un d'entre eux, John, a décidé qu'il était le plus intelligent et a apporté quelques modifications aux éléments internes de la machine à café.
La machine à café a donc échoué deux jours plus tard.
   
    Ce n’est sûrement pas la faute de John, mais bien de la personne qui a enlevé le capot de protection et laissé John manipuler.
   
    La même chose en programmation.
Si un utilisateur d'une classe va changer des choses qui ne sont pas destinées à être modifiées de l'extérieur, les conséquences sont imprévisibles.

Maintenable
: La programmation est plus complexe qu’une machine à café réelle, car nous ne l’achetons pas une seule fois.
Le code est en constante évolution et amélioration.

    **Si nous délimitons strictement l'interface interne, le développeur de la classe peut modifier librement ses propriétés et méthodes internes, même sans en informer les utilisateurs.**

    Si vous êtes développeur d'une telle classe, il est bon de savoir que les méthodes privées peuvent être renommées en toute sécurité, que leurs paramètres peuvent être modifiés, voire supprimés, car aucun code externe ne dépend d'eux.

    Pour les utilisateurs, lorsqu'une nouvelle version est disponible, il peut s'agir d'une refonte totale en interne, mais reste simple à mettre à niveau si l'interface externe est la même.

Cacher la complexité
: Les gens adorent utiliser des choses simples.
Au moins de l'extérieur.
Ce qui est à l'intérieur est une chose différente.

    Les programmeurs ne sont pas une exception.

    **C'est toujours pratique lorsque les détails de l'implémentation sont cachés et qu'une interface externe simple et bien documentée est disponible.**

Pour masquer l'interface interne, nous utilisons des propriétés protégées ou privées :

- Les champs protégés commencent par `_`.
C'est une convention bien connue, non appliquée au niveau du langage.
Les programmeurs doivent uniquement accéder à un champ commençant par `_` depuis sa classe et les classes qui en héritent.
- Les champs privés commencent par `#`.
JavaScript garantit que nous ne pouvons accéder à ceux la que de l'intérieur de la classe.

Pour le moment, les champs privés ne sont pas bien supportés par les navigateurs, mais peuvent être polyfilled.
