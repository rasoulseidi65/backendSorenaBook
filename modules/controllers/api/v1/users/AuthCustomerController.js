const Controller = require(`${config.path.controller}/Controller`);
const CustomeruserTransform = require(`${config.path.transform}/v1/CustomeruserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');

module.exports = new class AuthCustomerController extends Controller {
    genarateOTD(req,res){
        return res.json({
            otdCode:randomstring.generate({charset:'123456789',length:5}),
            success: true
        });
    }
    register(req, res) {
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findOne({mobile: req.body.mobile}, (err, CustomerUser) => {
            if (err) throw err;
            if (CustomerUser == null) {
                this.model.CustomerUser({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    mobile: req.body.mobile,
                    profile:req.body.profile,
                    city:req.body.city,
                    state:req.body.state,
                    cardNumber:req.body.cardNumber,
                    accountNumber:req.body.accountNumber,
                    shabaNumber:req.body.shabaNumber,
                    address:req.body.address,
                    password:req.body.password,
                    type:req.body.type,
                    CVpath:req.body.CVpath,
                    madrak:req.body.madrak,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'کاربر با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else {
                return res.json({
                    data: 'شماره همراه قبلا ثبت شده است',
                    success: false
                });
            }
        })
    }

    login(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if (this.showValidationErrors(req, res))
            return;

        this.model.CustomerUser.findOne({mobile: req.body.mobile}, (err, customeruser) => {
            if (err) throw err;

            if (customeruser == null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });

            bcrypt.compare(req.body.password, customeruser.password, (err, status) => {

                if (!status)
                    return res.json({
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
    index(req , res) {
        this.model.CustomerUser.findOne({_id:req.params.id}).sort({firstname:-1}).exec((err , user) => {
            if(err) throw err;
            if(user) {
                return res.json ({
                    data: user,
                    success: true
                });
            }
            res.json({
                data : 'هیچ کاربری وجود ندارد',
                success : false
            })
        });
    }
    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address:req.body.address,
            profile:req.body.profile,
            city:req.body.city,
            state:req.body.state,
            mobile: req.body.mobile,
            cardNumber: req.body.cardNumber,
            accountNumber: req.body.accountNumber,
            shabaNumber: req.body.shabaNumber,
            postalCode:req.body.postalCode

        }, (err, customeruser) => {
            if (err) throw err;
            if (customeruser) {
                return res.json({
                    data: ' اطلاعات مشتری با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین مشتری وجود ندارد',
                success: false
            });
        });
    }

}
