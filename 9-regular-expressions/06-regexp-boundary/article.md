# Limite de mot : \b

Une limite de mot `pattern:\b` teste une position, de la même manière que les ancres `pattern:^` et `pattern:$`.

Quand le moteur d'expression régulière (module qui implémente la recherche d'expressions régulières) trouve le motif `pattern:\b`, il vérifie si la position dans la chaine de caractères est une limite de mot.

Il y a trois positions possibles pour une limite de mot :

- Au début de la chaîne de caractères, si le premier caractère est alphanumérique (ou un trait de soulignement), c'est-à-dire qu'il correspond au motif `pattern:\w`.
- Entre deux caractères d'une chaîne, si seulement l'un des caractères correspond au motif `pattern:\w`, (alphanumérique ou trait de soulignement).
- À la fin de la chaîne de caractères, si le dernier caractère correspond au motif `pattern:\w`.

Par exemple l'expression régulière `pattern:\bJava\b` sera trouvé dans `subject:Hello, Java!`, où `subject:Java` est un mot isolé, mais pas dans `subject:Hello, JavaScript!`.

```js run
alert("Hello, Java!".match(/\bJava\b/)); // Java
alert("Hello, JavaScript!".match(/\bJava\b/)); // null
```

Dans la chaîne `subject:Hello, Java!` les positions suivantes correspondent au motif `pattern:\b`:

![](hello-java-boundaries.svg)

Cette chaîne passe le test du motif `pattern:\bHello\b`, car :

1. Le début de la chaîne passe le premier test `pattern:\b`.
2. Puis trouve le mot `pattern:Hello`.
3. Enfin le test `pattern:\b` est encore valide, comme nous sommes entre `subject:o` et une virgule.

Donc le motif `pattern:\bHello\b` sera trouvé, mais pas `pattern:\bHell\b` (car il n'y a pas de limite de mot après `l`) ni `Java!\b` (car le point d'exclamation ne correspond pas au motif `pattern:\w`, il n'est donc pas suivi par une limite de mot).

```js run
alert("Hello, Java!".match(/\bHello\b/)); // Hello
alert("Hello, Java!".match(/\bJava\b/));  // Java
alert("Hello, Java!".match(/\bHell\b/));  // null (aucune correspondance)
alert("Hello, Java!".match(/\bJava!\b/)); // null (aucune correspondance)
```

La limite de mot `pattern:\b` ne s'utilise pas uniquement pour des mots, mais aussi pour les nombres.

Par exemple, le motif `pattern:\b\d\d\b` recherche un nombre isolé à deux chiffres. C'est-à-dire, qu'il cherche un nombre à deux chiffres entouré par des caractères qui ne correspondent pas au motif `pattern:\w`, comme des espaces, une ponctuation, un début ou une fin de chaîne.

```js run
alert("1 23 456 78".match(/\b\d\d\b/g)); // 23,78
alert("12,34,56".match(/\b\d\d\b/g)); // 12,34,56
```

```warn header="La limite de mot `pattern:\b` ne fonctionne pas pour des alphabets non latin"
Le test de limite de mot `pattern:\b` vérifie qu'il doit y avoir `pattern:\w` d'un côté de la position et "not `pattern:\w`" - de l'autre côté.

Comme `pattern:\w` signifie `a-z`(en minuscule ou majuscule), un chiffre ou un trait de soulignement, le test ne fonctionne pas pour d'autres caractères, p. ex. lettre cyrillique ou idéogramme.
```
