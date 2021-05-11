const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class HandoutController extends Controller {
    index(req, res) {
        this.model.Handout.find({}).populate('Major').exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین جزوه ای وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Handout.findById(req.params.id, (err, result) => {
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

    findByMajorIDHandout(req, res) {
        this.model.Handout.find({majorID: req.body.majorID}).populate({
            path: 'Major', populate: {
                path: 'Grade',
                Model: 'Grade'
            }
        }).exec((err, result) => {
            if (result != null) {
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
        // req.checkParams('majorID', 'رشته تحصلی  وارد نکردید').notEmpty();
        // req.checkParams('title', 'عنوان  جزوه وارد نکردید').notEmpty();
        // req.checkParams('price', 'قیمت  جزوه وارد نکردید').notEmpty();
        // req.checkParams('linkFile', 'لینک  جزوه وارد نکردید').notEmpty();
        // req.checkParams('countPage', 'تعداد صفحه ها  جزوه وارد نکردید').notEmpty();
        // req.checkParams('author', 'نام مدرس  جزوه وارد نکردید').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.Handout({
            majorID: req.body.majorID,
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            countPage: req.body.countPage,
            author: req.body.author,
            section: req.body.section,
            text: req.body.text,
        })
        newCategory.save(err => {
            if (err) throw err;
            return res.json({
                data: ' نمونه سوال  جدید با موفقیت ثبت شد',
                success: true
            });

        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Handout.findByIdAndUpdate(req.params.id, {
            majorID: req.body.majorID,
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            countPage: req.body.countPage,
            author: req.body.author,
            section: req.body.section,
            text: req.body.text,
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' جزوه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین جزوه ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Handout.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'جزوه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین جزوه وجود ندارد',
                success: false
            });
        });
    }
}
