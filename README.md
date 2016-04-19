graphviz2svg
============

Provide a library rendering graph and digraph content into svg.

[x] provide a library function doing this
[x] provide a commandline tool doing this
[ ] provide a function, which can be added to expect server, 
    rendering the file on server and return the svg
[ ] provide a server-side script to render graphs

Default font is `sans`.

API
===

```js
  graphviz2svg = require('graphviz2svg');
  graphviz2svg.graph2svg('A -- B ; B -- C ; C -- A'); // --> returns svg
  graphviz2svg.digraph2svg('A -> B ; B -> C ; C -> A'); // --> returns svg

  graphviz2svg.digraph2svg('A -> B ; B -> C ; C -> A', {digraph_font: 'serif'}); // --> returns svg
```
