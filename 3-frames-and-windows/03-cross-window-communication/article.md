# Communication entre les fenêtres

La politique "Same Origin" (même site) limite l'accès des fenêtres et des iframe les uns aux autres.

L'idée est que si un utilisateur a deux pages ouvertes : une de `john-smith.com`, et une autre de `gmail.com`, alors il ne voudra pas d'un script de `john-smith.com` pour lire son courrier de `gmail.com`. L'objectif de la politique "Same origin" est donc de protéger les utilisateurs contre le vol d'informations.

## Same Origin [#same-origin]

Deux URLs sont dites de "Same origin" si elles ont le mêmes protocole, domaine et port.

Ces URLs partagent toutes la même origine ("Same origin"):

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

Ce n'est pas le cas de celles ci:

- <code>http://<b>www.</b>site.com</code> (différent domaine: `www.` importe)
- <code>http://<b>site.org</b></code> (différent domaine: `.org` importe)
- <code><b>https://</b>site.com</code> (différent protocole: `https`)
- <code>http://site.com:<b>8080</b></code> (différent port: `8080`)

La politique "Same Origin" indique que:

- si nous avons une référence à une autre fenêtre, par exemple un popup créé par `window.open` ou une fenêtre à l'intérieur de `<iframe>`, et que cette fenêtre provient de la même origine, alors nous avons un accès complet à cette fenêtre.
- sinon, s'il provient d'une autre origine, alors nous ne pouvons pas accéder au contenu de cette fenêtre : variables, document, quoi que ce soit. La seule exception est la `location`:nous pouvons la modifier (et donc rediriger l'utilisateur). Mais nous ne pouvons pas *lire* la localisation (donc nous ne pouvons pas voir où se trouve l'utilisateur, pas de fuite d'information).

### En action: iframe

Une balise `<iframe>` héberge une fenêtre intégrée séparée, avec ses propres objets `document` et `window` séparés.

Nous pouvons y accèder en utilisant ces propriétés:

- `iframe.contentWindow` pour accèder à la fenêtre à l'intérieur de `<iframe>`.
- `iframe.contentDocument` pour accèder au document à l'intérieur de `<iframe>`, abréviation de `iframe.contentWindow.document`.

Lorsque nous accédons à quelque chose à l'intérieur de la fenêtre intégrée, le navigateur vérifie si l'iframe a la même origine. Si ce n'est pas le cas, l'accès est refusé  (`location` est une exception, c'est toujours autorisé).

Par exemple, essayons de lire et d'écrire dans un `<iframe>` d'une autre origine :

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // nous pouvons obtenir la référence de la fenêtre intérieure
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...mais pas du document à l'intérieur
*!*
      let doc = iframe.contentDocument; // ERREUR
*/!*
    } catch(e) {
      alert(e); // Erreur de sécurité (origine différente)
    }

    // Nous ne pouvons pas non plus LIRE l'URL de la page dans l'iframe
    try {
      // impossible de lire l'URL de l'objet Location
*!*
      let href = iframe.contentWindow.location.href; // ERREUR
*/!*
    } catch(e) {
      alert(e); // Erreur de sécurité
    }

    // ...nous pouvons ECRIRE dans l'objet Location (et ainsi charger quelque chose d'autre dans l'iframe)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // libère le gestionnaire, ne pas l'exécuter après le changement de Location
  };
</script>
```

Le code ci-dessus indique les erreurs pour toutes les opérations sauf:

- Obtenir la référence de la fenêtre intérieure `iframe.contentWindow` - c'est autorisé.
- Ecrire dans `location`.

Au contraire, si `<iframe>` possède la même origine, nous pouvons tout faire avec:

```html run
<!-- iframe venant du même site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // faites tout ce que vous voulez
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

```smart header="iframe.onload vs iframe.contentWindow.onload"
L'évènement `iframe.onload` (dans la balise `<iframe>`) est essentiellement la même chose que `iframe.contentWindow.onload` (sur l'objet fenêtre intégré). Il se déclenche lorsque la fenêtre intégrée se charge complètement avec toutes les ressources.

...Mais nous ne pouvons pas accéder à `iframe.contentWindow.onload` pour une iframe provenant d'une autre origine, donc il faut utiliser `iframe.onload`.
```

## Fenêtre en sous-domaine: document.domain

Par définition, deux URLs avec des domaines différents ont des origines différentes.

Mais si des fenêtres partagent le même domaine de second niveau, par exemple `john.site.com`, `peter.site.com` et `site.com` (de sorte que leur domaine de second niveau commun est `site.com`), nous pouvons faire en sorte que le navigateur ignore cette différence, afin qu'elles puissent être considérées comme provenant de la "même origine" pour utiliser la communication entre fenêtres.

Pour que cela fonctionne, chacune de ces fenêtres doit exécuter le code:

```js
document.domain = 'site.com';
```

C'est tout. Ils peuvent maintenant interagir sans limites. Encore une fois, cela n'est possible que pour les pages ayant le même domaine de second niveau.

