# Limite de mot : \b

Une limite de mot `pattern:\b` teste une position comme les ancres, `pattern:^` et `pattern:$`.

Quand le moteur d'expressions rationnelles (module qui implémente la recherche d'expressions rationnelles) trouve le paterne `pattern:\b`, il vérifie si la position dans la chaine de caractères est une limite de mot.

Il y a trois positions possibles pour une limite de mot :

- Au début de la chaîne de caractères, si le premier caractère est alphanumérique (ou un trait de soulignement) `pattern:\w`.
- Entre deux caractères d'une chaîne, si un des caractères est alphanumérique (ou un trait de soulignement) `pattern:\w` et l'autre ne l'est pas.
- À la fin de la chaîne de caractères, si le dernier caractère est alphanumérique (ou un trait de soulignement) `pattern:\w`.

Par exemple l'expression régulière `pattern:\bJava\b` sera trouvé dans `subject:Hello, Java!`, où `subject:Java` est un mot isolé, mais pas dans `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

Dans la chaîne `subject:Hello, Java!` les positions suivantes correspondent au paterne `pattern:\b`:

![](hello-java-boundaries.svg)

Cette chaîne passe le test du paterne `pattern:\bHello\b`, car :

1. Le début de la chaîne passe le premier test `pattern:\b`.
2. Puis trouve le mot `pattern:Hello`.
3. Enfin le test `pattern:\b` est encore valide, comme nous sommes entre `subject:o` et une virgule.

Donc le paterne `pattern:\bHello\b` sera trouvé, mais pas `pattern:\bHell\b` (car il n'y a pas de limite de mot après `l`) ni `Java!\b` (car le point d'exclamation n'est pas alphanumérique (ou trait de soulignement) `pattern:\w`, il n'est donc pas suivi par une limite de mot).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (aucune correspondance)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (aucune correspondance)
```

Le paterne `pattern:\b` ne s'utilise pas uniquement sur les mots, mais aussi pour les nombres.

Par exemple, le paterne `pattern:\b\d\d\b` recherche un nombre isolé à deux chiffres. C'est à dire, qu'il cherche un nombre à deux chiffres entouré par des caractères qui ne sont pas alphanumériques (ou traits de soulignement) `pattern:\w`, comme des espaces, une ponctuation, un début ou une fin de chaîne.

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="La limite de mot `pattern:\b` ne fonctionne pas pour des alphabets non latin"
Le test de limite de mot `pattern:\b` vérifie qu'il doit y avoir `pattern:\w` d'un côté de la position et "not `pattern:\w`" - de l'autre côté.

Comme `pattern:\w` signifie `a-z`(en minuscule ou majuscule), un chiffre ou un trait de soulignement, donc le test ne fonctionne pas pour d'autres caractères, e.g. lettre cyrillique ou hiéroglyphe.
```
