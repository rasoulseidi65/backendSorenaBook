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

}