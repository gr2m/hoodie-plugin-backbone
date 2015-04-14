/* global Hoodie, Backbone, _ */

Hoodie.extend(function(hoodie) {
  'use strict';

  function hoodieSync(method, modelOrCollection, options) {
    var attributes, id, promise, type, storeOptions;

    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    if (options.hoodie) {
      return;
    }

    id = modelOrCollection.id;
    attributes = options.attrs || modelOrCollection.toJSON(options);
    type = modelOrCollection.type;

    if (! type) {
      type = modelOrCollection.model.prototype.type;
    }

    storeOptions = {
      backbone: true
    };

    switch (method) {
    case 'read':
      if (id) {
        promise = hoodie.store.find(type, id);
      } else {
        if (options.filter) {
          promise = hoodie.store.findAll(options.filter);
        } else {
          promise = hoodie.store.findAll(type);
        }
      }
      break;
    case 'create':
      promise = hoodie.store.add(type, attributes, storeOptions);
      break;
    case 'update':
      delete attributes._rev;
      promise = hoodie.store.updateOrAdd(type, id, attributes, storeOptions)
      .done(function (attributes) {
        modelOrCollection.set(attributes, {silent: true});
      });
      break;
    case 'delete':
      promise = hoodie.store.remove(type, id, storeOptions);
    }

    if (options.success) {
      promise.done(options.success);
    }

    if (options.error) {
      return promise.fail(options.error);
    }

    // allow for chaining
    return promise;
  }

  var HoodieModel = Backbone.Model.extend({
    /* must be overwritten */
    type: null,

    constructor: function() {
      Backbone.Model.apply( this, arguments );

      if (! this.type) {
        throw new Error('model.type must be set.');
      }
    },

    sync: hoodieSync
  });
  var HoodieCollection = Backbone.Collection.extend({

    constructor: function() {
      var self = this;
      var store;
      var type;
      var hoodieFilter;
      Backbone.Collection.apply( this, arguments );

      type = this.model.prototype.type;
      hoodieFilter = this.hoodie && this.hoodie.filter.bind(this);

      if (! type) {
        throw new Error('collection.model.prototype.type must be set.');
      }

      store = hoodie.store(type);
      store.on('add', function (attributes, options) {
        if (options.backbone) {
          return;
        }

        if (hoodieFilter && hoodieFilter(attributes) === false) {
          return;
        }

        self.add(attributes, {
          remote: options.remote,
          hoodie: true
        });
      });

      store.on('remove', function (attributes, options) {
        var record;

        if (options.backbone) {
          return;
        }

        if (hoodieFilter && hoodieFilter(attributes) === false) {
          return;
        }

        record = self.get(attributes.id);
        if (record) {
          record.destroy({
            remote: options.remote,
            hoodie: true
          });
        }
      });

      store.on('update', function (attributes, options) {
        var record;

        if (options.backbone) {
          return;
        }

        if (hoodieFilter && hoodieFilter(attributes) === false) {
          return;
        }

        record = self.get(attributes.id);
        if (record) {
          record.set(attributes, {
            remote: options.remote,
            hoodie: true
          });
        }
      });

      hoodie.store.on('clear', function() {
        self.reset([], {
          hoodie: true
        });
      });
    },

    sync: hoodieSync
  });

  hoodie.backbone = {
    Model: HoodieModel,
    Collection: HoodieCollection,
  };
});
