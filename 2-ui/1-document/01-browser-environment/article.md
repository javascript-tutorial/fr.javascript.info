# L'environnement du navigateur, spécifications

Le langage JavaScript a été initialement créé pour les navigateurs web. Depuis lors, il a évolué et est devenu un langage aux multiples utilisations et plateformes.

Une plateforme peut être un navigateur, un serveur web, ou une machine à laver, ou un autre *hôte*. Chacuns d'entre eux proposent des fonctionnalités spécifiques à la plateforme. La spécification JavaScript appelle cela un *environnement hôte*.

Un environnement hôte propose des objets et fonctions spécifiques à la plateforme en plus du noyau du langage. Les navigateurs web donnent la possibilité de contrôler les pages web. Node.js fournit des fonctionnalités côté serveur, etc.

Voici une vue globale de ce que nous avons lorsque JavaScript s'exécute dans un navigateur Web :

![](windowObjects.png)

Il y a un objet "racine" appelé `window`. Il a 2 rôles :

1. Premièrement, c'est un objet global pour le code JavaScript, comme décrit dans le chapitre <info:global-object>.
2. Deuxièmement, cela représente la "fenêtre du navigateur" et fournit des méthodes pour la contrôler.

Par exemple, nous l'utilisons ici comme un objet global :

```js run
function sayHi() {
  alert("Hello");
}

// les fonctions globales sont accessibles comment étant des propriétés de la fenêtre
window.sayHi();
```

Et nous l'utilisons ici comme une fenêtre du navigateur pour voir la hauteur de la fenêtre :

```js run
alert(window.innerHeight); // inner window height
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

```smart header="CSSOM for styling"
CSS rules and stylesheets are not structured like HTML. There's a separate specification [CSSOM](https://www.w3.org/TR/cssom-1/) that explains how they are represented as objects, and how to read and write them.

CSSOM is used together with DOM when we modify style rules for the document. In practice though, CSSOM is rarely required, because usually CSS rules are static. We rarely need to add/remove CSS rules from JavaScript, so we won't cover it right now.
```

## BOM (Browser object model)

Browser Object Model (BOM) are additional objects provided by the browser (host environment) to work with everything except the document.

For instance:

- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.

Here's how we can use the `location` object:

```js run
alert(location.href); // shows current URL
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

Functions `alert/confirm/prompt` are also a part of BOM: they are directly not related to the document, but represent pure browser methods of communicating with the user.

BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.

## Summary

Talking about standards, we have:

DOM specification
: Describes the document structure, manipulations and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.

HTML specification
: Describes the HTML language (e.g. tags) and also the BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Additionally, some classes are described separately at <https://spec.whatwg.org/>.

Please note these links, as there's so much stuff to learn it's impossible to cover and remember everything.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it's often convenient to use an internet search "WHATWG [term]" or "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now we'll get down to learning DOM, because the document plays the central role in the UI.
