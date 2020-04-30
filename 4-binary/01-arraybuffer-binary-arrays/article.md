# ArrayBuffer, binary arrays

Dans le développement web, nous rencontrons des données binaires principalement lorsque l'on travaille avec des fichiers (création, envoi, téléchargement). Un autre cas d'utilisation est le traitement d'image.

Tout ceci est possible en JavaScript, et les opérations binaires sont très performantes.

Cependant, il y a de la confusion, car il y a beaucoup de "classes".
Pour en nommer quelques unes:
- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`, etc.

En javascript, les données binaires sont implémentées de façon non standard, comparé à d'autres langages. Mais quand nous trions les choses, tout devient beaucoup plus simple.

**L'objet binaire de base est un `ArrayBuffer` -- une référence à une zone contigüe de taille fixe de la mémoire.**

Nous le créons comme ceci:
```js run
let buffer = new ArrayBuffer(16); // crée un Buffer de taille 16
alert(buffer.byteLength); // 16
```

Cela alloue une zone contigue de 16 octets dans la mémoire et la pré-remplie avec des zéros.

```warn header="L'`ArrayBuffer` n'est pas un tableau de 'quelque chose'."
Commençons par éliminer une possible source de confusion. `ArrayBuffer` n'a rien en commun avec `Array`:
- Il possède une taille fixe, on ne peut pas l'agrandir ou la    reduire.
- Il prend exactement autant d'espace en mémoire.
- Pour accéder à des octets individuels, un autre objet de "vue" est nécessaire, on n'utilise pas `buffer[index]`.
```

`ArrayBuffer` est une zone de la mémoire. Qui y'a t'il à l'intérieur ? Juste une séquence d'octets.

**Pour manipuler un `ArrayBuffer`, nous avons besoin d'utiliser un objet de "vue".**

Un objet de "vue" ne stocke rien tout seul. Ce sont les lunettes qui donnent une interprétation des octets stockés dans l'`ArrayBuffer`.

Par exemple:

- **`Uint8Array`** -- Traite chaque octet dans l'`ArrayBuffer` comme un nombre unique, avec des valeurs possibles entre 0 jusqu'à 255 (Un octet est sur 8 bits). On appelle ces valeurs des "entiers non signés sur 8 bits".
- **`Uint16Array`** -- Traite par paquet de 2 octets en tant qu'entier, avec des valeurs possibles entre 0 jusqu'à 65535. On appelle ces valeurs des "entiers non signés sur 16 bits".
- **`Uint32Array`** -- Traite par paquet de 4 octets en tant qu'entier, avec des valeurs possibles entre 0 jusqu'à 4294967295. On appelle ces valeurs des "entiers non signés sur 32bits".
- **`Float64Array`** -- Traite par paquet de 8 octets en tant que nombre flottant avec des valeurs possibles entre <code>5.0x10<sup>-324</sup></code> et <code>1.8x10<sup>308</sup></code>.

Donc, les données binaires dans un `ArrayBuffer` de 16 octets peuvent être interprétées comme 16 "petits nombres" , ou 8 grands nombres (2 octets chacun), ou 4 encore plus grands (4 octets chacun), ou 2 valeurs flottantes avec une haute précision (8 octets chacun).

![](arraybuffer-views.svg)

`ArrayBuffer` est l'objet central, le centre de tout, les données binaires brutes.

Mais si nous voulons écrire à l'intérieur, ou itérer dessus, pour n'importe quelle opération – nous devons utiliser une "vue", e.g:

```js run
let buffer = new ArrayBuffer(16); // crée un buffer de taille 16

*!*
let view = new Uint32Array(buffer); // Traite le buffer en une séquence d'entiers de 32 bits.

alert(Uint32Array.BYTES_PER_ELEMENT); // 4 octets par entier.
*/!*

alert(view.length); // 4, il stocke cette quantité d'entiers.
alert(view.byteLength); // 16, la taille en octets.

