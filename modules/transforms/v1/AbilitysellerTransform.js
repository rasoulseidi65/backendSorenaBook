const Transform = require('./../Transform');

module.exports = class AbilitysellerTransform extends Transform {

    transform(item) {

        return {

            'id_productcategoriz': item.id_productcategoriz,
            'id_seller': item.id_seller

        
        }
    }

}