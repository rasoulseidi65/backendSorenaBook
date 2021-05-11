const Controller = require(`${config.path.controller}/Controller`);
const CustomeruserTransform = require(`${config.path.transform}/v1/CustomeruserTransform`);

module.exports = new class CustomeruserController extends Controller {
    index(req, res) {
        this.model.CustomerUser.find({}).sort({ name: -1 }).exec((err, customeruser) => {
            if (err) throw err;
            if (customeruser) {
                return res.json({
                    data: customeruser,
                    success: true
                });
            }
            res.json({
                data: 'هیچ مشتری وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findById(req.params.id, (err, customeruser) => {
            if (customeruser) {
                
                return res.json({
                    data: customeruser,
                    success: true
                })
           
        }
            res.json({
                data: 'مشتری یافت نشد',
                success: false
            })
        })
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findByIdAndRemove(req.params.id, (err, customeruser) => {
            if (err) throw err;
            if (customeruser) {
                return res.json({
                    data: 'مشتری با موفقیت حذف شد',
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
