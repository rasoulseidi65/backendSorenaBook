const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class BasketController extends Controller {

    index(req, res) {

        this.model.Basket.find({success:'موفق'}).populate('user  product  ').exec((err, cartcustom) => {
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
        this.model.Basket.find({userID:req.params.id,statusProduct:'1'}).populate('user  product   ').exec((err, cartcustom) => {
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
    getOrderByDate(req, res) {
        this.model.Basket.find({userID:req.params.id,date:req.body.date})
            .populate({
                path: 'user product',
                populate: [
                    {
                        path: 'Category',
                        model: 'Category',
                    },
                    {
                        path: 'FeaturesValue',
                        model: 'FeaturesValue',
                    },
                    {
                        path: 'Feature',
                        model: 'Features'

                    }],

            })
            .exec((err, cartcustom) => {
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
        this.model.Basket.find({userID:req.params.id,statusProduct:'0'}).populate('user  product   ').exec((err, cartcustom) => {
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
