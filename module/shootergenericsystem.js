// Import Modules
import { shootergenericsystemActor } from "./actor/actor.js";
import { shootergenericsystemActorSheet } from "./actor/actor-sheet.js";
import { shootergenericsystemItem } from "./item/item.js";
import { shootergenericsystemItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.shootergenericsystem = {
    shootergenericsystemActor,
    shootergenericsystemItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = shootergenericsystemActor;
  CONFIG.Item.entityClass = shootergenericsystemItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("shootergenericsystem", shootergenericsystemActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("shootergenericsystem", shootergenericsystemItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});