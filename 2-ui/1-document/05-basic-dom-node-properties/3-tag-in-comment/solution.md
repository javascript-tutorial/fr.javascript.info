La réponse : **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

Ce qui se passe pas à pas :

1. Le contenu de `<body>` est remplacé par le commentaire. Le commentaire est `<!--BODY-->`, car `body.tagName == "BODY"`. Comme nous nous en souvenons, `tagName` est toujours en majuscule en HTML.
2. Le commentaire est maintenant le seul nœud enfant, donc nous l'avons dans `body.firstChild`.
3. La propriété `data` du commentaire est son contenu (à l'intérieur `<!--...-->`) : `"BODY"`.
