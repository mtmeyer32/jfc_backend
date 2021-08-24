const Item = require('../model/item.model.js');

// POST a Item
exports.create = (req, res) => {
    // Create a Item
    const item = new Item({
		name: req.body.title,
		description: req.body.description,
		price: req.body.price,
        qty: req.body.thumb,
        images: req.body.photos
    });
 
    // Save a Item into MongoDB
    item.save()
    .then(item => {
        res.send(item.toClient());
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// FETCH all Items
exports.findAll = (req, res) => {
    console.log("Get all.");
    Item.find()
    .then(items => {		
		let returnedItems = [];
		
		for (let i = 0; i < items.length; i++) {
            console.log("In loop");
			returnedItems.push(items[i].toClient());
		}
		
        res.send(returnedItems);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// FIND a Item
exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });            
        }
        res.send(item.toClient());
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Item with id " + req.params.itemId
        });
    });
};
 
// UPDATE a Item
exports.update = (req, res) => {
    // Find Item and update it
    Item.findOneAndUpdate({ _id: req.params.itemId }, {
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
        thumb: req.body.thumb,
        photos: req.body.photos
    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send(item.toClient());
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Error updating Item with id " + req.params.itemId
        });
    });
};
 
// DELETE a Item
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.ItemId
            });
        }
        res.send({message: "Item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Item with id " + req.params.itemId
        });
    });
};