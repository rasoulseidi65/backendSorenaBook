const Controller = require(`${config.path.controller}/Controller`);
const CustomeruserTransform = require(`${config.path.transform}/v1/CustomeruserTransform`);

module.exports = new class CustomeruserController extends Controller {
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
                data: 'خریداری یافت نشد',
                success: false
            })
        })
    }
    
    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findByIdAndUpdate(req.params.id, {

            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address:req.body.address,
            profileurl:req.body.profileurl,
            city_name:req.body.city_name,
            country_name:req.body.country_name,
            province_name:req.body.province_name,
            password:req.body.password,
            mobile: req.body.mobile

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
