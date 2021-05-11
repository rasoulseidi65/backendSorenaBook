const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class CourseController extends Controller {
    async store(req, res, next) {
        try {
            let newCourse1=await this.model.Course({...req.body});
            newCourse1.save();

           return  res.json({
               data:'دوره جدید با موفقیت ثبت شد',
               success:true
           });

        } catch (err) {
            next(err);
        }
    }
    async index(req, res, next) {
        try {
          let result= await this.model.Course.find();
         if(result.length>0){
             return res.json({
                 data:result,
                 success:true
             })

         }
         else {
             return res.json({
                 data:'وجود نداره',
                 success:false
             })
         }

        } catch (err) {
            next(err);
        }
    }
    async single(req, res, next) {
        try {
            let result= await this.model.Course.findOne({_id:req.body._id});
            if(result.lenدgth>0){
                return res.json({
                    data:result,
                    success:true
                })

            }
            else
            {
                return res.json({
                    data:'وجود ندارد',
                    success:false
                })
            }

        } catch (err) {
            next(err);
        }
    }
    // slug(title) {
    //     return title.replace(/([^0-9a-zآ-ی]|-)+/g, '_');
    // }
}

