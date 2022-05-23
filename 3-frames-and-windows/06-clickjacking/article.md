# L'attaque par clickjacking

L'attaque par "clickjacking" permet à une page malveillante de cliquer sur un "site victime" *au nom du visiteur*.

De nombreux sites ont été piratés de cette manière, notamment Twitter, Facebook, Paypal et d'autres sites. Ils ont tous été réparés, bien sûr.

## L'idée

L'idée est très simple.

Voici comment le clickjacking a été fait avec Facebook:

1. Un visiteur est attiré vers la page malveillante. Peu importe comment.
2. La page contient un lien inoffensif (du type "enrichissez-vous maintenant" ou "cliquez ici, très drôle").
3. Au-dessus de ce lien, la page maléfique place un `<iframe>` transparent avec `src` de facebook.com, de telle sorte que le bouton "J'aime" se trouve juste au-dessus de ce lien. Habituellement, cela se fait avec `z-index`.
4. En essayant de cliquer sur le lien, le visiteur clique en fait sur le bouton.

## La démo

Voici à quoi ressemble la page malveillante. Pour que les choses soient claires, le `<iframe>` est semi-transparent (dans les vraies pages maléfiques, il est totalement transparent):

```html run height=120 no-beautify
<style>
iframe { /* iframe du site de la victime */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* en réalité opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Click to get rich now:</div>

<!-- L'url du site de la victime -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Click here!</button>
*/!*

<div>...And you're cool (I'm a cool hacker actually)!</div>
```

La démo complète de l'attaque:

[codetabs src="clickjacking-visible" height=160]

Ici, nous avons un `<iframe src="facebook.html">` semi-transparent, et dans l'exemple, nous pouvons le voir planer au-dessus du bouton. En cliquant sur le bouton, on clique en fait sur l'iframe, mais l'utilisateur ne le voit pas, car l'iframe est transparent.

Par conséquent, si le visiteur est connecté sur Facebook (l'option "Se souvenir de moi" est généralement activée), un bouton "J'aime" est ajouté. Sur Twitter, ce serait un bouton "Suivre".

Voici le même exemple, mais plus proche de la réalité, avec `opacity:0` pour `<iframe>`:

[codetabs src="clickjacking" height=160]

Tout ce dont nous avons besoin pour attaquer -- c'est de positionner le `<iframe>` sur la page malveillante de manière à ce que le bouton soit juste au-dessus du lien. Ainsi, lorsqu'un utilisateur clique sur le lien, il clique en fait sur le bouton. C'est généralement faisable avec CSS.

```smart header="Le clickjacking est pour les clics, pas pour le clavier"
L'attaque n'affecte que les actions de la souris (ou des actions similaires, comme les tapotements sur les mobiles).

La saisie au clavier est très difficile à rediriger. Techniquement, si nous avons un champ de texte à pirater, nous pouvons alors positionner un iframe de telle sorte que les champs de texte se chevauchent. Ainsi, lorsqu'un visiteur essaie de se concentrer sur la saisie qu'il voit sur la page, il se concentre en fait sur la saisie à l'intérieur de l'iframe.

Mais il y a un problème. Tout ce que le visiteur tape sera caché, car l'iframe n'est pas visible.

Les gens s'arrêtent généralement de taper lorsqu'ils ne voient pas leurs nouveaux caractères s'imprimer à l'écran.
```

## Défenses de la vieille école (faibles)

La défense la plus ancienne est un bout de JavaScript qui interdit l'ouverture de la page dans un iframe (ce qu'on appelle le "framebusting").

Cela ressemble à ceci:

```js
if (top != window) {
  top.location = window.location;
}
```

C'est-à-dire que si la fenêtre découvre qu'elle n'est pas en haut, elle se met automatiquement en haut.

Ce n'est pas une défense fiable, car il existe de nombreuses façons de la contourner. En voici quelques-unes.

### Blocage de la navigation supérieure

Nous pouvons bloquer la transition provoquée par le changement de `top.location` dans l'événement [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload).

La page du haut (appartenant au pirate) lui attribue un événement de prévention, comme ceci:

```js
window.onbeforeunload = function() {
  return false;
};
```

Lorsque le `iframe` essaie de changer `top.location`, le visiteur reçoit un message lui demandant s'il veut quitter le site.

Dans la plupart des cas, le visiteur répondra négativement parce qu'il ne connaît pas l'iframe - tout ce qu'il peut voir est la page d'accueil, il n'a aucune raison de la quitter. Donc `top.location` ne changera pas!

En action:

[codetabs src="top-location"]

### L'attribut Sandbox

L'une des choses limitées par l'attribut `sandbox` est la navigation. Une iframe protégée par un sandbox ne peut pas modifier l'attribut `top.location`.

