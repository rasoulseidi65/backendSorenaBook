const Controller = require(`${config.path.controller}/Controller`);
const CommentTransform = require(`${config.path.transform}/v1/CommentTransform`);

module.exports = new class CommentController extends Controller {
   
    index(req, res) {
        this.model.Comment.find({}).sort({createdAt: -1}).exec((err, comment) => {
            if (err) throw err;
            if (comment) {
                return res.json({
                    data: comment,
                    success: true
                });
            }
            res.json({
                data: 'هیچ کامنتی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment.findById(req.params.id, (err, comment) => {
            if (comment) {
                return res.json({
                    data: comment,
                    success: true
                })
        }
            res.json({
                data: 'کامنت یافت نشد',
                success: false
            })
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment.findByIdAndUpdate(req.params.id, {
            active: req.body.active,
        }, (err, comment) => {
            if (err) throw err;
            if (comment) {
                return res.json({
                    data: ' کامنت با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کامنتی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment.findByIdAndRemove(req.params.id, (err, comment) => {
            if (err) throw err;
            if (comment) {
                return res.json({
                    data: 'کامنت با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کامنتی وجود ندارد',
                success: false
            });
        });
    }


}
