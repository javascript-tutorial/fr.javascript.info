# TextDecoder and TextEncoder

Que faire si les données binaires sont en fait une chaîne de charactères ? Par exemple, nous avons reçu un fichier contenant des données textuelles.

L'object interne [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) permet de lire la valeur dans une chaîne JavaScript réelle, compte tenu du buffer et de l'encodage.

Nous devons d'abord le créer:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- l'encodage, `utf-8` par défaut, mais `big5`, `windows-1251` et bien d'autres sont également pris en charge.
- **`options`** -- objet optionnel :
  - **`fatal`** -- boolean, si `true` une exception pour les caractères invalides (non décodables) est lancé, sinon (par défaut) remplacez-les par un caractère `\uFFFD`.
  - **`ignoreBOM`** -- boolean, si `true` ignore la BOM (une marque unicode facultative d'ordre des octets), rarement nécessaire.

...Et puis décoder:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- `Source du buffer` à décoder.
- **`options`** -- objet optionnel:
  - **`stream`** -- vrai pour les flux de décodage, lorsque `decoder` est appelé à plusieurs reprises avec des blocs de données entrants. Dans ce cas, un caractère multi-octets peut parfois être divisé entre des morceaux. Cette option indique à `TextDecoder` de mémoriser les caractères" inachevés "et de les décoder lorsque le morceau suivant arrive.

Par exemple:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Nous pouvons décoder une partie du Buffer en créant une vue de sous-tableau pour celui-ci:


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// la chaîne de charactères est au milieu
// créer une nouvelle vue, sans rien copier
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) fait la chose inverse -- convertit une chaîne de charactères en bytes.

La syntaxe est:

```js
let encoder = new TextEncoder();
```

Le seul encodage qu'il prend en charge est l'"utf-8".

Il a deux méthodes:
- **`encode(str)`** -- prend une chaîne de charactères et renvoie un `Uint8Array`.
- **`encodeInto(str, destination)`** -- encode `str` dans `destination` (qui doit être un `Uint8Array`).

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
