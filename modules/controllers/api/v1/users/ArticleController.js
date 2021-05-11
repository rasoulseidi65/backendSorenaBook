const Controller = require(`${config.path.controller}/Controller`);
// const ArticleTransform = require(`${config.path.transform}/v1/ArticleTransform`);
module.exports = new class ArticleController extends Controller {

    index(req, res) {
        this.model.Article.find({}).sort({createdAt: -1}).exec((err, article) => {
            if (err) throw err;
            if (article) {
                return res.json({
                    data: article,
                    success: true
                });
            }
            res.json({
                data: 'هیچ مقاله ای وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Article.findOne({_id:req.params.id})
            .populate({
                path: 'Comment answer', populate: {
                    path: 'answer',
                    Model: 'Answer'
                }
            })
            .exec((err, article) => {
            if (article) {
                return res.json({
                    data: article,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    updateViewCount(req, res) {
        this.model.Article.findByIdAndUpdate(req.body._id,
            {
                viewCount: req.body.viewCount
            },
            (err, article) => {
                if (err) throw err;
                if (article) {
                    res.json({
                        data: 'ویرایش با موفقیت انجام شد',
                        success: true
                    });
                }
            })

    }

    newest(req, res) {
        this.model.Article.find({}).sort({date: -1}).limit(4).exec((err, article) => {
            if (err) throw err;
            if (article) {
                return res.json({
                    data: article,
                    success: true
                });
            }
            res.json({
                data: 'هیچ مقاله ای وجود ندارد',
                success: false
            })
        });
    }

}
