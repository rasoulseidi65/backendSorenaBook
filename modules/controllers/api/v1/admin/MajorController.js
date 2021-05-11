const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class MajorController extends Controller {
    index(req, res) {
        this.model.Major.find({}).populate('Grade Question').exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین رشته تحصیلی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Major.findById(req.params.id, (err, result) => {
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
        req.checkBody('title', ' نام رشته تحصیلی نمیتواند خالی بماند').notEmpty();
        req.checkBody('gradeID', ' نام مقطع تحصیلی نمیتواند خالی بماند').notEmpty();
        req.checkBody('image', ' تصویر نمیتواند خالی بماند').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.Major({
            gradeID:req.body.gradeID,
            title: req.body.title,
            image:req.body.image
        })
        newCategory.save(err => {
            if (err) throw err;
            return res.json({
                data: 'رشته تحصیلی با موفقیت ثبت شد',
                success: true
            })
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Major.findByIdAndUpdate(req.params.id, {
            gradeID:req.body.gradeID,
            title: req.body.title,
            image:req.body.image
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' رشته تحصیلی با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین رشته تحصیلی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Major.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'رشته تحصیلی با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین رشته تحصیلی وجود ندارد',
                success: false
            });
        });
    }
}
