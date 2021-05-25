const Controller = require(`${config.path.controller}/Controller`);
const request = require('request-promise');
module.exports = new class PaymentController extends Controller {
    payment(req, res) {
        let params = {
            MerchantID: '07a57b2d-48fd-416c-97b7-9aa686ecb050',
            Amount: req.body.user.price,
            CallbackURL: 'http://api.sorenabook.ir/api/v1/users/payment/checker?price=' +  req.body.user.price + '&',
            Description: 'پرداخت هزینه خرید نمونه سوال',
        };
        let options = {
            method: 'POST',
            uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: params,
            json: true,
        };
        request(options)
            .then(data => {
                if (data.Status === 100) {
                    this.model.Payment({
                        userID: req.body.user.userID,
                        resNumber: data.Authority,
                        price: req.body.user.price,
                        statePayment: 'ناموفق',
                        date:  req.body.user.date,
                        time:  req.body.user.time,
                        mobile: req.body.user.mobile
                    }).save(err => {
                        if (err) {
                            throw err;
                        }
                        else {
                            let countProduct = req.body.product;
                            for (var i = 0; i < countProduct.length; i++) {
                                this.model.Basket({
                                    userID: req.body.user.userID,
                                    productID: req.body.product[i]['cartList']._id,
                                    resNumber: data.Authority,
                                    price: req.body.product[i]['cartList'].price,
                                    date:  req.body.user.date,
                                    time:  req.body.user.time,
                                    statusProduct:req.body.user.statusProduct

                                }).save(err => {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }

                        }

                    });
                    return res.json({
                        data: `https://www.zarinpal.com/pg/StartPay/${data.Authority}`,
                        sucess: true
                    })
                    // return res.redirect(`https://www.zarinpal.com/pg/StartPay/${data.Authority}`)
                }
            })
            .catch(err => res.json(err.message));
    }

    checker(req, res, next) {
        try {
            this.model.Payment.find({ resNumber: req.query.Authority }).exec((err, result) => {
                let params = {
                    MerchantID: '07a57b2d-48fd-416c-97b7-9aa686ecb050',
                    Amount:req.query.price,
                    Authority: req.query.Authority,
                };
                let options = {
                    method: 'POST',
                    uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json',
                    headers: {
                        'cache-control': 'no-cache',
                        'content-type': 'application/json'
                    },
                    body: params,
                    json: true,
                };
                request(options)
                    .then(data => {
                        console.log(data);
                        if (data.Status === 100) {
                            //console.log('تراکنش با موفقیت انجام شد');
                            this.model.Payment.find({ resNumber: req.query.Authority }).exec((err, resultPayment) => {
                                if (resultPayment.length > 0) {
                                    this.model.Payment.updateOne(
                                        { resNumber: req.query.Authority },
                                        { $set: { statusPayment: 'موفق', refID: data.RefID } }).exec((err, result) => {
                                        });
                                    this.model.Basket.find({resNumber: req.query.Authority}).exec((err, resultBasket) => {
                                        if (resultBasket.length > 0) {
                                            this.model.Basket.updateMany(
                                                { resNumber: req.query.Authority},
                                                { $set: { success: 'موفق',refID: data.RefID}}).exec((err, result) => {
                                                if (result) {
                                                    return res.redirect('http://www.sorenabook.ir//#/home/call-back/true');
                                                }
                                            });
                                        }
                                    });

                                }
                            });


                        } else {
                            this.model.Basket.deleteMany({ refID: req.query.Authority }).exec((err, result) => {
                                if (result) {
                                    return res.redirect('http://www.sorenabook.ir//#/home/call-back/false');
                                }
                            })


                        }

                    }).catch(err => {
                        next(err)
                    })

            })

        } catch (err) {
            next(err)
        }
        //this.sendsmsPaymentTracking(data.RefID,mobile);

    }
    sendsmsPaymentTracking = (TransationNum, mobile) => {
        var qs = require("querystring");
        var http = require("http");
        var options = {
            "method": "POST",
            "hostname": "rest.payamak-panel.com",
            "port": null,
            "path": "/api/SendSMS/SendSMS",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                // console.log(body.toString());
            });
        });
        req.write(qs.stringify({
            username: '09211480573',
            password: 'cgbd4h',
            to: mobile,
            from: '5000400010602',
            text: ` کد پیگیری پرداخت شما در آزمون مدارس آموزش پرورش ناحیه یک : ${TransationNum} می باشد `,
            isflash: 'false'
        }));
        req.end();
        return TransationNum;
    }
   
    displayPayment(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Payment.find({ userID: req.params.id, statusPayment: "موفق" }, (err, result) => {
            if (result.length) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }

    /*  checkStatePayment(req,res) {
         this.model.Payment.findOne({mobile: req.body.mobile, nationalCode: req.body.nationalCode}, (err, Payment) => {
             if (err) throw err;
             if (Payment) {
                 return res.json({
                     data: 'یافت شد',
                     status:Payment._doc.statusPayment,
                     success: true
                 });
             }
         })
     }*/

    checkStatePayment(req, res) {
        this.model.Payment.findOne({ nationalCode: req.body.nationalCode, statusPayment: 'موفق' }, (err, Payment) => {
            if (err) throw err;
            if (Payment) {
                return res.json({
                    data: Payment,
                    success: true
                });
            }
            else {
                return res.json({
                    data: Payment,
                    success: false
                });
            }
        })
    }

    trackingPayment(req, res) {
        this.model.Payment.findOne({ resNumber: req.body.resNumber }, (err, Payment) => {
            if (err) throw err;
            if (Payment) {
                return res.json({
                    data: Payment,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }



}
