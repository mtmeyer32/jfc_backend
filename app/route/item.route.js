module.exports = function(app) {
 
    const items = require('../controller/item.controller.js');
 
    // Create a new Item
    app.post('/api/inventory/create', items.create);
 
    // Retrieve all Items
    app.get('/api/inventory', items.findAll);
 
    // Retrieve a single Item by Id
    app.get('/api/inventory/:itemId', items.findOne);
	 
    // Update a Item with Id
    app.put('/api/inventory/:itemId', items.update);
 
    // Delete a Item with Id
    app.delete('/api/inventory/:itemId', items.delete);
}