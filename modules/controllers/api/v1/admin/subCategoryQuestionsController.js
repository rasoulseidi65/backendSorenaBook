const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class subCategoryQuestionsController extends Controller {
    index(req, res) {
        this.model.subCategoryQuestions.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین زیر دسته ای وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.subCategoryQuestions.findById(req.params.id, (err, result) => {
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
        req.checkBody('title', ' نام زیر دسته نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'title');
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.subCategoryQuestions({
            title: req.body.title,
            categoryID:req.body.categoryID,
        })
        newCategory.save(err => {
            if (err) throw err;
            res.json('زیر دسته  جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.subCategoryQuestions.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            categoryID:req.body.categoryID,

        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'زیر دسته با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دسته ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.subCategoryQuestions.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'زیر دسته با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دسته وجود ندارد',
                success: false
            });
        });
    }
}
