const Transform = require('./../Transform');

module.exports = class ProductsTransform extends Transform {

    transform(item) {

        return {
            'category_name': item.category_name,
            'name': item.name,
            'deatilproduct': item.deatilproduct,
            'price': item.price,
            'countproduct': item.countproduct,
            'description': item.description,
            'productimageurl': item.productimageurl

        }
    }

}