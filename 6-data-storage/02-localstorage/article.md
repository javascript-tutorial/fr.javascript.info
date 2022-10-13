# LocalStorage, sessionStorage

Les objets de stockage Web `localStorage` et `sessionStorage` permettent d'enregistrer les paires clé/valeur dans le navigateur.

Ce qui est intéressant à leur sujet, c'est que les données survivent à une actualisation de la page (pour `sessionStorage`) et même à un redémarrage complet du navigateur (pour `localStorage`). Nous verrons cela très bientôt.

Nous avons déjà des cookies. Pourquoi des objets supplémentaires ?

- Contrairement aux cookies, les objets de stockage Web ne sont pas envoyés au serveur à chaque requête. Grâce à cela, nous pouvons stocker beaucoup plus. La plupart des navigateurs autorisent au moins 2 mégaoctets de données (ou plus) et ont des paramètres pour configurer cela.
- Contrairement aux cookies également, le serveur ne peut pas manipuler les objets de stockage via les en-têtes HTTP. Tout se fait en JavaScript.
- Le stockage est lié à l'origine (triplet domaine/protocole/port). Autrement dit, différents protocoles ou sous-domaines impliquent différents objets de stockage, ils ne peuvent pas accéder aux données les uns des autres.

Les deux objets de stockage fournissent les mêmes méthodes et propriétés :

- `setItem(key, value)` -- stocke la paire clé/valeur.
- `getItem(key)` -- récupère la valeur par clé.
- `removeItem(key)` -- supprime la clé avec sa valeur.
- `clear()` -- supprime tout.
- `key(index)` -- récupère la clé sur une position donnée.
- `length` -- le nombre d'éléments stockés.

Comme vous pouvez le voir, c'est comme une collection `Map` (`setItem/getItem/removeItem`), mais permet également l'accès par index avec `key(index)`.

Voyons voir comment ça fonctionne.

## Démo localStorage

Les principales caractéristiques de `localStorage` sont les suivantes :

- Partagé entre tous les onglets et fenêtres d'une même origine.
- Les données n'expirent pas. Il reste après le redémarrage du navigateur et même le redémarrage du système d'exploitation.

Par exemple, si vous exécutez ce code...

```js run
localStorage.setItem('test', 1);
```

...Et fermez/ouvrez le navigateur ou ouvrez simplement la même page dans une autre fenêtre, alors vous pouvez l'obtenir comme ceci :

```js run
alert( localStorage.getItem('test') ); // 1
```

Il suffit d'être sur la même origine (domaine/port/protocole), le chemin de l'url peut être différent.

Le `localStorage` est partagé entre toutes les fenêtres avec la même origine, donc si nous définissons les données dans une fenêtre, le changement devient visible dans une autre.

## Accès de type objet

Nous pouvons également utiliser un objet simple pour obtenir/définir des clés, comme ceci :

```js run
// définir la clé
localStorage.test = 2;

// obtenir la clé
alert( localStorage.test ); // 2

// supprimer clé
delete localStorage.test;
```

C'est autorisé pour des raisons historiques, et fonctionne plus ou moins, mais généralement déconseillé, car :

1. Si la clé est générée par l'utilisateur, elle peut être n'importe quoi, comme `length` ou `toString`, ou une autre méthode intégrée de `localStorage`. Dans ce cas, `getItem/setItem` fonctionne correctement, tandis que l'accès de type objet échoue :

   ```js run
   let key = 'length';
   localStorage[key] = 5; // Erreur, impossible d'attribuer 'length'
   ```

2. Il y a un événement `storage`, il se déclenche lorsque nous modifions les données. Cet événement ne se produit pas pour un accès de type objet. Nous verrons cela plus loin dans ce chapitre.

## Boucle sur les clés

Comme nous l'avons vu, les méthodes fournissent la fonctionnalité "get/set/remove by key". Mais comment obtenir toutes les valeurs ou clés enregistrées ?

Malheureusement, les objets de stockage ne sont pas itérables.

Une façon consiste à boucler sur eux comme sur un tableau :

```js run
for (let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Une autre façon consiste à utiliser la boucle `for key in localStorage`, comme nous le faisons avec des objets normaux.

Il itère sur les clés, mais génère également quelques champs intégrés dont nous n'avons pas besoin :

```js run
// mauvais essai
for(let key in localStorage) {
  alert(key); // affiche getItem, setItem et d'autres éléments intégrés
}
```

...Nous devons donc soit filtrer les champs du prototype avec la vérification `hasOwnProperty` :

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // sauter des clés comme "setItem", "getItem" etc.
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

...Ou récupérez simplement les clés "propres" avec `Object.keys`, puis bouclez-les si nécessaire :

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Ce dernier fonctionne, car `Object.keys` ne renvoie que les clés appartenant à l'objet, en ignorant le prototype.

## Chaînes uniquement

Veuillez noter que la clé et la valeur doivent être des chaînes.

S'il s'agissait d'un autre type, comme un nombre ou un objet, il est automatiquement converti en chaîne :

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

We can use `JSON` to store objects though:

```js run
localStorage.user = JSON.stringify({name: "John"});

