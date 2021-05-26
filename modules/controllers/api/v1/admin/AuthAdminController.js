const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');


module.exports = new class AdminController extends Controller {
    register(req , res) {
        // console.log(req.body.pic1)

        req.checkBody('fullName' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('mobile' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res))
            return;
    
        this.model.AdminUser({
            fullName : req.body.fullName,
            mobile : req.body.mobile,
            password : req.body.password
        }).save(err => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        data : 'ایمیل نمی تواند تکراری باشد',
                        success : false
                    })
                } else {
                    throw err;
                }
            }
       
            return res.json({
                data : 'کاربر با موفقیت  وبسایت شد',
                success : true
            });
        })
    }

    login(req , res) {
        req.checkBody('mobile' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res))
            return;

        this.model.AdminUser.findOne({ mobile : req.body.mobile } , (err , user) => {
            if(err) throw err;

            if(user == null)
                return res.json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });

            bcrypt.compare(req.body.password , user.password , (err , status) => {

                if(! status)
                    return res.json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })


                return res.json({
                    data:user,
                    // data : new UserTransform().transform(user,true),
                    success : true
                });
            })
        })

    }
    uploadImage(req, res) {
// console.log(req.file);
        if (req.file) {
            // console.log(req.file);
            res.json({
                message : 'تصویر با موفقیت آپلود شد',
                imagePath : `${config.host}${config.port}/` + req.file.path.replace(/\\/g , '/'),
                data :req.file,
                success : true,
            })
        } else {
            res.json({
                message: 'فایل شما آپلود نشد',
                success: false
            })
        }
    }

}
