const Controller = require(`${config.path.controller}/Controller`);
const SelleruserTransform = require(`${config.path.transform}/v1/SelleruserTransform`);

module.exports = new class SelleruserController extends Controller {
    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Teacher.findById(req.params.id, (err, selleruser) => {
            if (selleruser) {
                return res.json({
                    data: selleruser,
                    success: true
                })
            }
            res.json({
                data: 'خریداری یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('firstname', '  نام فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('lastname', 'نام خانوادگی فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('nationalcode', 'کدملی فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('mobile', 'شماره موبایل فروشنده مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('address', 'آدرس فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('phone', 'شماره تلفن فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('nationalcardurl', '  تصویر کارت ملی نمی تواند خالی بماند').notEmpty();
        req.checkBody('profileurl', 'تصویر پروفایل نمی تواند خالی بماند').notEmpty();
        req.checkBody('certificateurl', ' تصویر شناسنامه نمی تواند خالی بماند').notEmpty();
        req.checkBody('password', '  پسورد نمی تواند خالی بماند').notEmpty();
        req.checkBody('city_name', 'نام شهر نمی تواند خالی بماند').notEmpty();
        req.checkBody('country_name', ' نام کشور نمی تواند خالی بماند').notEmpty();
        req.checkBody('province_name', '  نام استان نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'firstname lastname nationalcode mobile address phone password city_name country_name province_name');
        // if (this.showValidationErrors(req, res))
        //     return;
        let newSellerUser = new this.model.Teacher({

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nationalcode: req.body.nationalcode,
            mobile: req.body.mobile,
            address: req.body.address,
            phone: req.body.phone,
            nationalcardurl: req.body.nationalcardurl,
            profileurl: req.body.profileurl,
            certificateurl: req.body.certificateurl,
            password: req.body.password,
            city_name: req.body.city_name,
            country_name: req.body.country_name,
            province_name: req.body.province_name

        })
        newSellerUser.save(err => {
            if (err) throw err;
            res.json('فروشنده با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Teacher.findByIdAndUpdate(req.params.id, {

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nationalcode: req.body.nationalcode,
            mobile: req.body.mobile,
            address: req.body.address,
            phone: req.body.phone,
            nationalcardurl: req.body.nationalcardurl,
            profileurl: req.body.profileurl,
            certificateurl: req.body.certificateurl,
            password: req.body.password,
            city_name: req.body.city_name,
            country_name: req.body.country_name,
            province_name: req.body.province_name


        }, (err, selleruser) => {
            if (err) throw err;
            if (selleruser) {
                return res.json({
                    data: ' فروشنده با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Teacher.findByIdAndRemove(req.params.id, (err, selleruser) => {
            if (err) throw err;
            if (selleruser) {
                return res.json({
                    data: 'فروشنده با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });
        });
    }

}
