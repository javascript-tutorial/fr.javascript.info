
# Les objets URL

La classe d'[URL](https://url.spec.whatwg.org/#api) intégrée fournit une interface pratique pour créer et analyser des URL.

Il n'y a pas de méthodes de mise en réseau qui nécessitent exactement un objet `URL`, les chaînes de caractères sont assez bonnes. Donc, techniquement, nous n'avons pas à utiliser `URL`. Mais parfois, cela peut être très utile.

## Création d'une URL

La syntaxe pour créer un nouvel objet `URL` :

```js
new URL(url, [base])
```

- **`url`** -- l'URL complète ou le seul chemin (si la base est définie, voir ci-dessous),
- **`base`** -- une URL de base facultative : si définie et que l'argument `url` n'a que le chemin, l'URL est générée par rapport à la `base`.

Par exemple :

```js
let url = new URL('https://javascript.info/profile/admin');
```

Ces deux URL sont identiques :

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Nous pouvons facilement créer une nouvelle URL basée sur le chemin d'accès par rapport à une URL existante :

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

L'objet `URL` nous permet immédiatement d'accéder à ses composants, c'est donc une bonne façon d'analyser l'url, par exemple :

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Voici le cheatsheet pour les composants URL :

![](url-object.svg)

- `href` est l'URL complète, identique à `url.toString()`
- `protocol` se termine par le caractère deux-points `:`
- `search` - une chaîne de caractères de paramètres, commence par le point d'interrogation `?`
- `hash` commence par le caractère de hachage `#`
- il peut y avoir aussi les propriétés `user` et `password` si l'authentification HTTP est présente : `http://login:password@site.com` (pas expliqué ci-dessus, très peu utilisé)


```smart header="Nous pouvons passer des objets `URL` aux méthodes de mise en réseau (et à la plupart des autres) au lieu d'une chaîne de caractères"
Nous pouvons utiliser un objet `URL` dans `fetch` ou `XMLHttpRequest`, presque partout où une chaîne de caractères URL est attendue.

<<<<<<< HEAD
Généralement, l'objet `URL` peut être passé à n'importe quelle méthode au lieu d'une chaîne de caractères, car la plupart des méthodes effectueront la conversion de chaîne de caractères, qui transforme un objet `URL` en une chaîne de caractères avec une URL complète.
=======
Generally, the `URL` object can be passed to any method instead of a string, as most methods will perform the string conversion, that turns a `URL` object into a string with full URL.
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
```

## SearchParams "?..."

Disons que nous voulons créer une URL avec des paramètres de recherche donnés, par exemple `https://google.com/search?query=JavaScript`.

Nous pouvons les fournir dans la chaîne de caractères URL :

```js
new URL('https://google.com/search?query=JavaScript')
```

… Mais les paramètres doivent être encodés s'ils contiennent des espaces, des lettres non latines, etc. (plus à ce sujet ci-dessous).

<<<<<<< HEAD
Il y a donc une propriété URL pour cela : `url.searchParams`, un objet de type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).
=======
So there's a URL property for that: `url.searchParams`, an object of type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

Elle fournit des méthodes pratiques pour les paramètres de recherche :

- **`append(name, value)`** -- ajouter le paramètre par `name`,
- **`delete(name)`** -- supprime le paramètre par `name`,
- **`get(name)`** -- obtenir le paramètre par `name`,
- **`getAll(name)`** -- obtient tous les paramètres avec le même `name` (c'est possible, par exemple `?user=John&user=Pete`),
- **`has(name)`** -- vérifie l'existence du paramètre par `name`,
- **`set(name, value)`** -- défini/remplace le paramètre,
- **`sort()`** -- trie les paramètres par nom, rarement nécessaire,
- … et elle est également itérable, semblable à `Map`.

Un exemple avec des paramètres contenant des espaces et des signes de ponctuation :

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // paramètre ajouté avec un espace et !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // paramètre ajouté avec deux points :

// les paramètres sont automatiquement encodés
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// itérer sur les paramètres de recherche (décodés)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, ensuite tbs=qdr:y
}
```


## Encodage

Il y a une norme [RFC3986](https://tools.ietf.org/html/rfc3986) qui définit quels caractères sont autorisés dans les URL et lesquels ne le sont pas.

Ceux qui ne sont pas autorisés doivent être encodés, par exemple les lettres et les espaces non latins - remplacés par leurs codes UTF-8, préfixés par `%`, tels que `%20` (un espace peut être encodé par `+`, pour des raisons historiques, mais c'est une exception).

La bonne nouvelle est que les objets `URL` gèrent tout cela automatiquement. Nous fournissons simplement tous les paramètres non codés, puis convertissons l'URL en chaîne de caractères :

```js run
// en utilisant des caractères cyrilliques pour cet exemple

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

