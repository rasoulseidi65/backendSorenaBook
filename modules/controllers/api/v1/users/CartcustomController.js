const Controller = require(`${config.path.controller}/Controller`);
const CartcustomTransform = require(`${config.path.transform}/v1/CartcustomTransform`);
const request = require('request-promise');
module.exports = new class CartcustomController extends Controller {
    // لیست تمام سفارشات بر اساس نوع وضعیت(state) که میتواند گزینه های زیر باشد:
    //1-initial     سفارش های اولیه که هنوز از طرف فروشنده پذیرش نشده اند
    //2-accept        سفارش های که توسط فروشنده پذیرش شده اند
    //3-payment  سفارش های که پرداخت آنها انجام شده
    //4-preparing  سفارشهای که در حال آماده سازی می باشند
    //5-rollbackSeller         سفارشی که توسط فروشنده رد شده است
    //6-sendOrder       سفارش های که ارسال شده است
    //7-receiveOrder
    index(req, res) {
        let query = {};
        if (req.body.state) {
            query.state = req.body.state;
        }
        this.model.CartCustom.find(query).sort({date: -1}).populate('seller product').exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ درخواستی وجود ندارد',
                success: false
            })
        });
    }
//پرداخت سفارش
    paymentCartOrder(req, res) {
        let query = {};
        if (req.body._id) {
            query._id = req.body._id;//کد سفارش
        }
        this.model.CartCustom.find(query).sort({date: -1}).populate('seller product').exec((err, result) => {
            if (result.length > 0) {
                let listOrder=result[0]['_doc'];
                let price=listOrder['price'];
                let seller_id=listOrder['seller_id'];
                let priceFinal=price*listOrder['countProduct'];
                this.model.Wallet.findOne({customer_id:listOrder['customer_id']}).exec((err,resultWallet)=>{
                    if(resultWallet) {
                        let listWallet = resultWallet['_doc'];
                        let Inventory = listWallet['Inventory'];
                        let customer_id=listWallet['customer_id'];
                        if (Inventory >= priceFinal) {
                            //ویرایش کیف پول
                            let InventoryRemaind=Inventory-priceFinal;
                            this.model.Wallet.updateOne(
                                {customer_id: customer_id},
                                {$set: {Inventory:InventoryRemaind }}).exec((err, result) => {

                            })
                            //ویرایش تراکنش
                            this.model.CartCustom.updateOne(
                                {_id: req.body._id},
                                {$set: {state: 'payment'}}).exec((err, result) => {

                            });
                            //ویرایش کیف پول درآمد خریدار
                            this.model.Income.findOne({seller_id:seller_id}).exec((err,resultIncome)=>{
                                if(resultIncome)
                                {
                                   let InventoryRemaind= resultIncome['Inventory']+priceFinal;
                                    this.model.Income.updateOne(
                                        {seller_id: seller_id},
                                        {$set: {Inventory: InventoryRemaind}}).exec((err, result) => {

                                    })
                                }
                                else {
                                    let newIncome = new this.model.Income({//درج اولین تراکنش در کیف پول
                                        seller_id: seller_id,
                                        Inventory: priceFinal,

                                    })
                                    newIncome.save(err => {
                                        if (err) throw err;
                                        console.log('عمل درج در کیف پول انجام شد')
                                    })
                                }
                        })

                            return res.json({
                                data: 'پرداخت با موفقیت انجام شد',
                                success: true
                            })
                        }
                        else
                            {
                                return res.json({
                                    data: 'موجودی کیف پول کافی نیست',
                                    success: false
                                })
                            }

                    }
                    else
                    {
                        res.json({
                            data:'ابتدا کیف پول خود را شارژ کنید',
                            success:false
                        })
                    }
                })
               // console.log(priceFinal)
            }
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CartCustom.findByIdAndUpdate(req.params.id,
            {
                state: req.body.state,
            },
            (err, result) => {
                if (result) {
                    switch (req.body.state) {
                        case 'rollbackUser':
                            res.json({
                                data: 'سفارش رد می شود',
                                success: true
                            });
                            break;
                        case 'receiveOrder':
                            res.json({
                                data: 'سفارش دریافت شد',
                                success: true
                            });
                            break;
                    }

                } else {
                    res.json({
                        data: 'وضعیت تراکنش را وارد نمائید',
                        success: false
                    });
                }
            });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CartCustom.findById(req.params.id, (err, cartcustom) => {
            if (cartcustom) {

                return res.json({
                    data: cartcustom,
                    success: true
                })

            }
            res.json({
                data: 'درخواست یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        // req.checkBody('product_id', ' کد محصول نمیتواند خالی بماند').notEmpty();
        // req.checkBody('customer_id', ' کد مشتری نمیتواند خالی بماند').notEmpty();
        // req.checkBody('seller_id', 'کد فروشنده نمیتواند خالی بماند').notEmpty();
        // req.checkBody('starcount', 'امتیاز نمیتواند خالی بماند').notEmpty();

        // this.escapeAndTrim(req, 'product_id customer_id seller_id starcount');
        // if (this.showValidationErrors(req, res))
        //     return;
        let newCartCustomer = new this.model.CartCustom({
            seller_id: req.body.seller_id,
            customer_id: req.body.customer_id,
            product_id: req.body.product_id,
            countProduct: req.body.countProduct,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
            state: req.body.state,
            price: req.body.price,
        })
        newCartCustomer.save(err => {
            if (err) throw err;
            res.json({
                    data: 'سفارش جدید با موفقیت ثبت شد',
                    success: true
                }
            );
        })
    }

    payment(req, res) {
        let params = {
            MerchantID: 'c6691b74-60ad-11ea-8901-000c295eb8fc',
            Amount: req.query['price'],
            CallbackURL: 'http://192.168.1.3:3000/api/v1/customer/payment/checker',
            Description: 'شارژ کیف پول',
            Email: 'ras.seidi65@gmail.com'
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
                // console.log(data);
                if (data.Status === 100) {
                    let paymentSchema = new this.model.Payment({
                        customer_id: req.query['customer_id'],//کد مشتری
                        resNumber: data.Authority,
                        price: req.query['price'],
                        statePayment: false,
                        date: req.query['date'],
                        time: req.query['time']
                    });
                    paymentSchema.save();
                    res.redirect(`https://www.zarinpal.com/pg/StartPay/${data.Authority}`)
                }

            })
            .catch(err => res.json(err.message));

    }

    checker(req, res, next) {
        try {
            this.model.Payment.find({resNumber: req.query.Authority}).exec((err, result) => {
                let params = {
                    MerchantID: 'c6691b74-60ad-11ea-8901-000c295eb8fc',
                    Amount: result[0]['price'],
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
                        if (data.Status === 100) {
//
                            this.model.Payment.find({resNumber: req.query.Authority}).exec((err, resultPayment) => {
                                if (resultPayment.length > 0) {
                                    this.model.Payment.updateOne(
                                        {resNumber: req.query.Authority},
                                        {$set: {statusPayment: 'موفق'}}).exec((err, result) => {

                                    });
                                    console.log('update payment to success');

                                }
                            });
                            //
                            //تراکنش با موفقیت انجام شد
                            //ثبت پول پرداختی در کیف پول مشتری
                            //ابتدا چک میکنیم که مشتری قبلا کیف پول داره یا نه. اگر داشته باشه ،پول با مقدار قبلی کیف پول جمع میشه و آپدیت میشه
                            this.model.Wallet.find({customer_id: result[0]['customer_id']}).exec((err, resultFind) => {

                                if (resultFind.length > 0) {
                                    let r = resultFind[0]['_doc'];

                                    let oldInventory = r['Inventory'];
                                    ;
                                    let Inventory = oldInventory + result[0]['price'];
                                    this.model.Wallet.updateOne(
                                        {customer_id: result[0]['customer_id']},
                                        {$set: {Inventory: Inventory}}).exec((err, result) => {

                                    });
                                } else {
                                    let newWallet = new this.model.Wallet({//درج اولین تراکنش در کیف پول
                                        customer_id: result[0]['customer_id'],
                                        Inventory: result[0]['price'],
                                        resNumber: req.query.Authority
                                    })
                                    newWallet.save(err => {
                                        if (err) throw err;
                                        console.log('عمل درج در کیف پول انجام شد')
                                    })
                                }
                            })

                            return res.json({
                                data: 'پرداخت شما با موفقیت انجام شد',
                                sucess: false
                            })
                        } else {
                            res.redirect('daspazapp://people/1');//پرداخت شما با موفقیت لنجام نشد
                        }

                    }).catch(err => {
                    next(err)
                })

            })

        } catch (err) {
            next(err)
        }
    }
}
