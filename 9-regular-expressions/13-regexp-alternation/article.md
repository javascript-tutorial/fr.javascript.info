# Alternance (OU) |

Alternance est le terme d'expression régulière qui représente un "OU".

Dans une expression régulière l'alternance est représentée par une barre verticale `pattern:|`.

Par exemple, nous souhaitons trouver les langages de programmation suivants: HTML, PHP, Java ou JavaScript.

La regexp correspondante : `pattern:html|php|java(script)?`.

Exemple d'utilisation:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

Nous avons déjà vu une chose similaire, les crochets. Ils permettent de choisir entre plusieurs caractères, par exemple `pattern:gr[ae]y` correspond à `match:gray` ou `match:grey`.

Les crochets n'autorisent que les caractères ou les classes de caractère. L'alternance permet n'importe quelle expression. Une regexp `pattern:A|B|C` signifie `A`, `B` ou `C`.

Par exemple:

- `pattern:gr(a|e)y` signifie la même chose que `pattern:gr[ae]y`.
- `pattern:gra|ey` signifie `match:gra` ou `match:ey`.

Pour appliquer l'alternance à une partie du modèle nous pouvons l'encadrer entre parenthèses:
- `pattern:I love HTML|CSS` correspond à `match:I love HTML` ou `match:CSS`.
- `pattern:I love (HTML|CSS)` correspond à `match:I love HTML` ou `match:I love CSS`.

## Exemple: regexp d'un temps

Dans les articles précédents il y avait une tâche qui consistait à construire une regexp pour trouver un temps de la forme `hh:mm`, par exemple `12:00`. Mais un simple modèle `pattern:\d\d:\d\d` est trop vague. Il accepte `25:99` comme temps (puisque "99 minutes" correspond au modèle, mais ce temps est invalide).

Comment pouvons-nous créer un meilleur modèle ?

Nous pouvons utiliser une correspondance plus appropriée. Premièrement, les heures :

- Si le premier chiffre est `0` ou `1`, alors le prochain chiffre peut être: `pattern:[01]\d`.
- Sinon, si le premier chiffre est `2`, alors le prochain doit être `pattern:[0-3]`.
- (aucun autre premier chiffre est autorisé)

Nous pouvons écrire les deux variantes dans une regexp en utilisant l'alternance: `pattern:[01]\d|2[0-3]`.

Ensuite, les minutes doivent être entre `00` et `59`. Dans le langage des expression régulières cela peut être écrit `pattern:[0-5]\d`: le premier chiffre `0-5`, puis n'importe quel chiffre.

Si nous rejoignons les heures et les minutes ensemble, nous obtenons le modèle: `pattern:[01]\d|2[0-3]:[0-5]\d`.

Nous y sommes presque, mais il y a un problème. L'alternance `pattern:|` se trouve désormais entre `pattern:[01]\d` et `pattern:2[0-3]:[0-5]\d`.

Cela signifie que les minutes sont incluses dans la seconde variante d'alternance, voici un affichage plus clair:

```
[01]\d  |  2[0-3]:[0-5]\d
```

Ce modèle recherche `pattern:[01]\d` ou `pattern:2[0-3]:[0-5]\d`.

Mais c'est incorrect, l'alternance ne devrait être utilisé que pour la partie "heures" de l'expression régulière, pour permettre `pattern:[01]\d` OU `pattern:2[0-3]`. Corrigeons cela en mettant les "heures" entre parenthèses : `pattern:([01]\d|2[0-3]):[0-5]\d`.

La solution finale :

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
```