Comme vous pouvez le voir, `Тест` dans le chemin de l'url et `ъ` dans le paramètre sont encodés.

L'URL est devenue plus longue, car chaque lettre cyrillique est représentée avec deux octets en UTF-8, il y a donc deux entités `%..`.

### Encodage de chaîne de caractères

Autrefois, avant que les objets `URL` n'apparaissent, les gens utilisaient des chaînes de caractères pour les URL.

Pour l'instant, les objets `URL` sont souvent plus pratiques, mais les chaînes de caractères peuvent toujours être utilisées également. Dans de nombreux cas, l'utilisation d'une chaîne de caractères raccourcit le code.

Si nous utilisons une chaîne de caractères, nous devons encoder/décoder les caractères spéciaux manuellement.

Il existe des fonctions intégrées pour cela :

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - encode l'URL dans son ensemble.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - la décode de nouveau.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - encode un composant URL, tel qu'un paramètre de recherche, un hachage ou un chemin d'accès.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - la décode de nouveau.

Une question naturelle est: "Quelle est la différence entre `encodeURIComponent` et `encodeURI` ? Quand devrions-nous utiliser l'une ou l'autre ?"

C'est facile à comprendre si nous regardons l'URL, qui est divisée en composants dans l'image ci-dessus :

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Comme nous pouvons le voir, les caractères tels que `:`, `?`, `=`, `&`, `#` sont autorisés dans l'URL.

… D'un autre côté, si nous regardons un seul composant URL, tel qu'un paramètre de recherche, ces caractères doivent être encodés, pour ne pas casser la mise en forme.

- `encodeURI` encode uniquement les caractères totalement interdits dans l'URL.
- `encodeURIComponent` encode les mêmes caractères et, en plus d'eux, les caractères `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` et `@`.

Donc, pour une URL entière, nous pouvons utiliser `encodeURI` :

```js run
// en utilisant des caractères cyrilliques dans le chemin de l'url
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

… Alors que pour les paramètres d'URL, nous devrions plutôt utiliser `encodeURIComponent` :

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Comparons-le avec `encodeURI` :

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Comme nous pouvons le voir, `encodeURI` n'encode pas `&`, car il s'agit d'un caractère légitime dans l'URL.

Mais nous devons encoder `&` à l'intérieur d'un paramètre de recherche, sinon, nous obtenons `q=Rock&Roll` - qui est en fait `q=Rock` plus un paramètre obscur `Roll`. Pas comme prévu.

Nous devons donc utiliser uniquement `encodeURIComponent` pour chaque paramètre de recherche, pour l'insérer correctement dans la chaîne de caractères URL. Le plus sûr est d'encoder à la fois le nom et la valeur, à moins que nous ne soyons absolument sûrs qu'il n'a que des caractères autorisés.

````smart header="Différence d'encodage par rapport à `URL`"
Les classes [URL](https://url.spec.whatwg.org/#url-class) et [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) sont basés sur la dernière spécification d'URI : [RFC3986](https://tools.ietf.org/html/rfc3986), tandis que les fonctions `encode*` sont basées sur la version obsolète [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

<<<<<<< HEAD
Il y a peu de différences, par exemple, Les adresses IPv6 sont encodées différemment :
=======
There are a few differences, e.g. IPv6 addresses are encoded differently:
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

```js run
// URL valide avec adresse IPv6
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Comme nous pouvons le voir, `encodeURI` a remplacé les crochets `[...]`, ce qui n'est pas correct, la raison est que les URL IPv6 n'existaient pas au moment de la RFC2396 (août 1998).

De tels cas sont rares, les fonctions `encode*` fonctionnent bien la plupart du temps.
````
