const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductsController extends Controller {
    index(req, res) {
        this.model.Products.find({}).sort({ name: -1 }).exec((err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: products,
                    success: true
                });
            }
            res.json({
                data: 'هیچ محصولی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Products.findById(req.params.id, (err, products) => {
            if (products) {
                
                return res.json({
                    data: products,
                    success: true
                })
           
        }
            res.json({
                data: 'محصولی یافت نشد',
                success: false
            })
        })
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
