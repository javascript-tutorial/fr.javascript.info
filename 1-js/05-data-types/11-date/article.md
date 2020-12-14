# Date et Temps

Faisons connaissance avec un nouvel objet intégré: [Date](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date). il stocke la date, l'heure et fournit des méthodes pour la gestion de la date / heure.

Par exemple, nous pouvons l'utiliser pour enregistrer les heures de création / modification, pour mesurer l'heure ou simplement pour imprimer la date du jour.

## Creation

Pour créer un nouvel objet `Date`, appelez `new Date ()` avec l'un des arguments suivants:

`new Date()`
: Sans arguments - crée un objet `Date` pour la date et l'heure actuelles.

    ```js run
    let now = new Date();
    alert( now ); // affiche la date/heure actuelle
    ```

`new Date(millisecondes)`
: Crée un objet `Date` avec l'heure correspondant au nombre de millisecondes (1/1000 de seconde) écoulée après le 1er janvier 1970 UTC.

    ```js run
    // 0 signifie 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // maintenant, ajoutez 24 heures, cela devient 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Un nombre entier représentant le nombre de millisecondes écoulées depuis le début de 1970 est appelé un *timestamp* (horodatage).

    C’est une représentation numérique d’une date. Nous pouvons toujours créer une date à partir d'un *horodatage* à l'aide de `new Date (*horodatage*)` et convertir l'objet `Date` existant en un *horodatage* à l'aide de la méthode `date.getTime ()` (voir ci-dessous).

    Les dates antérieures au 01.01.1970 ont des horodatages négatifs, par exemple :
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: S'il existe un seul argument, et qu'il s'agit d'une chaîne, il est automatiquement analysé. L'algorithme est le même que celui utilisé par `Date.parse`, nous le couvrirons plus tard.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // La partie heure de la date est supposée être minuit GMT et
    // est ajusté en fonction du fuseau horaire dans lequel le code est exécuté
    // Donc, le résultat pourrait être
    // jeu. 26 janv. 2017 11:00:00 GMT + 1100 (heure avancée de l'Est)
    // ou
    // mer. 25 janv. 2017 16:00:00 GMT-0800 (Heure standard du Pacifique)
    ```

`new Date(année, mois, date, heures, minutes, secondes, ms)`
: Crée la date avec les composants donnés dans le fuseau horaire local. Seul le premier argument est obligatoire.

    Note:

    - l'`année` doit comporter 4 chiffres: `2013` c'est bon, `98` ne l'est pas.
    - le `mois` commence par `0` (Jan), jusqu'à `11` (Dec).
    - la `date` est en fait le jour du mois, s'il est absent cela deviendra `1` par défaut.
    - si `heures/minutes/secondes/ms` sont absentes, elles sont par défaut égales à `0`.

    Par exemple:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // la même chose car les heures etc sont égales à 0 par défaut
    ```

    La précision maximale est de 1 ms (1/1000 sec):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Composants de date d'accès

Il existe de nombreuses méthodes pour accéder à l'année, au mois, etc. à partir de l'objet Date.

[getFullYear()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getFullYear)
: Obtenir l'année (4 chiffres)

[getMonth()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getMonth)
: Obtenir le mois, **de 0 à 11**.

[getDate()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getDate)
: Obtenir le jour du mois, de 1 à 31.

[getHours()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getHours), [getMinutes()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getMinutes), [getSeconds()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getSeconds), [getMilliseconds()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getMilliseconds)
: Obtenir l'heures / les minutes / les secondes / les millisecondes.

```warn header="Not `getYear()`, but `getFullYear()`"
De nombreux moteurs JavaScript implémentent une méthode non standard `getYear()`. Cette méthode est obsolète. Il retourne parfois l'année à 2 chiffres. S'il vous plaît ne l'utilisez jamais. Il y a `getFullYear()` pour l'année.
```

De plus, nous pouvons obtenir un jour de la semaine:

[getDay()](mdn:js/Date/getDay)
: Obtenir le jour de la semaine, de `0` (dimanche) à `6` (samedi). Le premier jour est toujours le dimanche, dans certains pays ce n’est pas le cas, mais ça ne peut pas être changé.

**Toutes les méthodes ci-dessus renvoient les composants par rapport au fuseau horaire local.**

Il existe également leurs homologues UTC, qui renvoient jour, mois, année, etc. pour le fuseau horaire UTC + 0: [getUTCFullYear()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getUTCFullYear), [getUTCMonth()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getUTCMonth), [getUTCDay()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getUTCDay). Il suffit d'insérer le `UTC` juste après `get`.

Si votre fuseau horaire local est décalé par rapport à UTC, le code ci-dessous indique différentes heures:

```js run
// date actuel
let date = new Date();

// l'heure dans votre fuseau horaire actuel
alert( date.getHours() );

