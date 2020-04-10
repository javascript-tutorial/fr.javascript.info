importance: 3

---

# Balise dans le commentaire

Qu'affice ce code ?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // Qu'est ce qu'il y a ici ?
</script>
```
