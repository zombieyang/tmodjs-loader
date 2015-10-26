## tmodjs-loader
简洁的art-template loader

### 使用方式

```
{
  ...
  module: {
    loaders: [
      {
          test: /\.tpl$/,
          loader: "tmodjs"
      }
    ]
  }
}
```

### 添加helper
```
var art = require('tmodjs-loader/runtime');

art.helper('xxx', function() {
    //xxx
})
```