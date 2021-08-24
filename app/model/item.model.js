const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var itemSchema = new Schema({
    name: String,
	description: String,
    price: String,
    qty: String,
    images: Array
});

itemSchema.method('toClient', function() {
    var obj = this.toObject();
    console.log("toClient"); 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('inventory', itemSchema, 'inventory'); 