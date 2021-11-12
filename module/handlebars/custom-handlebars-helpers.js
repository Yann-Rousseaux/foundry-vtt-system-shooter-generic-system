/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsHelpers = async function(Handlebars) {
    Handlebars.registerHelper('concat', function() {
        var outStr = '';
        for (var arg in arguments) {
        if (typeof arguments[arg] != 'object') {
            outStr += arguments[arg];
        }
        }
        return outStr;
    });

    Handlebars.registerHelper('ndc', function (value) {
        return value == 'e' ? true : false;
    });

    Handlebars.registerHelper('toLowerCase', function(str) {
        return str.toLowerCase();
    });
}