// l'heure dans le fuseau horaire UTC + 0 (heure de Londres sans heure avancée)
alert( date.getUTCHours() );
```

Outre les méthodes indiquées, il existe deux méthodes spéciales qui ne possèdent pas de variante UTC:

[getTime()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/getTime)
: Renvoie l'horodatage de la date - nombre de millisecondes écoulées à partir du 1er janvier 1970 UTC + 0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Renvoie la différence entre le fuseau horaire local et l'heure UTC, en minutes :

    ```js run
    // si vous êtes dans le fuseau horaire UTC-1, génère 60
    // si vous êtes dans le fuseau horaire UTC + 3, les sorties -180
    alert( new Date().getTimezoneOffset() );

    ```

## Réglage des composants de date

Les méthodes suivantes permettent de définir des composants date / heure:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (définit la date entière en millisecondes depuis 01.01.1970 UTC)

Comme nous pouvons le constater, certaines méthodes peuvent définir plusieurs composants à la fois, par exemple `setHours`. Les composants non mentionnés ne sont pas modifiés.


Par exemple:

```js run
let today = new Date();

today.setHours(0);
alert(today); // encore aujourd'hui, mais l'heure est changée à 0

today.setHours(0, 0, 0, 0);
alert(today); // toujours aujourd'hui, maintenant 00:00:00 pile.
```

## Auto-correction

l' *auto-correction* est une fonctionnalité très pratique des objets Date. Nous pouvons définir des valeurs hors limites et le système s'ajustera automatiquement.

Par exemple:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...c'est le 1st Feb 2013!
```

Les composants de date hors limites sont traités automatiquement.

Supposons que nous devions augmenter la date «28 février 2016» de 2 jours. Ce peut être «2 mars» ou «1 mars» dans le cas d'une année bissextile. Nous n’avons pas besoin d’y penser. Il suffit d'ajouter 2 jours. L'objet `Date` fera le reste:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Cette fonctionnalité est souvent utilisée pour obtenir la date après la période donnée. Par exemple, obtenons la date «70 secondes après maintenant»:

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // montre la date correcte
```

Nous pouvons également définir zéro ou même des valeurs négatives. Par exemple:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // met le jour 1 du mois
alert( date );

date.setDate(0); // la date minimum est le 1, le dernier jour du mois précédent devient alors la date
alert( date ); // 31 Dec 2015
```

## de Date à numéro, différence de date

Lorsqu'un objet Date est converti en nombre, il devient l'horodatage identique à `date.getTime()`:

```js run
let date = new Date();
alert(+date); // le nombre de millisecondes, identique à date.getTime ()
```

L'effet secondaire important: les dates peuvent être soustraites, le résultat est leur différence en ms.

Cela peut être utilisé pour les mesures de temps:

```js run
let start = new Date(); // démarre le compteur

// fait le travail
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // fin

alert( `The loop took ${end - start} ms` );
```

## Date.now()

Si nous voulons seulement mesurer la différence, nous n’avons pas besoin de l’objet Date.

Il existe une méthode spéciale `Date.now()` qui renvoie l’horodatage actuel.

Il est sémantiquement équivalent à `new Date()`. `GetTime()`, mais il ne crée pas d’objet Date intermédiaire. Donc, c’est plus rapide et cela n’exerce aucune pression sur le ramasse-miettes.

Il est principalement utilisé pour des raisons de commodité ou lorsque les performances sont importantes, comme dans les jeux en JavaScript ou dans d'autres applications spécialisées.

Donc c'est probablement mieux:

```js run
*!*
let start = Date.now(); // compteur en millisecondes depuis le 1 Jan 1970
*/!*

// fait le travail
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // fin
*/!*

alert( `The loop took ${end - start} ms` ); // soustrait des nombres, pas des dates
```

## Benchmarking

Si nous voulons une référence fiable en matière de fonction gourmande en ressources processeur, nous devons être prudents.


Par exemple, mesurons deux fonctions qui calculent la différence entre deux dates: laquelle est la plus rapide?


Such performance measurements are often called "benchmarks".

