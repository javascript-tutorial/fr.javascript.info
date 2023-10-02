importance: 5

---

# Pourquoi avons-nous besoin d'Origin ?

Comme vous le savez probablement, il y a un en-tête HTTP `Referer`, qui contient généralement une URL de la page qui a initié une requête réseau.

Par exemple, lors de la récupération de `http://google.com` à partir de `http://javascript.info/some/url`, les en-têtes ressemblent à ceci :

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Comme vous pouvez le voir, `Referer` et `Origin` sont présents.

Questions :

1.
Pourquoi `Origin` est nécessaire, si `Referer` a encore plus d'informations ?
2.
Est-il possible qu'il n'y ait pas de `Referer` ou `Origin`, ou est-ce incorrect ?
