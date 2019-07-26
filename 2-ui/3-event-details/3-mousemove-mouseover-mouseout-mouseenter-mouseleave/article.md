# Les Mouvements: mouseover/out, mouseenter/leave

Nous allons entrer plus en détails dans les évènements qui se passent lorsque la souris se déplace entre les éléments.

## Mouseover/mouseout, relatedTarget

L'évènement  `mouseover`  est exécuté lorsqu'un pointeur de la souris survole un élément, et `mouseout` -- lorsqu’il le quitte.

![](mouseover-mouseout.png)

Ces évènements sont spéciaux parce qu’ils disposent d'une propriété  `relatedTarget`.

Cette propriété vient en complément a la propriété  `target`. Lorsqu'un élément quitte un élément pour un autre, l'un d'entre eux devient `target`, et l'autre `relatedTarget`.

Pour  `mouseover`:

- `event.target` -- l'élément que survole la souris.
- `event.relatedTarget` -- voici l'élément  d'origine la souris (`relatedTarget` -> `target`).

A l'inverse du  `mouseout`:

- `event.target` --est l'élément que la souris a quitté.
- `event.relatedTarget` -- est le nouvel élément  sous l'emprise du pointeur,  (`target` -> `relatedTarget`).

```online
Dans l'exemple ci-dessous  chaque aspect facial  est un élément. Lorsque vous déplacez  la souris, vous pouvez voir les évènements de souris dans la zone de texte.

Chaque évènement a l'information à propos de la provenance de l'évènement.

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` peut être  `null`"
La propriété `relatedTarget` peut être  `null`.

C'est normal et cela signifie simplement que la souris de provient pas d'un autre élément, mais hors de la fenêtre  Windows. Ou bien qu'elle a quitté la fenêtre Windows.

Nous devons garder cette éventualité à l'esprit lorsqu'on utilise `event.relatedTarget` dans notre code. Si nous accédons a la propriété `event.relatedTarget.tagName`, alors il y aura une erreur.
```

## Fréquence des évènements

L'évènement  `mousemove`   se déclenche lorsque la souris se déplace. Mais cela ne signifie pas chaque pixel mène a  un évènement.

Le navigateur  contrôle la position de la souris de temps en temps. S'il détecte des changements alors il déclenche les évènements.
Cela signifie que si un visiteur déplace la souris très rapidement  les éléments du DOM peuvent être sautes:

![](mouseover-mouseout-over-elems.png)

Si la souris se déplace très rapidement de  `#FROM` aux  `#TO` éléments telle que décrite en haut, alors le `<div>`  intermédiaire (ou certains d'entre eux) peuvent être sautés. L'évènement  `mouseout` peut être déclenche  sur  `#FROM` et ensuite immédiatement le `mouseover` sur  `#TO`.

En pratique c'est utile, parce que s'il peut exister plusieurs éléments intermédiaires. Nous ne voulons pas les évaluer un  à  un à tour de rôle.

D'autre part, nous devons garder à l'esprit que nous ne pouvons supposer que la souris se déplace lentement d'un évènement à un autre. Non, ça peut "sauter".

Il est possible en particulier que le curseur saute en plein milieu de la page en provenant du dehors de la fenêtre. Et `relatedTarget=null`, parce qu’il est venu de  "nul part":

![](mouseover-mouseout-from-outside.png)

<div style="display:none">
Au cas d'un mouvement rapide, les éléments intermédiaires ne peuvent déclencher aucun évènement. Mais si la souris entre en collision avec l'élément (`mouseover`), quand nous sont sur d'avoir un  `mouseout` lorsqu'il le quitte.
</div>

```online
Consulter en live "live" sur le teststand ci desous.

Le document HTML est compose de `<div>` éléments imbriques. Si vous déplacez rapidement la souris sur eux, alors il n'aura pas d'évènements du tout sur eux, oubien peut être le div en rouge ou seulement celui en bleu va déclencher les évènements.

Essayez aussi de déplacer le pointeur sur le `div` rouge, et ensuite déplacez le rapidement hors de ce dernier vers le bas en passant sur celui en vert. Si le mouvement est assez rapide alors l'élément Parent est ignoré.

[codetabs height=360 src="mouseoverout-fast"]
```

## Mouseout  "supplementaire" lorsqu'on quitte vers un élément Enfant

Imaginez -- un curseur de souris qui entre en collision avec un élément. L'évènement  `mouseover` est déclenche. Ensuite le curseur va sur un élément enfant. Le fait intéressant c'est que cet évènement `mouseout` se déclenche dans ce cas. Le curseur est toujours dans l'élément, mais nous obtenons  un `mouseout` à partir de ce dernier!

![](mouseover-to-child.png)

C'est étrange mais cela s'explique facilement.

** Selon la logique du navigateur, Le curseur de la souris ne peut uniquement être sur un *single* élément à la fois -- celui le plus à l'intérieur (et au-dessus par z-index).**

Donc s'il va sur un autre élément (même un descendant), alors il quitte celui précèdent. C'est simple.

Il y a un drôle de conséquence que nous pouvons observer sur l'exemple ci-dessous.

Le `<div>` rouge est à l'intérieur de celui en bleu. Le `<div>` bleu a des gestionnaires d'évènements  `mouseover/out` qui enregistrent tous les évènements dans une zone de texte multi ligne en bas.

Essayez de survoler l'élément en bleu et ensuite en déplaçant la souris sur celui en rouge -- regardez les évènements:

[codetabs height=360 src="mouseoverout-child"]