```warn header="Obsolète, mais fonctionne toujours"
La propriété `document.domain` est en cours de suppression de la [spécification](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction). La messagerie inter-fenêtres (expliquée ci-dessous) est le remplacement suggéré.

Cela dit, actuellement tous les navigateurs le supportent. Et le support sera conservé pour l'avenir, pour ne pas casser l'ancien code qui repose sur `document.domain`.
```


## Iframe: le piège du mauvais document

Lorsqu'une iframe provient de la même origine, et que nous pouvons accéder à son  `document`, il y a un piège. Ce n'est pas lié à des questions d'origine croisée, mais il est important de le savoir.

Dès sa création, une iframe dispose immédiatement d'un document. Mais ce document est différent de celui qui s'y charge !

Donc, si nous faisons quelque chose avec le document immédiatement, il sera probablement perdu.

Voici par exemple:


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // le document chargé est différent du document initial !
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

Nous ne devrions pas travailler avec le document d'une iframe qui n'a pas finis de charger, car c'est le *mauvais document*. Si nous y plaçons des gestionnaires d'événements, ils seront ignorés.

Comment détecter le moment où le bon document est là ?

Le bon document est définitivement présent quand  `iframe.onload` se déclenche. Mais il ne se déclenche que lorsque toute l'iframe avec toutes les ressources est chargée.

Nous pouvons essayer de saisir le moment plus tôt en utilisant `setInterval`:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // toutes les 100ms on vérifie que le document est le nouveau
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("New document is here!");

    clearInterval(timer); // annule setInterval, nous n'en n'avons plus besoin
  }, 100);