Nous pouvons donc ajouter l'iframe avec `sandbox="allow-scripts allow-forms"`. Cela assouplirait les restrictions, autorisant les scripts et les formulaires. Mais nous omettons `allow-top-navigation` pour que la modification de `top.location` soit interdite.

Voici le code:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Il existe également d'autres moyens de contourner cette simple protection.

## X-Frame-Options

L'en-tête `X-Frame-Options` côté serveur peut autoriser ou interdire l'affichage de la page dans un iframe.

Il doit être envoyé exactement comme un en-tête HTTP : le navigateur l'ignorera s'il se trouve dans la balise HTML `<meta>`. Ainsi, `<meta http-equiv="X-Frame-Options"...>` ne fera rien.

L'en-tête peut avoir 3 valeurs:


`DENY`
: Ne jamais afficher la page à l'intérieur d'un iframe.

`SAMEORIGIN`
: Autoriser à l'intérieur d'un iframe si le document parent a la même origine..

`ALLOW-FROM domain`
: Autoriser à l'intérieur d'un iframe si le document parent appartient au domaine donné..

Par exemple, Twitter utilise `X-Frame-Options: SAMEORIGIN`.

````online
Voici le résultat:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Selon votre navigateur, le `iframe` ci-dessus est soit vide, soit vous avertit que le navigateur ne permet pas de naviguer sur cette page de cette manière.
````

## Affichage de la fonctionnalité désactivée

<<<<<<< HEAD
L'en-tête `X-Frame-Options` a un effet secondaire. Les autres sites ne pourront pas afficher notre page dans un iframe, même s'ils ont de bonnes raisons de le faire.
=======
The `X-Frame-Options` header has a side effect. Other sites won't be able to show our page in a frame, even if they have good reasons to do so.
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e

Il existe donc d'autres solutions... Par exemple, on peut "couvrir" la page avec une `<div>` avec les styles `height : 100% ; width : 100%;`, pour qu'elle intercepte tous les clics. Cette `<div>` doit être retirée si `window == top` ou si l'on s'aperçoit que l'on n'a pas besoin de cette protection.

Quelque chose comme ça:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // il y aura une erreur si la fenêtre supérieure est d'une origine différente
  // mais c'est bon ici
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

La démo:

[codetabs src="protector"]

## Attribut de cookie "samesite"

L'attribut de cookie `samesite` peut également prévenir les attaques de clickjacking.

Un cookie avec un tel attribut n'est envoyé à un site web que s'il est ouvert directement, et non par l'intermédiaire d'un iframe ou autre. Plus d'informations dans le chapitre <info:cookie#samesite>.

Si le site, tel que Facebook, avait l'attribut `samesite` dans son cookie d'authentification, comme ceci:

```
Set-Cookie: authorization=secret; samesite
```

...Ce cookie ne serait donc pas envoyé lorsque Facebook est ouvert dans une iframe depuis un autre site. Donc l'attaque échoue.

L'attribut de cookie `samesite` n'aura pas d'effet lorsque les cookies ne sont pas utilisés. Cela peut permettre à d'autres sites Web d'afficher facilement nos pages publiques, non authentifiées, dans des iframes.

Toutefois, cela peut également permettre aux attaques par détournement de clics de fonctionner dans quelques cas limités. Un site Web de vote anonyme qui empêche les doubles votes en vérifiant les adresses IP, par exemple, serait toujours vulnérable au détournement de clics parce qu'il n'authentifie pas les utilisateurs à l'aide de cookies.

## Résumé

Le détournement de clics est un moyen de "tromper" les utilisateurs en les incitant à cliquer sur un site victime sans même savoir ce qui se passe. C'est dangereux s'il y a des actions importantes activées par le clic.

Un hacker peut poster un lien vers sa page malveillante dans un message, ou attirer les visiteurs sur sa page par d'autres moyens. Il existe de nombreuses variantes.

D'un certain point de vue, l'attaque n'est "pas profonde" : le pirate ne fait qu'intercepter un seul clic. Mais d'un autre point de vue, si le pirate sait qu'après le clic, un autre contrôle apparaîtra, il peut utiliser des messages astucieux pour contraindre l'utilisateur à cliquer également sur ces contrôles.

Cette attaque est assez dangereuse, car lorsque nous concevons l'interface utilisateur, nous ne prévoyons généralement pas qu'un pirate puisse cliquer au nom du visiteur. Les vulnérabilités peuvent donc se trouver dans des endroits totalement inattendus.

- Il est recommandé d'utiliser `X-Frame-Options : SAMEORIGIN` sur les pages (ou les sites entiers) qui ne sont pas destinées à être affichées dans des iframes.
- Utilisez une couverture `<div>` si nous voulons permettre à nos pages d'être affichées dans des iframes, tout en restant sécurisées.
