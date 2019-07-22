# L'environnement du navigateur, spécifications

Le langage JavaScript a été initialement créé pour les navigateurs web. Dès lors, il a évolué et est devenu un langage aux multiples utilisations et plateformes.

Une plateforme peut être un navigateur, un serveur web, ou une machine à laver, ou un autre *hôte*. Chacuns d'entre eux proposent des fonctionnalités spécifiques à leur plateforme. La spécification JavaScript appelle cela un *environnement hôte*.

Un environnement hôte propose des objets et fonctions spécifiques à la plateforme en plus du noyau du langage. Les navigateurs web donnent la possibilité de contrôler les pages web. Node.js fournit des fonctionnalités côté serveur, etc.

Voici une vue globale de ce que nous avons lorsque JavaScript s'exécute dans un navigateur Web :

![](windowObjects.png)

Il existe un objet "racine" appelé `window`. Il a 2 rôles :

1. Premièrement, c'est un objet global pour le code JavaScript, comme décrit dans le chapitre <info:global-object>.
2. Deuxièmement, il représente la "fenêtre du navigateur" et fournit des méthodes pour la contrôler.

Par exemple, nous l'utilisons ici comme un objet global :

```js run
function sayHi() {
  alert("Hello");
}

<<<<<<< HEAD
// les fonctions globales sont accessibles comment étant des propriétés de la fenêtre
=======
// global functions are methods of the global object:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
window.sayHi();
```

Et nous l'utilisons ici comme une fenêtre du navigateur pour voir la hauteur de la fenêtre :

```js run
alert(window.innerHeight); // hauteur de la fenêtre intérieure
```

Il y a d'autres méthodes et propriétés spécifiques à la fenêtre, nous les étudierons plus tard.

## DOM (Document Object Model)

l'objet `document` donne accès au contenu de la page. On peut changer ou créer n'importe quoi sur la page en l'utilisant.

Par exemple :
```js run
// change la couleur de fond en rouge
document.body.style.background = "red";

// réinitialisation après 1 seconde
setTimeout(() => document.body.style.background = "", 1000);
```

Ici on a utilisé `document.body.style`, mais il y a bien plus encore. Les propriétés et les méthodes sont décrites dans la spécification :

- **DOM Living Standard** à <https://dom.spec.whatwg.org>

```smart header="le DOM n'est pas seulement pour les navigateurs"
La spécification DOM décrit la structure d'un document et fournit des objets pour la manipuler. Il y a des instruments autres que des navigateurs qui l'utilisent aussi.

Par exemple, Les outils côté serveur qui télécharge des pages HTML et les traitent utilisent le DOM. Bien qu'ils peuvent ne supporter qu'une partie de la spécification.
```

```smart header="le CSSOM pour gérer le style"
Les règles CSS et les feuilles de style ne sont pas structurées comme le HTML. Il y a une spécification séparée [CSSOM](https://www.w3.org/TR/cssom-1/) qui explique comment ils sont représentés comme étant des objets, et comment lire et écrire dessus.

Le CSSOM est utilisé en parallèle avec le DOM lorsque l'on modifie des règles de style pour le document. Cependant, il est rarement requis en pratique car les règles CSS sont généralement statiques. Nous avons rarement besoin d'ajouter/supprimer des règles depuis JavaScript, nous n'allons donc pas nous concentrer là-dessus pour l'instant.
```

## BOM (Browser object model)

Le modèle d'objet du navigateur (BOM en anglais) contient des objets supplémentaire fourni par le navigateur (l'environnement hôte) pour travailler avec tout à l'exception du document.

Par exemple :

- L'objet [navigator](mdn:api/Window/navigator) fournit des informations contextuelles à propos du navigateur et du système d'exploitation. Il y a beaucoup de propriétés mais les deux plus connues sont : `navigator.userAgent` -- qui donne des informations sur le navigateur actuel, et `navigator.platform` sur la plateforme (peut permettre de faire la différence entre Windows/Linux/Mac etc).
- L'objet [location](mdn:api/Window/location) nous permet de lire l'URL courante et peut rediriger le navigateur vers une nouvelle adresse.

Voici comment l'on peut utiliser l'objet `location` :

```js run
alert(location.href); // affiche l'URL courante
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirige le navigateur vers une autre adresse
}
```

Les fonctions `alert/confirm/prompt` font aussi partie du BOM : elles ne sont pas directement liées au document, mais représentent des méthodes du navigateur de communication pure avec l'utilisateur.

le BOM fait partie de la [spécification HTML](https://html.spec.whatwg.org) générale.

Oui, vous avez bien entendu. La spécification HTML disponible à l'adresse <https://html.spec.whatwg.org> ne parle pas seulement du "langage HTML" (balises, attributs), mais couvre également un tas d'objets, de méthodes et d'extensions DOM spécifiques au navigateur. C'est l'"HTML de manière générale". En outre, certaines parties ont des spécifications supplémentaires listées ici : <https://spec.whatwg.org>.

## Résumé

Quand on parle de normes, nous avons :

La spécification DOM
: Décrit la structure du document, ses manipulations et événements, voir <https://dom.spec.whatwg.org>.

La spécification CSSOM
: Décrit les feuilles de style et les régles de style, les manipulations de style les impliquant et leur liaisons aux documents, voir <https://www.w3.org/TR/cssom-1/>.

Spécification HTML
: Décrit le langage HTML (c'est à dire les balises) mais également le BOM (modèle d'objet du navigateur) -- diverses fonctions du navigateur : `setTimeout`, `alert`, `location` etc, voir <https://html.spec.whatwg.org>. Il récupère la spécification DOM et l'étend avec de nombreuses propriétés et méthodes additionnelles.

De plus, certaines classes sont décrites séparément sur <https://spec.whatwg.org/>.

Souvenez vous de ces liens, il y a tellement de choses à apprendre qu'il est impossible de tout couvrir et de se souvenir de tout.

Lorsque vous souhaitez en apprendre plus sur une propriété ou une méthode, le manuel de Mozilla disponible sur <https://developer.mozilla.org/en-US/search> est également une bonne ressource, mais la définition correspondance peut-être meilleure dans le sens qu'elle est plus complexe et longue à lire, mais rendra vos connaissances fondamentales saines et complètes.

Pour trouver quelque chose, il est souvent pratique de faire une simple recherche de "WHATWG [terme]" ou "MDN [terme]", par exemple <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Nous allons maintenant nous pencher sur le DOM, car le document joue un rôle essentiel dans l'interface utilisateur (UI).
