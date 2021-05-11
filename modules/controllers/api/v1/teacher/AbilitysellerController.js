const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AbilitySellerController extends Controller {
    index(req, res) {
        this.model.AbilitySeller.find({}).sort({ id_seller: -1 }).exec((err, abilityseller) => {
            if (err) throw err;
            if (abilityseller) {
                return res.json({
                    data: abilityseller,
                    success: true
                });
            }
            res.json({
                data: 'چنین توانمندی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AbilitySeller.findById(req.params.id, (err, abilityseller) => {
            if (abilityseller) {
                return res.json({
                    data: abilityseller,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('id_productcategory', ' آیدی دسته محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('id_seller', 'آیدی فروشنده نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'id_productcategory id_seller');
        if (this.showValidationErrors(req, res))
            return;
        let newAbilitySeller = new this.model.AbilitySeller({
            id_productcategory: req.body.id_productcategory,
            id_seller: req.body.id_seller
        })
        newAbilitySeller.save(err => {
            if (err) throw err;
            res.json('توانمندی جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AbilitySeller.findByIdAndUpdate(req.params.id, {
            id_productcategory: req.body.id_productcategory,
            id_seller: req.body.id_seller
        }, (err, abilityseller) => {
            if (err) throw err;
            if (abilityseller) {
                return res.json({
                    data: ' توانایی با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین توانایی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AbilitySeller.findByIdAndRemove(req.params.id, (err, abilityseller) => {
            if (err) throw err;
            if (abilityseller) {
                return res.json({
                    data: 'توانایی با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین توانایی وجود ندارد',
                success: false
            });
        });
    }
}