```js
// nous avons date1 et date2, quelle fonction retourne plus rapidement leur différence en ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// où
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Ces deux font exactement la même chose, mais l’un d’eux utilise un `date.getTime()` explicite pour obtenir la date en ms, et l’autre repose sur une transformation date à nombre. Leur résultat est toujours le même.


Alors, lequel est le plus rapide?

La première idée peut être de les exécuter plusieurs fois de suite et de mesurer le décalage horaire. Pour notre cas, les fonctions sont très simples, nous devons donc le faire environ 100 000 fois.

Mesurons:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Utiliser `getTime()` est beaucoup plus rapide! C’est parce qu’il n’y a pas de conversion de type, il est beaucoup plus facile pour JavaScript de faire le calcul.

Ok, nous avons quelque chose. Mais ce n’est pas encore une bonne référence.

Imaginons qu’au moment de l’exécution du processeur `bench(diffSubtract)`, on faisait quelque chose en parallèle et que cela prenait des ressources. Et au moment de l'exécution du `bench(diffGetTime)`, le travail est terminé.


Un scénario assez réel pour un système d'exploitation moderne multi-processus.

En conséquence, le premier test aura moins de ressources de processeur que le second. Cela peut conduire à des résultats erronés.

**Pour un benchmarking plus fiable, l'ensemble des tests doit être réexécuté plusieurs fois.**

Par exemple, comme ceci :

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// lance le test(upperSlice) et le test(upperLoop) toutes les 10 fois en alternance
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Les moteurs JavaScript modernes commencent à appliquer des optimisations avancées uniquement au «code dynamique» qui s'exécute plusieurs fois (inutile d'optimiser les tâches rarement exécutées). Ainsi, dans l'exemple ci-dessus, les premières exécutions ne sont pas bien optimisées. Nous voudrons peut-être ajouter un test pour s'échauffer:

```js
// ajouté pour "s'échauffer" avant la boucle principale
bench(diffSubtract);
bench(diffGetTime);

// maintenant comparons
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Faites attention au micro-benchmarking"
Les moteurs JavaScript modernes effectuent de nombreuses optimisations. Ils peuvent modifier les résultats des «tests artificiels» par rapport à «l'utilisation normale», en particulier lorsque nous comparons quelque chose de très petit. Donc, si vous voulez sérieusement comprendre les performances, alors étudiez le fonctionnement du moteur JavaScript. Et puis vous n’aurez probablement pas besoin de micro-points de repère.

Un bon paquet d'article a propos de V8 se trouve ici <http://mrale.ph>.
```

## Date.parse d'une chaîne de caractère

La methode [Date.parse(str)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/parse) peut lire une date provenant d'une chaîne de caractères

Le format de la chaîne de caractères doit être: `YYYY-MM-DDTHH:mm:ss.sssZ`, où:

<<<<<<< HEAD
- `YYYY-MM-DD` -- est la date: année-mois-jour.
- Le caractère `T` est utilisé comme délimiteur.
- `HH:mm:ss.sss` - correspond à l'heure: heures, minutes, secondes et millisecondes.
- La partie optionnelle `Z` indique le fuseau horaire au format `+-hh:mm`. Une seule lettre `Z` qui signifierait UTC + 0.
=======
- `YYYY-MM-DD` -- is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` -- is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Des variantes plus courtes sont également possibles, telles que `AAAA-MM-JJ` ou `AAAA-MM` ou même `AAAA`.

L'appel à `Date.parse(str)` analyse la chaîne au format indiqué et renvoie l'horodatage (nombre de millisecondes à compter du 1er janvier 1970 UTC + 0). Si le format n'est pas valide, renvoie `NaN`.

Par exemple:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (horodatage)
```

Nous pouvons créer instantanément un nouvel objet `Date` à partir de l'horodatage:


```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Sommaire

- La date et l'heure en JavaScript sont représentées avec l'objet `Date`. Nous ne pouvons pas créer «seule date» ou «seule heure»: les objets de `date` portent toujours les deux.
- Les mois sont comptés à partir de zéro (oui, janvier est un mois zéro).
- Les jours de la semaine dans `getDay()` sont également comptés à partir de zéro (c’est le dimanche).
- `Date` auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
- La `date` se corrige automatiquement lorsque des composants hors plage sont définis. utilisé pour ajouter / soustraire des jours / mois / heures.
- Utilisez `Date.now()` pour obtenir l’horodatage actuel rapidement.

Notez que contrairement à de nombreux autres systèmes, les horodatages JavaScript sont exprimés en millisecondes et non en secondes.

De plus, nous avons parfois besoin de mesures de temps plus précises. JavaScript lui-même ne permet pas de mesurer le temps en microsecondes (un millionième de seconde), mais la plupart des environnements le fournissent. Par exemple, le navigateur a [performance.now()](https://developer.mozilla.org/fr/docs/Web/API/Performance/now) qui donne le nombre de millisecondes à partir du début du chargement de la page avec une précision de l'ordre de la microseconde (3 chiffres après le point):

```js run
alert(`Loading started ${performance.now()}ms ago`);
<<<<<<< HEAD
// Quelque chose comme: "Le chargement a commencé il y a 34731.26000000001ms"
// .26 est en microsecondes (260 microsecondes)
// plus de 3 chiffres après le point décimal sont des erreurs de précision, seuls les 3 premiers sont corrects

=======
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557
```

Node.js a un module microtime. Techniquement, tout appareil ou environnement permet d’obtenir plus de précision, il n’est tout simplement pas dans Date.
Node.js a un module `microtime` et d'autres moyens. Techniquement, presque tous les appareils et environnements permettent d'obtenir plus de précision, ce n'est pas seulement dans `Date`.
