# hoodie-plugin-backbone

> Backbone bindings for Hoodie

## Installation

```
hoodie install backbone
```

## Usage

The Backbone plugin provides a `hoodie.backbone` backbone API
with two properties:

1. `hoodie.backbone.Model`
2. `hoodie.backbone.Collection`

When inheriting from the `hoodie.backbone` Model or Collection,
all changes get automagically persisted using hoodie, and changes
coming from remote will be passed trough.

### Example

```js
var TodoModel = hoodie.backbone.Model.extend({
  type: 'todo'
});
var TodoCollection = hoodie.backbone.Collection.extend({
  model: TodoModel
});
var todos = new TodoCollection();

todos.create({title: 'persisted and synced with Hoodie.', done: true});
```

### Options

#### `type`

The type property must be set when inheriting from `hoodie.backbone.model`

### `hoodie.filter`

By default, a collection automatically reflects all changes coming from
remote for the type of its model. If you want it to react to only certain
events, a filter function can be passed

```js
var TodoCollection = hoodie.backbone.Collection.extend({
  model: TodoModel,
  hoodie: {
    filter: function(todo) {
      return this.parent.id === todo.listId;
    }
  }
});
var todos = new TodoCollection({parent: list});
```

If the filter function returns false, the event for the past object
will be ignored.

## License

MIT
