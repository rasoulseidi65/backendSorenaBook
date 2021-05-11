const Transform = require('./../Transform');

module.exports = class SliderTransform extends Transform {

    transform(item) {

        return {
            'title': item.title,
            'caption': item.caption,
            'imageurl': item.imageurl
        
        }
    }

}