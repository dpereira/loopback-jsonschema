var ItemSchema = require('../domain/item-schema');
var logger = require('../support/logger');


module.exports = {
    handle: function(ljsReq, callback) {
        var collectionName = ljsReq.ljsUrl().collectionName;

        ItemSchema.findByCollectionName(collectionName, function(err, itemSchema) {
            if (err) { return callback(err); }

            if (itemSchema === null) {
                return callback(null);
            }

            var model = itemSchema.constructModel();
            ItemSchema.attachModel(model);

            itemSchema.registerModel(model, function(err) {
                if (err) { return callback(err); }
                logger.info('Loopback Model created for JSON Schema collectionName: ', itemSchema.collectionName);
                callback(null);
            });
        });
    }
};
