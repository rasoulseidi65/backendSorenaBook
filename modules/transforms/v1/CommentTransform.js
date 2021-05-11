const Transform = require('./../Transform');

module.exports = class CommentTransform extends Transform {

    transform(item) {

        return {
            'name' : item.name,
            'comment' : item.comment,
            'product_Id' : item.product_Id,
            'active' : item.active,

        }
    }

}