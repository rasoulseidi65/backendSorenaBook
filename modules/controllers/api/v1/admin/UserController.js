const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class UserController extends Controller {
    index(req, res) {
        this.model.AdminUser.find({}).sort({ name: -1 }).exec((err, user) => {
            if (err) throw err;
            if (user) {
                return res.json({
                    data: user,
                    success: true
                });
            }
            res.json({
                data: 'هیچ کاربری وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findById(req.params.id, (err, user) => {
            if (user) {
                return res.json({
                    data: user,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
    store(req, res) {
        req.checkBody('name', ' نام نمیتواند خالی بماند').notEmpty();
        req.checkBody('email', ' ایمیل نمیتواند خالی بماند').notEmpty();
        req.checkBody('password', 'پسورد نمیتواند خالی بماند').notEmpty();




        this.escapeAndTrim(req, 'name email password');
        if (this.showValidationErrors(req, res))
            return;
        let newUser = new this.model.AdminUser({
         
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            type:'admin'
         
         
        })
        newUser.save(err => {
            if (err) throw err;
            res.json('کاربر با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findByIdAndUpdate(req.params.id,
            {
              
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                type:'admin'
            },
            (err, user) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

   
    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.AdminUser.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
   
}