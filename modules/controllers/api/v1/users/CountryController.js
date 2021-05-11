const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CountryController extends Controller {
    index(req, res) {
        this.model.Country.find({}).sort({ country_name: -1 }).exec((err, country) => {
            if (err) throw err;
            if (country) {
                return res.json({
                    data: country,
                    success: true
                });
            }
            res.json({
                data: 'چنین کشوری وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Country.findById(req.params.id, (err, country) => {
            if (country) {
                return res.json({
                    data: country,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

   
}