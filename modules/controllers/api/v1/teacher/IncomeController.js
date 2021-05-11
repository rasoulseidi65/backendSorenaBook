const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class UploadController extends Controller {
    //موجودی درآمد فروشنده را نشان میدهد
  index(req,res){
      if (this.showValidationErrors(req, res))
          return;
      let query = {};
      if(req.body.seller_id){
          query.seller_id=req.body.seller_id
      }
      this.model.Income.find(query).exec((err,result)=>{
          if(result){
              res.json({
                  data:result,
                  success:true
              })
          }
          else
          {
              res.json({
                  data:'فعلا درآمدی ندارید',
                  success:false
              })
          }
      })
  }
}
