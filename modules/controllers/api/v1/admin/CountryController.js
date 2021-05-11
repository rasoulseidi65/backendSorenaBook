const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CountryController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.Country.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new CountryTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'اطلاعاتی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //
    //         .catch(err => console.log(err));
    //
    // }
    index(req, res) {
        this.model.Country.find({}).sort({ country_name: -1 }).exec((err, country) => {
            if (err) throw err;
            if (country) {
                return res.json({
                    data: country,
                    success: true
                });
            }
            res.json({
                data: 'چنین کشوری وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Country.findById(req.params.id, (err, country) => {
            if (country) {
                return res.json({
                    data: country,
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
        req.checkBody('country_name', ' نام کشور نمیتواند خالی بماند').notEmpty();
        

        this.escapeAndTrim(req, 'country_name');
        if (this.showValidationErrors(req, res))
            return;
        let newCountry = new this.model.Country({
            country_name: req.body.country_name

        })
        newCountry.save(err => {
            if (err) throw err;
            res.json('کشور جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Country.findByIdAndUpdate(req.params.id,
            {
                country_name: req.body.country_name
              
            },
            (err, country) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.Country.findByIdAndRemove(req.params.id, (err, country) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}