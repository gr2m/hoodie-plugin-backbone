Backbone Hoodie plugin
======================

> Backbone bindings for Hoodie

## Installation

```
hoodie install backbone
```


## Usage

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
