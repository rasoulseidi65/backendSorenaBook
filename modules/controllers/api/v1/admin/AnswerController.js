const Controller = require(`${config.path.controller}/Controller`);
const AnswerTransform = require(`${config.path.transform}/v1/AnswerTransform`);

module.exports = new class AnswerController extends Controller {
    index(req, res) {
        this.model.Answer.find({}).sort({ replay: -1 }).exec((err, answer) => {
            if (err) throw err;
            if (answer) {
                return res.json({
                    data: answer,
                    success: true
                });
            }
            res.json({
                data: 'هیچ پاسخی وجود ندارد',
                success: false
            })
        });
    }
    store(req, res) {
        req.checkBody('name', ' نام نمیتواند خالی بماند').notEmpty();
        req.checkBody('replay', ' متن نمیتواند خالی بماند').notEmpty();
        req.checkBody('comment_Id', 'کد محصول نمیتواند خالی بماند').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        let newComment = new this.model.Answer({
            name: req.body.name,
            replay: req.body.replay,
            comment_Id: req.body.comment_Id,
            date: req.body.date,
            time: req.body.time,

        })
        newComment.save(err => {
            if (err) throw err;
            return res.json({
                data:'پاسخ اظهار نظر با موفقیت ثبت شد',
                success:true
            });
        })
    }
    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Answer.findById(req.params.id, (err, answer) => {
            if (answer) {
                
                return res.json({
                    data: answer,
                    success: true
                })
           
        }
            res.json({
                data: 'پاسخی یافت نشد',
                success: false
            })
        })
    }
  }
