const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class CourseController extends Controller {


    async store(req, res, next) {
        try {
        let newEpisode = new this.model.Episode({ ...req.body });
        await newEpisode.save();
        if(newEpisode['_doc'].length>0){
            return res.json({
                data:'جلسه با موفقيت ثبت شد',
                success:true
            })
        }
        else
        {
            return res.json({
                data:newEpisode,
                success:true
            })
        }
        } catch(err) {
            next(err);
        }
    }


}

