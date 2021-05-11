const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class MetricController extends Controller {
    index(req, res) {
        this.model.Metric.find({}).sort({metric_name: -1}).exec((err, metric) => {
            if (err) throw err;
            if (metric) {
                return res.json({
                    data: metric,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Metric.findById(req.params.id, (err, metric) => {
            if (metric) {
                return res.json({
                    data: metric,
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