
# FormData

Ce chapitre concerne l'envoi de formulaires HTML: avec ou sans fichiers, avec des champs supplémentaires, etc...

Les objets [FormData](https://xhr.spec.whatwg.org/#interface-formdata) peuvent nous aider pour cela. Comme vous l'avez peut-être deviné, c'est l'objet pour représenter les données du formulaire HTML.

Le constructeur est :
```js
let formData = new FormData([form]);
```

Si un élément HTML `form` est fourni, il capture automatiquement ses champs.

La particularité de `FormData` est que les méthodes réseau, telles que `fetch`, peuvent accepter un objet `FormData` en tant que corps. Il est encodé et envoyé avec `Content-Type: multipart/form-data`.

Du point de vue du serveur, cela ressemble à une soumission de formulaire habituelle.

## Envoi d'un formulaire simple

Envoyons d'abord un formulaire simple.

Comme vous pouvez le voir, c'est presque une ligne :

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

Dans cet exemple, le code du serveur n'est pas présenté, car il dépasse notre portée. Le serveur accepte la requête POST et répond "User saved".

## Méthodes FormData

Nous pouvons modifier les champs dans `FormData` avec des méthodes :

- `formData.append(name, value)` - ajoute un champ de formulaire avec le `name` et `value` donnés,
- `formData.append(name, blob, fileName)` - ajoute un champ comme s'il était `<input type="file">`, le troisième argument `fileName` définit le nom du fichier (pas le nom du champ de formulaire), comme s'il s'agissait d'un nom du fichier dans le système de fichiers de l'utilisateur,
- `formData.delete(name)` - supprimer le champ avec le `name` donné,
- `formData.get(name)` - obtient la valeur du champ avec le `name` donné,
- `formData.has(name)` - s'il existe un champ avec le `name` donné, retourne `true`, sinon `false`

Un formulaire est techniquement autorisé à avoir plusieurs champs avec le même `name`, donc plusieurs appels à `append` ajoute d'autres champs portant le même nom.

Il existe également la méthode `set`, avec la même syntaxe que `append`. La différence est que `.set` supprime tous les champs avec le `name` donné, puis ajoute un nouveau champ. Il s'assure donc qu'il n'y a qu'un seul champ avec ce genre de `name`, le reste est comme `append` :

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

Nous pouvons également parcourir les champs formData en utilisant la boucle `for..of` :

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// List key/value pairs
for(let [name, value] of formData) {
<<<<<<< HEAD
  alert(`${name} = ${value}`); // key1=value1, ensuite key2=value2
=======
  alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
}
```

## Envoi d'un formulaire avec un fichier

Le formulaire est toujours envoyé en tant que `Content-Type: multipart/form-data`, cet encodage permet d'envoyer des fichiers. Ainsi, les champs `<input type="file">` sont également envoyés, comme pour une soumission de formulaire habituelle.

Voici un exemple avec ce genre de formulaire :

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## Envoi d'un formulaire avec des données Blob

Comme nous l'avons vu dans le chapitre <info:fetch>, il est facile d'envoyer des données binaires générées dynamiquement, par exemple une image en tant que `Blob`. Nous pouvons le fournir directement en tant que paramètre `body` de `fetch`.

En pratique cependant, il est souvent plus commode d'envoyer une image non pas séparément, mais en tant que partie du formulaire, avec des champs supplémentaires, tels que "name" et autres métadonnées.

En outre, les serveurs sont généralement plus adaptés pour accepter des formulaires encodés en plusieurs parties, plutôt que des données binaires brutes.

Cet exemple soumet une image à partir de `<canvas>`, ainsi que d'autres champs, sous forme de formulaire, en utilisant `FormData` :

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Veuillez noter comment l'image `Blob` est ajoutée :

```js
formData.append("image", imageBlob, "image.png");
```

C'est comme s'il y avait `<input type="file" name="image">` dans le formulaire, et le visiteur a soumis un fichier nommé `"image.png"` (3ème argument) avec les données `imageBlob` (2ème argument) de son système de fichiers.

Le serveur lit les données du formulaire et le fichier, comme s'il s'agissait d'une soumission régulière de formulaire.

## Résumé

Les objets [FormData](https://xhr.spec.whatwg.org/#interface-formdata) sont utilisés pour capturer le formulaire HTML et le soumettre en utilisant `fetch` ou une autre méthode réseau.

Nous pouvons soit créer un `new FormData(form)` à partir d'un formulaire HTML, soit créer un objet sans aucun formulaire, puis ajouter des champs avec des méthodes :

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Notons ici deux particularités :

1. La méthode `set` supprime les champs du même nom, contrairement à `append`. C'est la seule différence entre eux.
2. Pour envoyer un fichier, une syntaxe à 3 arguments est nécessaire, le dernier argument est un nom de fichier, qui est normalement extrait du système de fichiers utilisateur pour `<input type="file">`.

Les autres méthodes sont :

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

C'est tout !
