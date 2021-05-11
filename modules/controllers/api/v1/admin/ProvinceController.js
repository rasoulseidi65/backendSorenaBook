const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProvinceController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.Province.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ProvinceTransform().withPaginate().transformCollection(result),
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
        this.model.Province.find({}).sort({ province_name: -1 }).exec((err, province) => {
            if (err) throw err;
            if (country) {
                return res.json({
                    data: province,
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
        this.model.Province.findById(req.params.id, (err, province) => {
            if (province) {
                return res.json({
                    data: province,
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
        req.checkBody('province_name', ' نام کشور نمیتواند خالی بماند').notEmpty();
        

        this.escapeAndTrim(req, 'province_name');
        if (this.showValidationErrors(req, res))
            return;
        let newProvince = new this.model.Province({
            province_name: req.body.province_name

        })
        newProvince.save(err => {
            if (err) throw err;
            res.json('کشور جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Province.findByIdAndUpdate(req.params.id,
            {
                province_name: req.body.province_name
              
            },
            (err, province) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.Province.findByIdAndRemove(req.params.id, (err, province) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}