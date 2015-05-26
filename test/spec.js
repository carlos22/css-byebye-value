var assert = require('assert');
var postcss = require('postcss');
var cssbyebyevaluePlugin = require('../lib/css-filter-by-value');

function cssbybyeProcess(css, opts) {
    return postcss([cssbyebyevaluePlugin(opts)]).process(css);
};


describe('css-filter-by-value', function () {

    it('should remove ruleset(s) with a selector that contains any of the given selectors to remove ', function (done) {

        var css = 'a { font-size: $some-value; } .hello .h1 { background: $brand_color} .world { color: blue }';
        var declValuesToKeep = ['$some-value', '$brand_color'];
        var expected = 'a { font-size: $some-value; } .hello .h1 { background: $brand_color}';
        var result = cssbybyeProcess(css, {valuesToKeep: declValuesToKeep, map: false});

        assert.strictEqual(result.css, expected);
        done();
    });

    it('should support regex matching', function (done) {

        var css = '.item {} .item .desc { background: red } .list .item { color: $some_color; border: 1px solid red; }';
        var declValuesToKeep = [/\$[0-9A-Za-z-_]/];
        var expected = '.list .item { color: $some_color; }';
        var result = cssbybyeProcess(css, {valuesToKeep: declValuesToKeep, map: false});

        assert.strictEqual(result.css, expected);
        done();
    });

});

