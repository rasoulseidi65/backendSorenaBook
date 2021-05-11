const Controller = require(`${config.path.controller}/Controller`);
const ProductsTransform = require(`${config.path.transform}/v1/ProductsTransform`);
module.exports = new class ProductsController extends Controller {
    productsBySeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Products.find({seller_id:req.params.id}).sort({ name: -1 }).exec((err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: products,
                    success: true
                });
            }
            res.json({
                data: 'این فروشنده هیچ محصولی ثبت نکرده است',
                success: false
            })
        });
    }
    
    singleProductBySeller(req, res) {
        this.model.Products.find({seller_id:req.body.seller_id,_id:req.body.product_id}).sort({ name: -1 }).exec((err, products) => {
            if (err) throw err;
            if (products.length===0) {
                res.json({
                    data: 'یافت نشد',
                    success: false
                })
            }
            if (products.length===1) {
                return res.json({
                    data: products,
                    success: true
                });
            }
        });
    }

    store(req, res) {
        req.checkBody('category_name', 'دسته محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('sub_category', 'زیر دسته محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('name', 'نام محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('price', 'قیمت محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('metric','واحد حجم محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('description', 'توضیحات محصولات نمی تواند خالی بماند').notEmpty();
        req.checkBody('image_url', ' مسیر عکس محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('materials', ' مواد استفاده شده محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('seller_id', ' شناسه فروشنده ی  محصول نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'seller_id category_name sub_category price name metric description materials');
        if (this.showValidationErrors(req, res))
            return;
        let newProducts = new this.model.Products({
            category_name: req.body.category_name,
            sub_category: req.body.sub_category,
            name: req.body.name,
            price: req.body.price,
            metric: req.body.metric,
            description: req.body.description,
            image_url: req.body.image_url,
            materials: req.body.materials,
            seller_id: req.body.seller_id,

        })
        newProducts.save(err => {
            if (err) throw err;
            res.json('محصول جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Products.findByIdAndUpdate(req.params.id, {

            category_name: req.body.category_name,
            sub_category: req.body.sub_category,
            name: req.body.name,
            price: req.body.price,
            metric: req.body.metric,
            description: req.body.description,
            image_url: req.body.image_url,
            materials: req.body.materials,
            seller_id: req.body.seller_id,
        }, (err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: ' محصول با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Products.findByIdAndRemove(req.params.id, (err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: 'محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }
    
}