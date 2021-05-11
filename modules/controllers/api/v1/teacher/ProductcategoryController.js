const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductcategoryController extends Controller {

    index(req, res) {
        this.model.ProductCategory.find({}).sort({ category_name: -1 }).exec((err, productcategory) => {
            if (err) throw err;
            if (productcategory) {
                return res.json({
                    data: productcategory,
                    success: true
                });
            }
            res.json({
                data: 'هیچ پاسخی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductCategory.findById(req.params.id, (err, productcategory) => {
            if (productcategory) {
                return res.json({
                    data: productcategory,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    
}