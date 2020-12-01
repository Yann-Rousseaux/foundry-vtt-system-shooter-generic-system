/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {

  // Define template paths to load
  const templatePaths = [
    // Attribute list partial.
    "systems/shootergenericsystem/templates/actor/actor-sheet-header.html",
    "systems/shootergenericsystem/templates/actor/actor-abilities.html",
    "systems/shootergenericsystem/templates/actor/actor-specialisations.html",
    "systems/shootergenericsystem/templates/actor/actor-outlaw.html",
    "systems/shootergenericsystem/templates/actor/actor-marshal.html",
    "systems/shootergenericsystem/templates/actor/actor-items.html",
    "systems/shootergenericsystem/templates/actor/actor-specialisations.html",
    "systems/shootergenericsystem/templates/actor/actor-specialisations-attributes.html",
    "systems/shootergenericsystem/templates/actor/actor-specialisations-groups.html"
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};

Handlebars.registerHelper('loud', function (aString) {
  return aString.toUpperCase()
})