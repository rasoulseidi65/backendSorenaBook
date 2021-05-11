const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class RatingController extends Controller {
    ProductRating(req, res) {
        //   req.checkParams('product_id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Rating.find({}).sort({}).exec((err, rating) => {
            if (err) throw err;
            if (rating) {
                var sumperproduct = [];
                let sum=0;
                let countproduct=0;
                let count=rating.length;
               // console.log(rating.length)
                for (let i=0;i<=count-1;i++)
                    for (let j=0;j<=count-1;j++){
                        if(rating[i].product_id===rating[j].product_id) {
                            sumperproduct.push(rating[i].product_id);
                        }
                   // sum+=rating[i].starcount;
                }
                return res.json({
                    data: sumperproduct,
                    success: true
                });
            }
            res.json({
                data: 'هیچ اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    singleProductRating(req, res) {
     //   req.checkParams('product_id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Rating.find({product_id:req.params.product_id}).sort({}).exec((err, rating) => {
            if (err) throw err;
            if (rating) {
                let sum=0;
                let count=rating.length;
                for (let i=0;i<=count-1;i++){
                   sum+=rating[i].starcount;
                }
                return res.json({
                    data: sum/count,
                    success: true
                });
            }
            res.json({
                data: 'هیچ اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    singleSellerRating(req, res) {
        //   req.checkParams('product_id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Rating.find({seller_id:req.params.seller_id}).sort({}).exec((err, rating) => {
            if (err) throw err;
            if (rating) {
                let sum=0;
                let count=rating.length;
                for (let i=0;i<=count-1;i++){
                    sum+=rating[i].starcount;
                }
                return res.json({
                    data: sum/count,
                    success: true
                });
            }
            res.json({
                data: 'هیچ اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
    store(req, res) {
        req.checkBody('product_id', ' کد محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('customer_id', ' کد مشتری نمیتواند خالی بماند').notEmpty();
        req.checkBody('seller_id', 'کد فروشنده نمیتواند خالی بماند').notEmpty();
        req.checkBody('starcount', 'امتیاز نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'product_id customer_id seller_id starcount');
        if (this.showValidationErrors(req, res))
            return;
        let newRating = new this.model.Rating({
            product_id: req.body.product_id,
            customer_id: req.body.customer_id,
            seller_id: req.body.seller_id,
            starcount: req.body.starcount,
        })
        newRating.save(err => {
            if (err) throw err;
            res.json('امتیاز با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findByIdAndUpdate(req.params.id,
            {

                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                type:'admin'
            },
            (err, user) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }


    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.AdminUser.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }

}