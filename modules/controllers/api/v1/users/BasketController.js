const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class BasketController extends Controller {

    index(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Basket.find({userID:req.params.id,success:'موفق'}).populate('user Question course Payment ').exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom.length>0) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ  وجود ندارد',
                success: false
            })
        });
    }
    myPurchases(req, res) {
        this.model.Basket.find({userID:req.params.id}).populate('user  product Payment ').exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom.length>0) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ  وجود ندارد',
                success: false
            })
        });
    }
    mySales(req, res) {
        this.model.Basket.find({userID:req.params.id,statusProduct:'0'}).populate('user  product Payment ').exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom.length>0) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ  وجود ندارد',
                success: false
            })
        });
    }
}
