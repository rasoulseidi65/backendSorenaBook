const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CartcustomController extends Controller {
    index(req, res) {
        // لیست تمام سفارشات بر اساس نوع وضعیت(state) که میتواند گزینه های زیر باشد:
        //1-initial     سفارش های اولیه که هنوز از طرف فروشنده پذیرش نشده اند(سفارش جدید)
        //2-accept        سفارش های که توسط فروشنده پذیرش شده اند
        //3-payment           سفارش های که پرداخت آنها انجام شده
        //4-preparing        سفارشهای که در حال آماده سازی می باشند(سفارش های در حال اماده سازی)
        //5-rollbackCustomer         سفارشی که توسط مشتری رد شده است
        //6-sendOrder       سفارش های که ارسال شده است
        //7-receiveOrder           سفارش های که به سلامت دست مشتری رسیده است (سفارش های قبلی)
        let query = {};
        if (req.body.state) {
            query.state = req.body.state;
        }
        this.model.CartCustom.find(query).sort({ seller_id: -1 }).exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ درخواست سفارشی وجود ندارد',
                success: false
            })
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
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('id_selleruser', ' آیدی فروشنده نمیتواند خالی بماند').notEmpty();
        req.checkBody('id_product', ' آیدی دسته محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('id_customeruser', ' آیدی مشتری نمیتواند خالی بماند').notEmpty();
        req.checkBody('countproduct', ' تعداد محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('date', ' تاریخ نمیتواند خالی بماند').notEmpty();
        req.checkBody('time', ' زمان نمیتواند خالی بماند').notEmpty();
        req.checkBody('description', ' توضیحات نمیتواند خالی بماند').notEmpty();
        req.checkBody('state', ' وضعیت نمیتواند خالی بماند').notEmpty();
        req.checkBody('price', ' قیمت نمیتواند خالی بماند').notEmpty();


        this.escapeAndTrim(req, 'id_selleruser id_productcategori id_customeruser countproduct date time description state price');
        if (this.showValidationErrors(req, res))
            return;
        let newCartCustom = new this.model.CartCustom({
            id_selleruser: req.body.id_selleruser,
            id_customeruser: req.body.id_customeruser,
            id_product: req.body.id_product,
            countproduct: req.body.countproduct,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
            state: req.body.state,
            price: req.body.price
        })
        newCartCustom.save(err => {
            if (err) throw err;
           return  res.json(
                {
                    data:'درخواست سفارش جدید با موفقیت ثبت شد',
                    success:true
                });
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
                if (err) throw err;
                if (result) {
                    switch (req.body.state) {
                        case 'accept':
                            res.json({
                                data: 'سفارش پذیرفته شد',
                                success: true
                            });
                            break;
                        case 'rollbackSeller':
                            res.json({
                                data: 'سفارش رد شد',
                                success: true
                            });
                            break;
                        case 'preparing':
                            res.json({
                                data: 'سفارش در حال آماده سازی می باشد',
                                success: true
                            });
                            break;
                        case 'sendOrder':
                            res.json({
                                data: 'سفارش ارسال شد',
                                success: true
                            });
                            break;
                    }
                }

            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.CartCustom.findByIdAndRemove(req.params.id, (err, cartcustom) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}
