const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class GradeController extends Controller {
    index(req, res) {
        this.model.Grade.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین مقطعی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Grade.findById(req.params.id, (err, result) => {
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
        req.checkBody('title', ' نام مقطع نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'title');
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.Grade({
            title: req.body.title,

        })
        newCategory.save(err => {
            if (err) throw err;
            return res.json({
                data: 'مقطعی تحصیلی با موفقیت ثبت شد',
                success: true
            })
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Grade.findByIdAndUpdate(req.params.id, {
            title: req.body.title,

        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' مقطعی تحصیلی با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین مقطعی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Grade.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'مقطعی با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین مقطعی وجود ندارد',
                success: false
            });
        });
    }
}
