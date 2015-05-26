CSS Filter by Value
===================

This [postcss](https://github.com/postcss/postcss) plugin removes all declarations which does not have a certain *value*.

Based on [CSS Byebye](https://github.com/AoDev/css-byebye).

To cleanup the result use
* [postcss-discard-empty](https://github.com/ben-eb/postcss-discard-empty)
* [postcss-discard-comments](https://github.com/ben-eb/postcss-discard-comments)

## Example

#### Input
```css
.mySelector a {
  color: $var;
  border: 1px solid red;
}
h1 {
    font-weight: bold;
}
```

### Code
```sh
npm install postcss-discard-empty postcss-discard-comments https://github.com/carlos22/css-filter-by-value.git --save
```

```js
var postcss = require('postcss');
var input = '.mySelector a { color: $var; border: 1px solid red; } h1 { font-weight: bold; }';
console.log(postcss([require('postcss-discard-comments')({removeAll: true}), require('css-filter-by-value')({valuesToKeep: ['$var']}), require('postcss-discard-empty')()]).process(input).css);
```

### Result
```css
.mySelector a {
  color: $var;
}
```

## Options

`valuesToKeep` - Array of values which declarations should be kept. Can be a regex (optional). By default all variables starting with $ are extracted

## License

MIT
