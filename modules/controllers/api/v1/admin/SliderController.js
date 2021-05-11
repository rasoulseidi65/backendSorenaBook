const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SliderController extends Controller {
    index(req, res) {
        this.model.Slider.find({}).sort({ title: -1 }).exec((err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: slider,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findById(req.params.id, (err, slider) => {
            if (slider) {
                return res.json({
                    data: slider,
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
        req.checkBody('imageurl', ' تصویر نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'title caption');
        if (this.showValidationErrors(req, res))
            return;
        let newSlider = new this.model.Slider({
            title:req.body.title,
            imageurl: req.body.imageurl
        })
        newSlider.save(err => {
            if (err) throw err;
            return res.json({
                data: ' اسلاید با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndUpdate(req.params.id, {
            title:req.body.title,
            imageurl: req.body.imageurl
        }, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: ' اسلاید با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndRemove(req.params.id, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: 'اسلاید با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
}
