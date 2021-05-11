const Controller = require(`${config.path.controller}/Controller`);
// const ArticleTransform = require(`${config.path.transform}/v1/ArticleTransform`);
module.exports = new class ArticleController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.Article.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ArticleTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'مقاله ای وجود ندارد',
    //                 success : false
    //             })
    //         })
    //
    //         .catch(err => console.log(err));
    //
    // }
    index(req , res) {
        this.model.Article.find({}).sort({title:-1}).exec((err , article) => {
            if(err) throw err;
            if(article) {
                return res.json ({
                    data: article,
                    success: true
                });
            }
            res.json({
                data : 'هیچ مقاله ای وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Article.findById(req.params.id , (err , article) => {
            if(article) {
                return res.json({
                    data : article,
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
        console.log(req.body)
        req.checkBody('title' , 'عنوان مقاله نمیتواند خالی بماند').notEmpty();
        req.checkBody('abstract' , 'چکیده مقاله نمیتواند خالی بماند').notEmpty();
        req.checkBody('author' , 'نویسنده نمیتواند خالی بماند').notEmpty();
        req.checkBody('detail' , ' متن مقاله نمیتواند خالی بماند').notEmpty();
        req.checkBody('date','تاریخ نمیتواند خالی بماند ').notEmpty();

        this.escapeAndTrim(req , 'title abstract   author ');
        if(this.showValidationErrors(req, res))
            return;
        let newArticle = new this.model.Article({
            title : req.body.title,
            abstract : req.body.abstract,
            detail: req.body.detail,
            image : req.body.image,
            author:req.body.author,
            date:req.body.date,
            time:req.body.time
        })
        newArticle.save(err => {
            if(err) throw err;
            res.json({
                data:'مقاله با موفقیت ثبت شد',
                success:true
            });
        })
    }

    update(req ,res) {
        this.model.Article.findByIdAndUpdate(req.body._id ,
            {
                title : req.body.title,
                abstract : req.body.abstract,
                detail: req.body.detail,
                image : req.body.image,
                author:req.body.author,
                date:req.body.date,
                time:req.body.time,
            },
            (err , article) => {
                res.json('ویرایش با موفقیت انجام شد');
            }            );
    }

    destroy(req ,res) {
        console.log(req.params)
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req, res))
            return;

        this.model.Article.findByIdAndRemove(req.params.id , (err , article) => {
            if(err) throw err;
           return  res.json({
               data:'اطلاعات با موفقیت حذف شد',
               success:true
           });
        })
    }
}
