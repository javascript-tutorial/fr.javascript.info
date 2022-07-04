# L'environnement du navigateur, spécifications

<<<<<<< HEAD
Le langage JavaScript a été initialement créé pour les navigateurs web. Dès lors, il a évolué et est devenu un langage aux multiples utilisations et plateformes.

Une plate-forme peut être un navigateur, un serveur Web ou un autre *hôte*, voire une machine à café dite "intelligente". Chacun d'eux fournit des fonctionnalités spécifiques à la plate-forme. La spécification JavaScript appelle cela un *environnement hôte*.

Un environnement hôte fournit ses propres objets et fonctions en plus du noyau du langage. Les navigateurs Web permettent de contrôler les pages Web. Node.js fournit des fonctionnalités côté serveur, etc.
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

Voici une vue globale de ce que nous avons lorsque JavaScript s'exécute dans un navigateur Web :

![](windowObjects.svg)

Il existe un objet "racine" appelé `window`. Il a 2 rôles :

1. Premièrement, c'est un objet global pour le code JavaScript, comme décrit dans le chapitre <info:global-object>.
2. Deuxièmement, il représente la "fenêtre du navigateur" et fournit des méthodes pour la contrôler.

<<<<<<< HEAD
Par exemple, nous l'utilisons ici comme un objet global :
=======
For instance, we can use it as a global object:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

```js run global
function sayHi() {
  alert("Hello");
}

// les fonctions globales sont des méthodes de l'objet global :
window.sayHi();
```

<<<<<<< HEAD
Et nous l'utilisons ici comme une fenêtre du navigateur pour voir la hauteur de la fenêtre :
=======
And we can use it as a browser window, to show the window height:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

```js run
alert(window.innerHeight); // hauteur de la fenêtre intérieure
```

<<<<<<< HEAD
Il y a d'autres méthodes et propriétés spécifiques à la fenêtre, nous les étudierons plus tard.

## DOM (Document Object Model)

Document Object Model, ou DOM en abrégé, représente tout le contenu de la page sous forme d'objets pouvant être modifiés.
=======
There are more window-specific methods and properties, which we'll cover later.

## DOM (Document Object Model)

The Document Object Model, or DOM for short, represents all page content as objects that can be modified.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

L'objet `document` est le "point d'entrée" principal de la page. Nous pouvons changer ou créer n'importe quoi sur la page en l'utilisant.

Par exemple :
```js run
// change la couleur de fond en rouge
document.body.style.background = "red";

// réinitialisation après 1 seconde
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
Ici on a utilisé `document.body.style`, mais il y a bien plus encore. Les propriétés et les méthodes sont décrites dans la spécification : [DOM Living Standard](https://dom.spec.whatwg.org).
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

```smart header="DOM n'est pas seulement pour les navigateurs"
La spécification DOM explique la structure d'un document et fournit des objets pour le manipuler. Il existe également des instruments autres que les navigateurs qui utilisent DOM.

<<<<<<< HEAD
Par exemple, les scripts côté serveur qui téléchargent des pages HTML et les traitent peuvent également utiliser le DOM. Ils peuvent cependant ne supporter qu'une partie de la spécification.
=======
For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
```

```smart header="CSSOM pour le style"
Il existe également une spécification distincte, [Modèle d'objet CSS (CSSOM)](https://www.w3.org/TR/cssom-1/) pour les règles CSS et les feuilles de style, qui explique comment elles sont représentées en tant qu'objets et comment les lire et les écrire.

<<<<<<< HEAD
CSSOM est utilisé avec DOM lorsque nous modifions les règles de style du document. En pratique cependant, CSSOM est rarement nécessaire, car nous avons rarement besoin de modifier les règles CSS à partir de JavaScript (généralement, nous ajoutons / supprimons simplement des classes CSS, pas de modifier leurs règles CSS), mais c'est également possible.
=======
The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
```

## BOM (Browser Object Model)

Le modèle d'objet du navigateur (BOM en anglais) contient des objets supplémentaire fourni par le navigateur (l'environnement hôte) pour travailler avec tout à l'exception du document.

Par exemple :

<<<<<<< HEAD
- L'objet [navigator](mdn:api/Window/navigator) fournit des informations contextuelles à propos du navigateur et du système d'exploitation. Il y a beaucoup de propriétés mais les deux plus connues sont : `navigator.userAgent` -- qui donne des informations sur le navigateur actuel, et `navigator.platform` sur la plateforme (peut permettre de faire la différence entre Windows/Linux/Mac etc).
- L'objet [location](mdn:api/Window/location) nous permet de lire l'URL courante et peut rediriger le navigateur vers une nouvelle adresse.
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

Voici comment l'on peut utiliser l'objet `location` :

```js run
alert(location.href); // affiche l'URL actuelle
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // rediriger le navigateur vers une autre URL
}
```

<<<<<<< HEAD
Les fonctions `alert/confirm/prompt` font aussi partie du BOM : elles ne sont pas directement liées au document, mais représentent des méthodes du navigateur de communication pure avec l'utilisateur.

```smart header="Specifications"
le BOM fait partie de la [spécification HTML](https://html.spec.whatwg.org) générale.

Oui, vous avez bien entendu. La spécification HTML disponible à l'adresse <https://html.spec.whatwg.org> ne parle pas seulement du "langage HTML" (balises, attributs), mais couvre également un tas d'objets, de méthodes et d'extensions DOM spécifiques au navigateur. C'est l'"HTML de manière générale". En outre, certaines parties ont des spécifications supplémentaires listées ici : <https://spec.whatwg.org>.
=======
The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
```

## Résumé

Quand on parle de normes, nous avons :

<<<<<<< HEAD
La spécification DOM
: Décrit la structure du document, ses manipulations et événements, voir <https://dom.spec.whatwg.org>.

La spécification CSSOM
: Décrit les feuilles de style et les régles de style, les manipulations de style les impliquant et leur liaisons aux documents, voir <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

Spécification HTML
: Décrit le langage HTML (c'est à dire les balises) mais également le BOM (modèle d'objet du navigateur) -- diverses fonctions du navigateur : `setTimeout`, `alert`, `location` etc, voir <https://html.spec.whatwg.org>. Il récupère la spécification DOM et l'étend avec de nombreuses propriétés et méthodes additionnelles.

De plus, certaines classes sont décrites séparément sur <https://spec.whatwg.org/>.

<<<<<<< HEAD
Souvenez vous de ces liens, il y a tellement de choses à apprendre qu'il est impossible de tout couvrir et de se souvenir de tout.

Lorsque vous souhaitez en apprendre plus sur une propriété ou une méthode, le manuel de Mozilla disponible sur <https://developer.mozilla.org/en-US/search> est également une bonne ressource, mais la définition correspondance peut-être meilleure dans le sens qu'elle est plus complexe et longue à lire, mais rendra vos connaissances fondamentales saines et complètes.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

Pour trouver quelque chose, il est souvent pratique de faire une simple recherche de "WHATWG [terme]" ou "MDN [terme]", par exemple <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

<<<<<<< HEAD
Nous allons maintenant nous pencher sur le DOM, car le document joue un rôle essentiel dans l'interface utilisateur (UI).
=======
Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
