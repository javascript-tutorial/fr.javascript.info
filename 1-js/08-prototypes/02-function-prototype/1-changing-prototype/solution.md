
Réponses:

1. `true`.

     L'affectation à `Rabbit.prototype` configure `[[Prototype]]` pour les nouveaux objets, mais n'affecte pas les objets existants.

2. `false`.

     Les objets sont assignés par référence. L'objet de `Rabbit.prototype` n'est pas dupliqué, mais un objet unique est référencé à la fois par `Rabbit.prototype` et par le `[[Prototype]]` de `rabbit`.

     Ainsi, lorsque nous modifions son contenu par l’une des références, il est visible par l’autre.

3. `true`.

     Toutes les opérations `delete` sont appliquées directement à l'objet. `Delete rabbit.eats` tente ici de supprimer la propriété `eats` de `rabbit`, mais ne l’a pas. Donc l'opération n'aura aucun effet.

4. `undefined`.

     La propriété `eats` est supprimée du prototype, elle n’existe plus.