// un peu plus tard
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

Il est également possible de transformer en chaîne l'ensemble de l'objet de stockage, par ex. à des fins de débogage :

```js run
// ajout d'options de formatage à JSON.stringify pour rendre l'objet plus beau
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

L'objet `sessionStorage` est beaucoup moins utilisé que `localStorage`.

Les propriétés et les méthodes sont les mêmes, mais c'est beaucoup plus limité :

- Le `sessionStorage` n'existe que dans l'onglet actuel du navigateur.
  - Un autre onglet avec la même page aura un stockage différent.
  - Mais il est partagé entre les iframes du même onglet (en supposant qu'ils proviennent de la même origine).
- Les données survivent à l'actualisation de la page, mais pas à la fermeture/ouverture de l'onglet.

Voyons cela en action.

Exécutez ce code...

```js run
sessionStorage.setItem('test', 1);
```

...Puis actualisez la page. Maintenant, vous pouvez toujours obtenir les données :

```js run
alert( sessionStorage.getItem('test') ); // après rafraîchissement : 1
```

...Mais si vous ouvrez la même page dans un autre onglet et réessayez, le code ci-dessus renvoie `null`, ce qui signifie "rien trouvé".

C'est exactement parce que `sessionStorage` est lié non seulement à l'origine, mais également à l'onglet du navigateur. Pour cette raison, `sessionStorage` est utilisé avec parcimonie.

## Événement de stockage

Lorsque les données sont mises à jour dans `localStorage` ou `sessionStorage`, l'événement [storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) se déclenche, avec les propriétés :

- `key` – la clé qui a été changée (`null` si `.clear()` est appelé).
- `oldValue` - l'ancienne valeur (`null` si la clé vient d'être ajoutée).
- `newValue` - la nouvelle valeur (`null` si la clé est supprimée).
- `url` - l'url du document où la mise à jour s'est produite.
- `storageArea` - objet `localStorage` ou `sessionStorage` où la mise à jour s'est produite.

L'important est que l'événement se déclenche sur tous les objets `window` où le stockage est accessible, sauf celui qui l'a provoqué.

Élaborons.

Imaginez, vous avez deux fenêtres avec le même site dans chacune. Donc `localStorage` est partagé entre eux.

```en ligne
Vous pouvez ouvrir cette page dans deux fenêtres de navigateur pour tester le code ci-dessous.
```

Si les deux fenêtres écoutent `window.onstorage`, chacune réagira aux mises à jour qui se sont produites dans l'autre.

```js run
// se déclenche sur les mises à jour effectuées sur le même stockage à partir d'autres documents
window.onstorage = (event) => {
  // peut également utiliser window.addEventListener('storage', event => {
  if (event.key != "now") return;
  alert(event.key + ":" + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

Veuillez noter que l'événement contient également : `event.url` -- l'url du document où les données ont été mises à jour.

De plus, `event.storageArea` contient l'objet de stockage -- l'événement est le même pour `sessionStorage` et `localStorage`, donc `event.storageArea` fait référence à celui qui a été modifié. On peut même vouloir y remettre quelque chose, "répondre" à un changement.

**Cela permet à différentes fenêtres d'une même origine d'échanger des messages.**

Les navigateurs modernes prennent également en charge [Broadcast channel API](mdn:/api/Broadcast_Channel_API), l'API spéciale pour la communication inter-fenêtre de même origine, elle est plus complète, mais moins prise en charge. Il existe des bibliothèques qui polyfill cette API, basée sur `localStorage`, qui la rendent disponible partout.

## Résumé

Les objets de stockage Web `localStorage` et `sessionStorage` permettent de stocker des paires clé/valeur dans le navigateur.

- `clé` et `valeur` doivent être des chaînes.
- La limite est de 5mb+, dépend du navigateur.
- Ils n'expirent pas.
- Les données sont liées à l'origine (domaine/port/protocole).

| `localStorage`                                             | `sessionStorage`                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Partagé entre tous les onglets et fenêtres de même origine | Visible dans un onglet de navigateur, y compris les iframes de la même origine |
| Survit au redémarrage du navigateur                        | Survit à l'actualisation de la page (mais pas à la fermeture de l'onglet)      |

API :

- `setItem(key, value)` -- stocke la paire clé/valeur.
- `getItem(key)` -- récupère la valeur par clé.
- `removeItem(key)` -- supprime la clé avec sa valeur.
- `clear()` -- supprime tout.
- `key(index)` -- récupère la clé sur une position donnée.
- `length` -- le nombre d'éléments stockés.
- Utilisez `Object.keys` pour obtenir toutes les clés.
- Nous accédons aux clés en tant que propriétés d'objet, dans ce cas l'événement `storage` n'est pas déclenché.

Événement de stockage :

- Se déclenche sur les appels `setItem`, `removeItem`, `clear`.
- Contient toutes les données sur l'opération (`key/oldValue/newValue`), le document `url` et l'objet de stockage `storageArea`.
- Se déclenche sur tous les objets `window` qui ont accès au stockage sauf celui qui l'a généré (dans un onglet pour `sessionStorage`, globalement pour `localStorage`).
