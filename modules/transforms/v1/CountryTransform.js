const Transform = require('./../Transform');

module.exports = class CountryTransform extends Transform {

    transform(item) {

        return {
            'country_name' : item.country_name
          

        }
    }

}