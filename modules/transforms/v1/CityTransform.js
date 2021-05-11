const Transform = require('./../Transform');

module.exports = class CityTransform extends Transform {

    transform(item) {

        return {
            'city_name' : item.city_name

        }
    }

}