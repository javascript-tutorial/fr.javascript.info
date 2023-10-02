
Tout d'abord, nous devons trouver toutes les références externes.

Il y a deux façons.

La première consiste à trouver tous les liens à l'aide de `document.querySelectorAll('a')` puis à filtrer ce dont nous avons besoin :

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // pas d'attribut

  if (!href.includes('://')) continue; // pas de protocol

  if (href.startsWith('http://internal.com')) continue; // interne

  link.style.color = 'orange';
}
```

Veuillez noter: nous utilisons `link.getAttribute('href')`.
Pas `link.href`, car nous avons besoin de la valeur HTML.

...
Un autre moyen plus simple serait d'ajouter les contrôles au sélecteur CSS :

```js
// recherchez tous les liens qui ont :// dans href
// mais href ne commence pas par http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
