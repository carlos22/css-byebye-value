var postcss = require('postcss');

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function regexize(rulesToRemove) {
    var rulesRegexes = [];
    for (var i = 0, l = rulesToRemove.length; i < l; i++) {
        if (typeof rulesToRemove[i] == 'string') {
            rulesRegexes.push(new RegExp('^\s*' + escapeRegExp(rulesToRemove[i]) + '\s*$'));
        }
        else {
            rulesRegexes.push(rulesToRemove[i]);
        }
    }
    return rulesRegexes;
}


function concatRegexes(regexes) {

    var rconcat = '';

    if (Array.isArray(regexes)) {

        for (var i = 0, l = regexes.length; i < l; i++) {
            rconcat += regexes[i].source + '|'
        }

        rconcat = rconcat.substr(0, rconcat.length - 1);

        return new RegExp(rconcat);
    }
}

module.exports = postcss.plugin('css-filter-by-value', function (options) {
    // use the options passed to you and return a transformation
    return function (css) {
        var valuesToKeep = (options && options.valuesToKeep) || [/\$[0-9A-Za-z-_]/];
        var regexizedValuesToKeep = regexize(valuesToKeep);
        var regex = concatRegexes(regexizedValuesToKeep);

        var filterDeclaration = function filterDeclaration(decl) {
            // remove declarations wihtout a variable
            if (decl.value && decl.value.match(regex) === null) {
                decl.removeSelf();
            }
        };

        css.eachDecl(filterDeclaration);

        // to cleanup use:
        // https://github.com/ben-eb/postcss-discard-empty
        // https://github.com/ben-eb/postcss-discard-comments

    }
});
