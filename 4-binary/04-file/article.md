# File and FileReader

L'object [File](https://www.w3.org/TR/FileAPI/#dfn-file) hérite de `Blob` et est étendu avec des capacités liées au système de fichiers.

Il y a deux façons de l'obtenir.

Premièrement, il y a un constructeur, similaire à `Blob`:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- est un tableau de valeurs Blob / BufferSource / Chaîne de caractères.
- **`fileName`** -- chaînes de caractères contenant le nom du fichier.
- **`options`** -- objet optionnel:
    - **`lastModified`** -- l'horodatage (date entière) de la dernière modification.

Deuxièmement, le plus souvent, nous obtenons un fichier avec `<input type="file">`, en glisser-déposer ou d'autres interfaces de navigateur.
Dans ce cas, le fichier obtient ces informations du système d'exploitation.

Comme `File` hérite de `Blob`, les objets `File` ont les mêmes propriétés, plus:
- `name` -- le nom du fichier,
- `lastModified` -- l'horodatage de la dernière modification.

Voici comment nous pouvons obtenir un objet `File` depuis `<input type="file">`:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
```

```smart
L'entrée peut sélectionner plusieurs fichiers, donc `input.files` est un objet de type tableau.
Ici, nous n'avons qu'un seul fichier, donc nous prenons juste `input.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) est un objet dont le seul but est de lire les données des objets `Blob` (et donc aussi `File`).

Il fournit les données à l'aide d'événements, car la lecture à partir du disque peut prendre du temps.

Le constructeur:

```js
let reader = new FileReader(); // aucun argument
```

Les méthodes principales:

- **`readAsArrayBuffer(blob)`** -- lit les données au format binaire `ArrayBuffer`.
- **`readAsText(blob, [encoding])`** -- lit les données sous forme de chaîne de caractères avec l'encodage donné (`utf-8` par défaut).
- **`readAsDataURL(blob)`** -- lit les données binaires et les encode en base64 comme URL de données.
- **`abort()`** -- annule l'opération.

Le choix de la méthode `read*` dépend du format que nous préférons, comment nous allons utiliser les données.

- `readAsArrayBuffer` -- pour les fichiers binaires, pour effectuer des opérations binaires de bas niveau.
Pour les opérations de haut niveau, comme le découpage, `File` hérite de `Blob`, nous pouvons donc les appeler directement, sans lire.
- `readAsText` -- pour les fichiers texte, lorsque nous souhaitons obtenir une chaîne de caractères.
- `readAsDataURL` -- quand nous utilisons ces données dans `src` pour `img` ou une autre balise.
Il existe une alternative à la lecture d'un fichier, comme expliqué dans le chapitre <info:blob>:`URL.createObjectURL(file)`.

Au fur et à mesure de la lecture, il y a des événements:
- `loadstart` -- chargement commencé.
- `progress` -- se produit pendant la lecture.
- `load` -- aucune erreur, lecture terminée.
- `abort` -- `abort()` est appelée.
- `error` -- une erreur est survenue.
- `loadend` -- lecture terminée avec succès ou échec.

Lorsque la lecture est terminée, nous pouvons accéder au résultat comme:
- `reader.result` est le résultat (en cas de succès)
- `reader.error` est l'erreur (en cas d'échec).

Les événements les plus utilisés sont `load` et `error`.

Voici un exemple de lecture d'un fichier:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="`FileReader` pour les objets blob"
Comme mentionné dans le chapitre <info:blob>, `FileReader` peut lire non seulement les fichiers, mais tous les objets blob.

Nous pouvons l'utiliser pour convertir un blob dans un autre format:
- `readAsArrayBuffer(blob)` -- en `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- en chaîne de caractères (une alternative à `TextDecoder`),
- `readAsDataURL(blob)` -- en URL des données encoder en base64.
```

```smart header="`FileReaderSync` est disponible dans Web Workers"
Pour les Web Workers, il existe également une variante synchrone de `FileReader`, appelée [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Ses méthodes de lecture `read*` ne génèrent pas d'événements, mais renvoient plutôt un résultat, comme le font les fonctions régulières.

Cependant, ce ne fonctionne qu'à l'intérieur d'un Web Worker, car les retards dans les appels synchrones qui sont possibles lors de la lecture à partir de fichiers, sont moins importants dans les Web Workers .
Ils n'affectent pas la page.
```

## Résumé

Les objets `File` héritent de `Blob`.

En plus des méthodes et propriétés `Blob`, les objets `File` ont également les propriétés `name` et `lastModified`, ainsi que la capacité interne de lire à partir du système de fichiers.
Nous obtenons généralement des objets `File` à partir de l'entrée utilisateur, comme un `<input>` ou l'événement Drag'n'Drop (`ondragend`).

 les objets `FileReader` peuvent lire à partir d'un fichier ou d'un objet blob, dans l'un des trois formats:
- Chaînes de caractères (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- URL des données, encodé en base64 (`readAsDataURL`).

Dans de nombreux cas cependant, nous n'avons pas à lire le contenu du fichier.
Tout comme nous l'avons fait avec les blobs, nous pouvons créer une URL courte avec `URL.createObjectURL(fichier)` et l'assigner à `<a>` ou `<img>`.
De cette façon, le fichier peut être téléchargé ou affiché sous forme d'image, comme partie de canevas, etc..

Et si nous voulons envoyer un `File` sur un réseau, c'est aussi simple: une API réseau comme `XMLHttpRequest` ou `fetch` accepte nativement les objets `File`.
