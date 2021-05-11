const Controller = require(`${config.path.controller}/Controller`);
const CommentTransform = require(`${config.path.transform}/v1/CommentTransform`);

module.exports = new class CommentController extends Controller {
    AllCommentstoOneProductByseller(req, res) {
        this.model.Comment.find({active: true,seller_id:req.body.seller_id,product_id:req.body.product_id}).sort({name: -1}).exec((err, comment) => {
            if (err) throw err;
            if (comment.length===0) {
                res.json({
                    data: 'یافت نشد',
                    success: false
                })
            }
            if (comment.length>0) {
                return res.json({
                    data: comment,
                    success: true
                });
            }
        });
    }

    index(req, res) {
        this.model.Comment.find({active: true}).populate('answer').sort({createdAt: -1}).exec((err, comment) => {
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
                if (comment.active === true) {
                    return res.json({
                        data: comment,
                        success: true
                    })
                }
            }
            res.json({
                data: 'کامنت یافت نشد',
                success: false
            })
        })
    }
    store(req, res) {
        req.checkBody('fullName', ' نام نمیتواند خالی بماند').notEmpty();
        req.checkBody('text', ' متن نمیتواند خالی بماند').notEmpty();
        req.checkBody('id', 'کد محصول نمیتواند خالی بماند').notEmpty();


        if (this.showValidationErrors(req, res))
            return;
        let newComment = new this.model.Comment({
            fullName: req.body.fullName,
             email: req.body.email,
            text: req.body.text,
              date: req.body.date,
            id: req.body.id,
            
        })
        newComment.save(err => {
            if (err) throw err;
           return res.json({
                data:'اظهار نظر با موفقیت ثبت شد',
                success:true
            });
        })
    }


}
