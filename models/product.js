'use strict'

const mongoose = require('mongoose');
const validate = require('mongoose-validator');

var nameValidator = [
    validate({
        validator: 'isAlphanumeric',
        message: 'Name of product must be alphanumeric'
    })
]

var categoryValidator =[
    validate({
        validator: 'isAlpha',
        passIfEmpty: false,
        message: 'Category must be alphabetic.'
    })
]

var priceValidator = [
    validate({
        validator: 'isNumeric',
        message: 'Price must be numeric.'
    })
]

var productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        validator: nameValidator
    },
    category:{
        type: String,
        required: true,
        lowercase: true,
        validator: categoryValidator
    },
    price:{
        type: Number,
        required: true,
        validator: priceValidator
    },
    saleprice:{
        type: Number,
        validator: priceValidator
    },
    details:{
        required: true,
        type: [{}]

    },
    description:{
        type: String,
        required: true,
        lowercase: true

    }
});

productSchema.index({ name: 1, category: 1 }); 

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.addProduct = function(product, callback){

    let query = {name: product.name, category: product.category};
    Product.findOne(query, {}, function(err, data){
        if(err) throw err;
        if(data == null || data == undefined){
            product.save(function(err){
                if (err) {
                    console.log(err);
                    var errString;
                    errString += err.errors.name === undefined? '': err.errors.name.message + '\n';
                    errString += err.errors.price === undefined? '': err.errors.price.message +'\n';
                    errString += err.errors.category === undefined? '': err.errors.category.message + '\n';
                    errString += err.errors.saleprice === undefined? '': err.errors.saleprice.message + '\n';
                    errString += err.errors.details === undefined? '': err.errors.details.message + '\n';
                    errString += err.errors.description === undefined? '': err.errors.description.message + '\n';
                    callback(err.toString());


                }else{
                    callback(false);
                    console.log('Product Added to Database');
                }
            });
            
        }else{
            callback('Product Already Exist');
        }
    });
    
}

module.exports.deleteItem = function(query, callback){

    Product.find(query, {}, function(err, data){
        if(err){
            callback(err.toString());
        }else if(data != undefined){

            Product.remove(query, function(err){
                if(err){
                    callback(err.toString());
                }else{
                    callback(false);
                }
            });

        }else{
            callback('Product not found in database.')
        }
    });
}



module.exports.getAllProducts = function(callback){

    Product.find({}, {}, function(err, data){
        if(err){
            //console.log(err);
            callback(err.toString(), '');
        }else{
            callback(false, JSON.stringify(data, null, ' '));
        }
    })
}