1. En entrant sur celui en bleu -- On obtient `mouseover [target: blue]`.
2. Ensuite en se déplacent du bleu vers le rouge -- on obtient `mouseout [target: blue]` (le parent de gauche).
3. ...et immediatement apres `mouseover [target: red]`.

Donc, pour un gestionnaire qui ne prend pas en compte le `target`, il semble qu'on ait quitté l’élément parent  avec l’évènement `mouseout` en `(2)` et retourné vers celui-ci par `mouseover` en `(3)`.

Si nous exécutons quelques actions en entrant/quittant l'élément, alors nous allons avoir  beaucoup d'exécutions "false" supplémentaires. Pour des trucs simples cela peut passer inaperçu. Pour des choses complexes elles peuvent créer des effets secondaires involontaires.

Nous pouvons régler cela en utilisant  des évènements `mouseenter/mouseleave` à la place.

## Evènements mouseenter and mouseleave

Les évènements `mouseenter/mouseleave` sont similaires aux `mouseover/mouseout`. Ils se déclenchent aussi lorsque le pointeur de la souris entre en collision avec ou quitte l'élément.

Cependant il existe deux différences:

1. Les transitions à l'intérieur de l'élément ne sont pas comptées
2. Les évènements  `mouseenter/mouseleave` ne remontent pas en haut de la chaine des éléments.  

Ces évènements sont intuitivement très clairs.

Lorsque le curseur entre en contact avec élément -- l'évènement `mouseenter` se declenche, et ensuite peu importe où il part lorsqu'il est à l'intérieur de l'élément. L'évènement `mouseleave` se déclenche seulement lorsque le curseur le quitte.

Si nous faisons le même exemple, mais nous mettons l'évènement `mouseenter/mouseleave` sur le `<div>` bleu, et faisons la même chose-- Nous pouvons voir que les évènements se déclenchent seulement en entrant sur ou quittant le `<div>` bleu. Aucun évènement supplémentaire  lorsqu'on va sur celui en rouge et  reviens. Les elements enfants sont ignorés.

[codetabs height=340 src="mouseleave"]

## Délégation des évènements

Les évènements `mouseenter/leave`  sont très simple et facile à utiliser. Mais il ne remonte pas.  Donc nous ne pouvons pas utiliser la délégation d'évènements sur eux.

Imaginez qu'on veuille gérer les évènements de souris enter/leave pour les cellules d'un tableau et qu'il ait une centaine de cellules.

La solution naturelle serait de -- créer un gestionnaire sur  balise `<table>` et de travailler sur les évènements la bas. Mais les évènements `mouseenter/leave` ne se remonte pas les éléments. Donc si un tel cas survient sur une balise  `<td>`, alors un gestionnaire seulement sur cette balise de  `<td>` peut l'attraper.

Les gestionnaires pour les évènements `mouseenter/leave` sur une balise `<table>` se déclenche seulement en  entrant ou quittant toute la table. Il est  impossible d'obtenir quelque information que cela soit sur  les transitions a l'intérieur de ce dernier.

Pas de problème -- Utilisons `mouseover/mouseout`.

Un simple gestionnaire ressemble à  ceci:

```js
// Mettons en valeur les cellules lorsque la souris les traversent
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```
Ces gestionnaires fonctionnent lorsqu'on se déplace sur n'importe quel élément dans le tableau.

Mais nous voudrions gérer uniquement les transitions à l'intérieur et en dehors de la balise  `<td>`  et mettre en valeur les cellules de manière générale. Nous ne voulons pas gérer les  transitions  qui se produisent entre les éléments enfants des balises `<td>`.

Une solution possible:

- Se rappeler de la balise `<td>` mise en valeur en cours dans une variable.
- Sur un `mouseover` -- ignorer l'évènement  si nous nous trouvons encore dans la balise `<td>` en cours de sélection.
- Sur un `mouseout` -- ignorer si nous n'avions pas quitte la balise `<td>` en cours.

Cela filtre les évènements "supplémentaires"  lorsqu'on se déplace entre les éléments Enfants de la balise `<td>`.

```offline
Les détails sont au complet dans ce lien [full exemple](sandbox:mouseenter-mouseleave-delegation-2).
```

```online
Voici l'exemple complet avec tous les détails:

[codetabs height=380 src="mouseenter-mouseleave-delegation-2"]

Essayez de  déplacer le curseur à l'intérieur et en dehors des cellules de la table. Rapidement et lentement -- peu importe. La balise `<td>` uniquement est entièrement et mise en valeur  contrairement à l'exemple précèdent.
```


## Résume

Nous avons abordé les évènements `mouseover`, `mouseout`, `mousemove`, `mouseenter` et `mouseleave`.

Les bonnes choses are noter sont:

- Un mouvement rapide de la souris peut faire que les évènements `mouseover, mousemove, mouseout` sautent immédiatement les éléments.
- Les évènements `mouseover/out` et `mouseenter/leave` ont une propriété target additionnelle : `relatedTarget`.  C'est l'élément apartir duquel nous venons ou vers lequel nous allons, elle est complémentaire à `target`.
- Les  évènements `mouseover/out` se déclenchent même si nous allons de l'élément Parent vers l'élément Enfant. Ils assument que la souris ne peut uniquement être sur un élément à la fois – celui le plus profond.
- Les évènements `mouseenter/leave`  ne se propagent pas lorsque la souris va sur l'élément Enfant.  Ils contrôlent uniquement  si la souris entre à l'intérieur ou part hors de l'élément de manière générale.
