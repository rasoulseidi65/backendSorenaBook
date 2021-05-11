const Transform = require('./../Transform');

module.exports = class CartcustomTransform extends Transform {

    transform(item) {

        return {

            'countproduct': item.countproduct,
            'date': item.date,
            'time': item.time,
            'description': item.description,
            'state': item.state,
            'price': item.price
        
        }
    }

}