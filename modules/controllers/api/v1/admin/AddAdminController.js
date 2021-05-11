const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');

module.exports = new class AddAdminController extends Controller {
    store(req, res) {
        req.checkBody('mobile', ' موبایل نمیتواند خالی بماند').notEmpty();
        req.checkBody('password', 'پسورد نمیتواند خالی بماند').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        let newUser = new this.model.AdminUser({
            fullName:req.body.fullName,
            mobile: req.body.mobile,
            password: req.body.password,
            

        })
        newUser.save(err => {
            if (err) throw err;
            res.json('ادمین با موفقیت ثبت شد');
        })
    }
    login(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if (this.showValidationErrors(req, res))
            return;

        this.model.AdminUser.findOne({mobile: req.body.mobile}, (err, customeruser) => {
            if (err) throw err;

            if (customeruser == null)
                return res.status(422).json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });

            bcrypt.compare(req.body.password, customeruser.password, (err, status) => {

                if (!status)
                    return res.status(422).json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })


                return res.json({
                    data:customeruser,
                    success: true
                });
            })
        })

    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findByIdAndUpdate(req.params.id,
            {
                fullName:req.body.fullName,
                password: req.body.password,
           
            },
            (err, user) => {
                res.json('ویرایش ادمین با موفقیت انجام شد');
            });
    }



}
