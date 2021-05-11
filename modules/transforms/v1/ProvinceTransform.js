const Transform = require('./../Transform');

module.exports = class CityTransform extends Transform {

    transform(item) {

        return {
            'province_name' : item.province_name

        }
    }

}