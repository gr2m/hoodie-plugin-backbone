# hoodie-plugin-backbone

> Backbone bindings for Hoodie

## Installation

Install the plugin by running
```
hoodie install backbone
```

Create a new directory named `www/assets/vendor/backbone` in your project
and copy the required JavaScript files from the plugin into that directory:

UNIX-like OS:
```
mkdir -p www/assets/vendor/backbone
cp node_modules/hoodie-plugin-backbone/node_modules/backbone/backbone.js www/assets/vendor/backbone/
cp node_modules/hoodie-plugin-backbone/node_modules/backbone/node_modules/underscore/underscore.js www/assets/vendor/backbone/
```

## Usage

index.html
```html
<!-- load underscore and backbone before hoodie -->
<script src="assets/vendor/backbone/underscore.js"></script>
<script src="assets/vendor/backbone/backbone.js"></script>
<script src="/_api/_files/hoodie.js"></script>
<script src="assets/js/index.js"></script>
```

index.js
```js
var TodoModel = hoodie.backbone.Model.extend({
  type: 'todo'
});
var TodoCollection = hoodie.backbone.Collection.extend({
  model: Model
});
var todos = new TodoCollection();

todos.create({title: 'persisted and synced with Hoodie.', done: true});
```