// Ecrivons une valeur
view[0] = 123456;

// Itérons sur les valeurs
for(let num of view) {
  alert(num); // 123456, puis 0, 0, 0 (4 valeurs au total)
}

```

## TypedArray

Le terme commun pour toutes ces vues (`Uint8Array`, `Uint32Array`, etc) est [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects). Ils partagent le même ensemble de méthodes et de propriétés.

They are much more like regular arrays: have indexes and iterable.

A typed array constructor (be it `Int8Array` or `Float64Array`, doesn't matter) behaves differently depending on argument types.

There are 5 variants of arguments:

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

1. If an `ArrayBuffer` argument is supplied, the view is created over it. We used that syntax already.

    Optionally we can provide `byteOffset` to start from (0 by default) and the `length` (till the end of the buffer by default), then the view will cover only a part of the `buffer`.

2. If an `Array`, or any array-like object is given, it creates a typed array of the same length and copies the content.

    We can use it to pre-fill the array with the data:
    ```js run
    *!*
    let arr = new Uint8Array([0, 1, 2, 3]);
    */!*
    alert( arr.length ); // 4, created binary array of the same length
    alert( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values
    ```
3. If another `TypedArray` is supplied, it does the same: creates a typed array of the same length and copies values. Values are converted to the new type in the process, if needed.
    ```js run
    let arr16 = new Uint16Array([1, 1000]);
    *!*
    let arr8 = new Uint8Array(arr16);
    */!*
    alert( arr8[0] ); // 1
    alert( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)
    ```

4. For a numeric argument `length` -- creates the typed array to contain that many elements. Its byte length will be `length` multiplied by the number of bytes in a single item `TypedArray.BYTES_PER_ELEMENT`:
    ```js run
    let arr = new Uint16Array(4); // create typed array for 4 integers
    alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
    alert( arr.byteLength ); // 8 (size in bytes)
    ```

5. Without arguments, creates an zero-length typed array.

We can create a `TypedArray` directly, without mentioning `ArrayBuffer`. But a view cannot exist without an underlying `ArrayBuffer`, so gets created automatically in all these cases except the first one (when provided).

To access the `ArrayBuffer`, there are properties:
- `arr.buffer` -- references the `ArrayBuffer`.
- `arr.byteLength` -- the length of the `ArrayBuffer`.

So, we can always move from one view to another:
```js
let arr8 = new Uint8Array([0, 1, 2, 3]);

// another view on the same data
let arr16 = new Uint16Array(arr8.buffer);
```


Here's the list of typed arrays:

- `Uint8Array`, `Uint16Array`, `Uint32Array` -- for integer numbers of 8, 16 and 32 bits.
  - `Uint8ClampedArray` -- for 8-bit integers, "clamps" them on assignment (see below).
- `Int8Array`, `Int16Array`, `Int32Array` -- for signed integer numbers (can be negative).
- `Float32Array`, `Float64Array` -- for signed floating-point numbers of 32 and 64 bits.

```warn header="No `int8` or similar single-valued types"
Please note, despite of the names like `Int8Array`, there's no single-value type like `int`, or `int8` in JavaScript.

That's logical, as `Int8Array` is not an array of these individual values, but rather a view on `ArrayBuffer`.
```

### Out-of-bounds behavior

What if we attempt to write an out-of-bounds value into a typed array? There will be no error. But extra bits are cut-off.

For instance, let's try to put 256 into `Uint8Array`. In binary form, 256 is `100000000` (9 bits), but `Uint8Array` only provides 8 bits per value, that makes the available range from 0 to 255.

For bigger numbers, only the rightmost (less significant) 8 bits are stored, and the rest is cut off:

![](8bit-integer-256.svg)

So we'll get zero.

For 257, the binary form is `100000001` (9 bits), the rightmost 8 get stored, so we'll have `1` in the array:

![](8bit-integer-257.svg)

In other words, the number modulo 2<sup>8</sup> is saved.

Here's the demo:

```js run
let uint8array = new Uint8Array(16);

let num = 256;
alert(num.toString(2)); // 100000000 (binary representation)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); // 0
alert(uint8array[1]); // 1
```

`Uint8ClampedArray` is special in this aspect, its behavior is different. It saves 255 for any number that is greater than 255, and 0 for any negative number. That behavior is useful for image processing.

## TypedArray methods

`TypedArray` has regular `Array` methods, with notable exceptions.

We can iterate, `map`, `slice`, `find`, `reduce` etc.

There are few things we can't do though:

- No `splice` -- we can't "delete" a value, because typed arrays are views on a buffer, and these are fixed, contiguous areas of memory. All we can do is to assign a zero.
- No `concat` method.

There are two additional methods:

- `arr.set(fromArr, [offset])` copies all elements from `fromArr` to the `arr`, starting at position `offset` (0 by default).
- `arr.subarray([begin, end])` creates a new view of the same type from `begin` to `end` (exclusive). That's similar to `slice` method (that's also supported), but doesn't copy anything -- just creates a new view, to operate on the given piece of data.

These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.



## DataView

[DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) is a special super-flexible "untyped" view over `ArrayBuffer`. It allows to access the data on any offset in any format.

- For typed arrays, the constructor dictates what the format is. The whole array is supposed to be uniform. The i-th number is `arr[i]`.
- With `DataView` we access the data with methods like `.getUint8(i)` or `.getUint16(i)`. We choose the format at method call time instead of the construction time.

The syntax:

```js
new DataView(buffer, [byteOffset], [byteLength])
```

- **`buffer`** -- the underlying `ArrayBuffer`. Unlike typed arrays, `DataView` doesn't create a buffer on its own. We need to have it ready.
- **`byteOffset`** -- the starting byte position of the view (by default 0).
- **`byteLength`** -- the byte length of the view (by default till the end of `buffer`).

For instance, here we extract numbers in different formats from the same buffer:

```js run
// binary array of 4 bytes, all have the maximal value 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// get 8-bit number at offset 0
alert( dataView.getUint8(0) ); // 255

// now get 16-bit number at offset 0, it consists of 2 bytes, together iterpreted as 65535
alert( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

// get 32-bit number at offset 0
alert( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0
```

`DataView` is great when we store mixed-format data in the same buffer. E.g we store a sequence of pairs (16-bit integer, 32-bit float). Then `DataView` allows to access them easily.

## Summary

`ArrayBuffer` is the core object, a reference to the fixed-length contiguous memory area.

To do almost any operation on `ArrayBuffer`, we need a view.

- It can be a `TypedArray`:
    - `Uint8Array`, `Uint16Array`, `Uint32Array` -- for unsigned integers of 8, 16, and 32 bits.
    - `Uint8ClampedArray` -- for 8-bit integers, "clamps" them on assignment.
    - `Int8Array`, `Int16Array`, `Int32Array` -- for signed integer numbers (can be negative).
    - `Float32Array`, `Float64Array` -- for signed floating-point numbers of 32 and 64 bits.
- Or a `DataView` -- the view that uses methods to specify a format, e.g. `getUint8(offset)`.

In most cases we create and operate directly on typed arrays, leaving `ArrayBuffer` under cover, as a "common discriminator". We can access it as `.buffer` and make another view if needed.

There are also two additional terms, that are used in descriptions of methods that operate on binary data:
- `ArrayBufferView` is an umbrella term for all these kinds of views.
- `BufferSource` is an umbrella term for `ArrayBuffer` or `ArrayBufferView`.

We'll see these terms in the next chapters. `BufferSource` is one of the most common terms, as it means "any kind of binary data" -- an `ArrayBuffer` or a view over it.

Here's a cheatsheet:

![](arraybuffer-view-buffersource.svg)
