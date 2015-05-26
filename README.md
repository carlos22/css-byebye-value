CSS Filter by Value
===================

This [postcss](https://github.com/postcss/postcss) plugin removes all declarations which does not have a certain *value*.
Afterwards it removes all empty rules (selectors).

Based on [CSS Byebye](https://github.com/AoDev/css-byebye).

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
```js
var postcss = require('postcss');
var input = '.mySelector a { color: $var; border: 1px solid red; } h1 { font-weight: bold; }';
console.log(postcss([require('css-filter-by-value')({valuesToKeep: ['$var']})]).process(input).css);
```

### Result
```css
.mySelector a {
  color: $var;
}
```

## Options

`valuesToKeep` - Array of values which declarations should be kept. Can be a regex.

## License

MIT
