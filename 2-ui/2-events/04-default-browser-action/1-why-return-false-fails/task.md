importance: 3

---

# Pourquoi "return false" ne fonctionne pas?

Pourquoi dans le code ci-dessous `return false` ne fonctionne pas?

```html autorun run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">le navigateur va aller sur w3.org</a>
```

Le navigateur suit le lien lors du clic, mais nous ne voulons pas ça.

Comment réparer ce problème?
