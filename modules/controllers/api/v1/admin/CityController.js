const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CityController extends Controller {
    index(req, res) {
        this.model.City.find({}).sort({ city_name: -1 }).exec((err, city) => {
            if (err) throw err;
            if (city) {
                return res.json({
                    data: city,
                    success: true
                });
            }
            res.json({
                data: 'چنین شهری وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.City.findById(req.params.id, (err, city) => {
            if (city) {
                return res.json({
                    data: city,
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
        req.checkBody('city_name', ' نام شهر نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'city_name');
        if (this.showValidationErrors(req, res))
            return;
        let newCity = new this.model.City({
            city_name: req.body.city_name
        })
        newCity.save(err => {
            if (err) throw err;
            res.json('شهر جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.City.findByIdAndUpdate(req.params.id, {
            active: req.body.active,
        }, (err, city) => {
            if (err) throw err;
            if (city) {
                return res.json({
                    data: ' شهر با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین شهری وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.City.findByIdAndRemove(req.params.id, (err, city) => {
            if (err) throw err;
            if (city) {
                return res.json({
                    data: 'شهر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین شهری وجود ندارد',
                success: false
            });
        });
    }
}