</script>
```

## Collection: window.frames

Une autre façon d'obtenir l'objet fenêtre (window) de `<iframe>` -- est de l'obtenir à partir de la collection nommée `window.frames` :

- Par nombre: `window.frames[0]` -- l'objet fenêtre pour la première frame du document.
- Par nom: `window.frames.iframeName` -- l'objet fenêtre pour la frame avec  `name="iframeName"`.

Par exemple:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

Une iframe peut contenir d'autres iframes. Les objets `window` correspondants forment une hiérarchie.

Les liens de navigation sont:

- `window.frames` -- la collection de fenêtres "enfants" (pour les cadres emboîtés).
- `window.parent` -- la référence à la fenêtre "parent" (extérieure).
- `window.top` -- la référence à la fenêtre parentale la plus élevée.

Par exemple:

```js run
window.frames[0].parent === window; // true
```

Nous pouvons utiliser la propriété `top` pour vérifier si le document actuel est ouvert à l'intérieur d'un cadre ou non:

```js run
if (window == top) { // fenêtre actuelle == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## L'attribut iframe "sandbox"

L'attribut `sandbox` permet d'exclure certaines actions à l'intérieur d'une `<iframe>` afin d'empêcher l'exécution de code non fiable. Il "sandboxe" l'iframe en la traitant comme provenant d'une autre origine et/ou en lui appliquant d'autres limitations.

Il y a un "ensemble par défaut" de restrictions appliquées pour `<iframe sandbox src="...">`. Mais il peut être assoupli si nous fournissons une liste de restrictions séparées par des espaces qui ne doivent pas être appliquées comme valeur de l'attribut, comme ceci : `<iframe sandbox="allow-forms allow-popups">`.

En d'autres termes, un attribut `"sandbox"` vide pose les limites les plus strictes possibles, mais nous pouvons mettre une liste délimitée par des espaces de celles que nous voulons lever.

Voici la liste des limitations:

`allow-same-origin`
: Par défaut `"sandbox"` impose la politique des "origines différentes" pour l'iframe. En d'autres termes, elle oblige le navigateur à traiter l' `iframe` comme provenant d'une autre origine, même si sa `src`  pointe vers le même site. Avec toutes les restrictions implicites pour les scripts. Cette option supprime cette fonctionnalité.

`allow-top-navigation`
: Permet à l'`iframe` de changer `parent.location`.

`allow-forms`
: Permet de soumettre des formulaires à partir de l'`iframe`.

`allow-scripts`
: Permet d'exécuter des scripts à partir de l'`iframe`.

`allow-popups`
: Permet de `window.open` des pop-up depuis l'`iframe`

Voir [le manuel](mdn:/HTML/Element/iframe) pour plus de détails.

L'exemple ci-dessous montre une iframe en "sandbox" avec l'ensemble des restrictions par défaut : `<iframe sandbox src="...">`. Il contient du JavaScript et un formulaire.

Nous pouvons noter que rien ne fonctionne. Le réglage par défaut est donc très sévère :

[codetabs src="sandbox" height=140]


```smart
Le but de l'attribut `"sandbox"` est uniquement *d'ajouter* des restrictions. Il ne peut pas les supprimer. En particulier, il ne peut pas assouplir les restrictions de même origine si l'iframe provient d'une autre origine.
```

## Messagerie entre fenêtres

L'interface `postMessage` permet aux fenêtres de se parler, quelle que soit leur origine.

C'est donc un moyen de contourner la politique de "Same Origin"  Elle permet à une fenêtre de `john-smith.com` de parler à `gmail.com` et d'échanger des informations, mais seulement si les deux parties sont d'accord et appellent les fonctions JavaScript correspondantes. Cela rend le système sûr pour les utilisateurs.

L'interface comporte deux parties.

### postMessage

La fenêtre qui veut envoyer un message appelle la méthode [postMessage](mdn:api/Window.postMessage) de la fenêtre de réception. En d'autres termes, si nous voulons envoyer le message à `win`, nous devons appeler `win.postMessage(data, targetOrigin)`.

Arguments:

`data`
: Les données à envoyer. Peut être n'importe quel objet, les données sont clonées à l'aide de l'"algorithme de clonage structuré". IE ne supporte que les chaînes de caractères, nous devrions donc `JSON.stringify` des objets complexes pour ce navigateur.


`targetOrigin`
: Spécifie l'origine de la fenêtre cible, de sorte que seule une fenêtre de l'origine donnée recevra le message.

<<<<<<< HEAD
Le `targetOrigin` est une mesure de sécurité. Rappelez-vous que si la fenêtre cible provient d'une autre origine, nous ne pouvons pas lire sa `location` dans la fenêtre de l'expéditeur. Nous ne pouvons donc pas savoir quel site est ouvert dans la fenêtre cible à l'heure actuelle : l'utilisateur pourrait naviguer ailleurs, et la fenêtre émettrice n'en aurais aucune idée.
=======
The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read its `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

En spécifiant `targetOrigin` , on s'assure que la fenêtre ne reçoit les données que si elle se trouve toujours au bon endroit. C'est important lorsque les données sont sensibles.

Par exemple, ici `win` ne recevra le message que s'il possède un document de l'origine `http://example.com` :

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

Si nous ne voulons pas de ce contrôle, nous pouvons régler `targetOrigin` sur `*`.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

Pour recevoir un message, la fenêtre cible doit avoir un gestionnaire sur l'événement `message`.  Il se déclenche lorsque `postMessage` est appelé (et que la vérification `targetOrigin` est réussie).

L'objet de l'événement a des propriétés particulières :

`data`
: Les données de `postMessage`.

`origin`
: L'origine de l'expéditeur, par exemple `http://javascript.info`.

`source`
: La référence à la fenêtre de l'expéditeur. Nous pouvons immédiatement faire revenir `source.postMessage(...)` si nous le voulons.

Pour assigner ce gestionnaire, nous devrions utiliser `addEventListener`, la courte syntaxe `window.onmessage` ne fonctionne pas.

Voici un exemple:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // quelque chose d'un domaine inconnu, ignorons-le
    return;
  }

  alert( "received: " + event.data );

  // peut envoyer un message en retour en utilisant event.source.postMessage(...)
});
```

L'exemple complet:

[codetabs src="postmessage" height=120]

## Résumé

Pour appeler des méthodes et accéder au contenu d'une autre fenêtre, nous devons d'abord en avoir une référence.

Pour les pop-ups, nous avons ces références:
- De la fenêtre ouvrante : `window.open` -- ouvre une nouvelle fenêtre et renvoie une référence à celle-ci,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.

Pour les iframes, nous pouvons accéder aux fenêtres parents/enfants en utilisant :
- `window.frames` -- une collection d'objets de fenêtres emboîtées,
- `window.parent`, `window.top` sont les références aux fenêtres parents et supérieures,
- `iframe.contentWindow` est la fenêtre à l'intérieur d'une balise `<iframe>` .

Si les fenêtres partagent la même origine (hôte, port, protocole), alors les fenêtres peuvent faire ce qu'elles veulent les unes avec les autres.

Sinon, les seules actions possibles sont:
- Modifier la `location` d'une autre fenêtre (accès en écriture uniquement)..
- Poster un message.

Les exceptions sont:
-  Les fenêtres qui partagent le même domaine de second niveau : `a.site.com` et `b.site.com`. Le fait de mettre `document.domain='site.com'` dans les deux les met dans l'état "same origin".
- Si une iframe possède un attribut `sandbox` elle est mise de force dans l'état "different origin" à moins que la valeur de l'attribut ne spécifie `allow-same-origin`. Cela peut être utilisé pour exécuter du code non fiable dans les iframes du même site.

L'interface `postMessage` permet à deux fenêtres, quelle que soit leur origine, de dialoguer:

1. L'expéditeur appelle `targetWin.postMessage(data, targetOrigin)`.
2. Si `targetOrigin` n'est pas `'*'`, alors le navigateur vérifie si la fenêtre `targetWin` possède l'origine `targetOrigin`.
3. Si c'est le cas, alors `targetWin` déclenche l'événement `message` avec des propriétés spéciales:
    - `origin` -- l'origine de la fenêtre de l'expéditeur (comme `http://my.site.com`)
    - `source` -- la référence à la fenêtre de l'expéditeur.
    - `data` -- les données, tout objet partout sauf dans IE qui ne supporte que des chaînes de caractères.

    Nous devrions utiliser `addEventListener` pour définir le gestionnaire de cet événement à l'intérieur de la fenêtre cible.
