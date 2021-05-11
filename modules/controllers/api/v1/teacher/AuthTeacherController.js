const Controller = require(`${config.path.controller}/Controller`);

const SelleruserTransform = require(`${config.path.transform}/v1/SelleruserTransform`);
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
module.exports = new class AuthTeacherController extends Controller {
    register(req, res) {
        this.model.Teacher.findOne({mobile: req.body.mobile}, (err, teacher) => {
            if (err) throw err;
            if (teacher == null) {
                this.model.Teacher({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nationalcode: req.body.nationalcode,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    email: req.body.email,
                    madrak: req.body.madrak,
                    field: req.body.field,
                    cv: req.body.cv,
                    password: req.body.password,
                    profileImage: req.body.profileImage,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'مشخصات مدرس با موفقیت ثبت شد',
                        success: true
                    });
                })
            } else {
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

        this.model.Teacher.findOne({mobile: req.body.mobile}, (err, selleruser) => {
            if (err) throw err;

            if (selleruser == null)
                return res.status(422).json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });

            bcrypt.compare(req.body.password, selleruser.password, (err, status) => {

                if (!status)
                    return res.status(422).json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })


                return res.json({
                    data: new SelleruserTransform().transform(selleruser, true),
                    success: true
                });
            })
        })

    }

    index(req, res) {
        this.model.Teacher.find({}).sort({firstname: -1}).exec((err, teacher) => {
            if (err) throw err;
            if (teacher) {
                return res.json({
                    data: teacher,
                    success: true
                });
            }
            res.json({
                data: 'هیچ مدرسی وجود ندارد',
                success: false
            })
        });
    }
}
