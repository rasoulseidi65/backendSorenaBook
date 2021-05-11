const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryQuestionsController extends Controller {
    index(req, res) {
        this.model.Question.find({}).populate('Major Grade').exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین سوالی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Question.findById(req.params.id, (err, result) => {
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
    findByMajorIDQuestion(req, res) {
        this.model.Question.find({majorID:req.body.majorID}).populate('Major').exec((err, result) => {
            if (result!=null) {
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
        req.checkBody('title', ' عنوان نمونه سوال نمیتواند خالی بماند').notEmpty();
        req.checkBody('price', ' قیمت نمیتواند خالی بماند').notEmpty();
        req.checkBody('linkFile', ' آدرس فایل نمیتواند خالی بماند').notEmpty();
        req.checkBody('answer', ' پاسخنامه نمیتواند خالی بماند').notEmpty();
        req.checkBody('typeQuestion', ' نوع سوال نمیتواند خالی بماند').notEmpty();
        req.checkBody('majorID', ' کد رشته تحصیلی نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.Question({
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            count:req.body.count,
            answer:req.body.answer,
            typeQuestion:req.body.typeQuestion,
            text:req.body.text,
            tag:req.body.tag,
            majorID:req.body.majorID

        })
        newCategory.save(err => {
            if (err) {
                return res.json({
                    data: 'اطلاعات نادرست است',
                    success: false
                });
            }
            else {
                return res.json({
                    data: 'نمونه سوال  جدید با موفقیت ثبت شد',
                    success: true
                });
            }
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            count:req.body.count,
            answer:req.body.answer,
            typeQuestion:req.body.typeQuestion,
            text:req.body.text,
            tag:req.body.tag,
            majorID:req.body.majorID
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' نمونه سوال با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین نمونه سواالی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Question.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'نمونه سوال با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین نمونه سوالی وجود ندارد',
                success: false
            });
        });
    }
}
