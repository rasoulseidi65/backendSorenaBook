const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AnswerController extends Controller {
    index(req , res) {
        this.model.Answer.find({}).sort({replay:-1}).exec((err , answer) => {
            if(err) throw err;
            if(answer) {
                return res.json ({
                    data: answer,
                    success: true
                });
            }
            res.json({
                data : 'هیچ پاسخی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Answer.findById(req.params.id , (err , answer) => {
            if(answer) {
                return res.json({
                    data : answer,
                    success : true
                })
            }
            res.json({
                data : 'یافت نشد',
                success : false
            })
        })
    }

    store(req , res) {
        req.checkBody('name' , ' کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('replay' , 'پاسخ محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('comment_Id' , 'آیدی کامنت نمیتواند خالی بماند').notEmpty();
        req.checkBody('date' , 'تاریخ کامنت نمیتواند خالی بماند').notEmpty();
        req.checkBody('time' , 'زمان کامنت نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'name replay');
        if(this.showValidationErrors(req, res))
            return;
        let newAnswer = new this.model.Answer({
            name : req.body.name,
            replay: req.body.replay,
            date:req.body.date,
            comment_Id: req.body.comment_Id,
            time:req.body.time
        })
        newAnswer.save(err => {
            if(err) throw err;
            res.json('پاسخ با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Answer.findByIdAndUpdate(req.params.id ,
            {
                name : req.body.name,
                replay:req.body.replay,
                date:req.body.date,
                comment_Id:req.body.comment_Id,
                time:req.body.time
            },
            (err , answer) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req, res))
            return;

        this.model.Answer.findByIdAndRemove(req.params.id , (err , answer) => {
            if(err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}
