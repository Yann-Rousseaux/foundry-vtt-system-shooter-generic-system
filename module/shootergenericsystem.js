// Import Modules
import { GLOBALS } from "./globals.js";
import { shootergenericsystemActor } from "./actor/actor.js";
import { shootergenericsystemActorSheet } from "./actor/actor-sheet.js";
import { shootergenericsystemItem } from "./item/item.js";
import { shootergenericsystemItemSheet } from "./item/item-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { preloadHandlebarsHelpers } from "./handlebars/custom-handlebars-helpers.js";

Hooks.once('init', async function() {
  /** Enregistre des paramètres de module */
  game.settings.register('gameSelectorModule', 'gameChoices', {
    name: 'Configuration du jeu',
    hint: 'La liste des créations de Anthony "Yno" Combrexelle.',
    scope: 'client',
    config: true,
    type: String,
    choices: {
      "a": "Channel Fear",
      "b": "Macadabre",
      "c": "Outer Space",
      "d": "Rushmore",
      "e": "La nuit des chasseurs",
      "f": "Patient 13"
    },
    default: 'a',
    onChange: value => {
      let fiche = document.querySelector('div.app.window-app.shootergenericsystem.sheet.actor>section.window-content');
      console.log(value)
    }
  });

  /** Définit une formule d'initiative pour le système */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  /* Définit des variables globales */
  CONFIG.GLOBALS = GLOBALS;

  /* Définit des entités personnalisées */
  CONFIG.Actor.documentClass = shootergenericsystemActor;
  CONFIG.Item.documentClass = shootergenericsystemItem;

  game.shootergenericsystem = {
    shootergenericsystemActor,
    shootergenericsystemItem
  };

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("shootergenericsystem", shootergenericsystemActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("shootergenericsystem", shootergenericsystemItemSheet, { makeDefault: true });
  preloadHandlebarsHelpers(Handlebars);
  // Preload template partials.
  preloadHandlebarsTemplates();
});