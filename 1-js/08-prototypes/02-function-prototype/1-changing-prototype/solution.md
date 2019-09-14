
Réponses:

1. `true`.

     L'affectation à `Rabbit.prototype` configure `[[Prototype]]` pour les nouveaux objets, mais n'affecte pas les objets existants.

2. `false`.

<<<<<<< HEAD
     Les objets sont assignés par référence. L'objet de `Rabbit.prototype` n'est pas dupliqué, mais un objet unique est référencé à la fois par `Rabbit.prototype` et par le `[[Prototype]]` de `rabbit`.
=======
    Objects are assigned by reference. The object from `Rabbit.prototype` is not duplicated, it's still a single object referenced both by `Rabbit.prototype` and by the `[[Prototype]]` of `rabbit`. 
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

     Ainsi, lorsque nous modifions son contenu par l’une des références, il est visible par l’autre.

3. `true`.

     Toutes les opérations `delete` sont appliquées directement à l'objet. `Delete rabbit.eats` tente ici de supprimer la propriété `eats` de `rabbit`, mais ne l’a pas. Donc l'opération n'aura aucun effet.

4. `undefined`.

     La propriété `eats` est supprimée du prototype, elle n’existe plus.
