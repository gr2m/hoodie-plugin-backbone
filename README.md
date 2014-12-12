Backbone Hoodie plugin
======================

> Backbone bindings for Hoodie

## Installation

```
hoodie install backbone

# **IMPORTANT**
# Due to a hoodie-server bug (https://github.com/hoodiehq/hoodie-server/issues/281)
# `backbone` must be installed as direct dependency of your Hoodie app at the moment.
npm install --save backbone
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
