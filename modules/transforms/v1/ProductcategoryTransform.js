const Transform = require('../Transform');

module.exports = class ProductcategoryTransform extends Transform {

    transform(item) {

        return {

            'category_name': item.category_name,
            'sub_category': item.sub_category

        
        }
    }

}