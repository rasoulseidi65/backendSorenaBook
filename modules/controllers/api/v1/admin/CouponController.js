const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CouponController extends Controller {
    index(req, res) {
        this.model.Coupon.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین کد تخفیفی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Coupon.findById(req.params.id, (err, result) => {
            if (result) {
                return res.json({
                    data: result,
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
        req.checkBody('title', ' نام کد تخفیف نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'title');
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.Coupon({
            title: req.body.title,
            codeCoupon: req.body.codeCoupon,
        })
        newCategory.save(err => {
            if (err) throw err;
            return res.json({
                data: ' کد تخفیف با موفقیت ثبت شد',
                success: true
            })
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Coupon.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            codeCoupon: req.body.codeCoupon,

        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' کد تخفیف با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کد تخفیفی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Coupon.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'کد تخفیف با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کد تخفیفی وجود ندارد',
                success: false
            });
        });
    }
}
