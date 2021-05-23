const Controller = require(`${config.path.controller}/Controller`);
const ProductsTransform = require(`${config.path.transform}/v1/ProductsTransform`);
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
module.exports = new class ProductSellerNewController extends Controller {
    index(req, res) {
        this.model.Products.find({}).sort({name: -1}).populate('ProductFeature').exec((err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: products,
                    success: true
                });
            }
            res.json({
                data: 'هیچ محصولی وجود ندارد',
                success: false
            })
        });
    }

    productWithDetails(req,res){
        let query = {};
        if (req.body._id) {
            query._id = req.body._id;
        }
        this.model.Products.find(query
        ).populate({path:'comments ratings seller', populate: {
                path: 'answer',
            },}).exec((err,result)=>{
            if(result.length) {
                let listfinal=[];
                for(let i = 0; i < result.length; i++) {
                    let list = result[i];
                    let seller=list['seller'];
                    let comment=list['comments'];
                    if (list['ratings'].length > 0) {
                        let rating = [];
                        let x = list['ratings'];
                        for (let j = 0; j < x.length; j++) {
                            rating.push(x[j]['_doc'])
                        }
                        const reduced = rating.reduce(function (m, d) {
                            if (!m[d.product_id]) {
                                m[d.product_id] = {...d, count: 1};
                                return m;
                            }
                            m[d.product_id].starcount += d.starcount;
                            m[d.product_id].count += 1;
                            return m;
                        }, {});

                        const result1 = Object.keys(reduced).map(function (k) {
                            const item = reduced[k];

                            return {
                                seller_id:result[i]['seller_id'],
                                product_id:result[i]['_id'],
                                category_name: result[i]['category_name'],
                                name: result[i]['name'],
                                sub_category: result[i]['sub_category'],
                                price: result[i]['price'],
                                metric: result[i]['metric'],
                                description: result[i]['description'],
                                materials: result[i]['materials'],
                                image_url: result[i]['image_url'],
                                comment:comment,
                                seller:seller,
                                starcount: item.starcount / item.count,

                            }
                        })

                        listfinal.push(result1);


                    } else {

                        listfinal.push(
                            [{
                                seller_id:list['seller_id'],
                                product_id:list['_id'],
                                category_name: list['category_name'],
                                name: list['name'],
                                sub_category: list['sub_category'],
                                price: list['price'],
                                metric: list['metric'],
                                description: list['description'],
                                materials: list['materials'],
                                image_url: list['image_url'],
                                comment:comment,
                                seller:seller,
                                starcount:0,
                            }]

                        );

                    }
                }

                return res.json({
                    data: listfinal,
                    success: true
                });

            }
            res.json({
                data: 'محصول یافت نشد',
                success: false
            })

        })
    }
    productsCategory(req, res) {
        let p = new Object();
        let a=[];
        this.model.Products.find({category_name:req.body.category_name}).aggregate([
            { $lookup:
                    {
                        from: 'SellerUser',
                        localField: 'seller_id',
                        foreignField: '_id',
                        as: 'productstop'
                    }
            }
        ]).toArray(function(err, res) {
            if (err) throw err;
            console.log(JSON.stringify(res));
        }
        ).limit(10).sort({name:-1}).exec((err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: products,
                    success: true
                });
            }
            res.json({
                data: 'هیچ محصولی وجود ندارد',
                success: false
            })
        });
    }
    SearchFilterMaxPrice(req,res){
        let query = {};
        if (req.body.category_name) {
            query.category_name = req.body.category_name;
        }
        if (req.body.name) {
            query.name = req.body.name;
        }
        if (req.body._id) {
            query.seller_id = req.body._id;
        }
        this.model.Products.find(query
        ).sort({price:-1}).populate('ratings').exec((err,result)=>{
            if(result.length) {
                let listfinal=[];
                for(let i = 0; i < result.length; i++) {
                    let list = result[i]
                    if (list['ratings'].length > 0) {
                        console.log('full rating')
                        let rating = [];
                        let x = list['ratings'];

                        for (let j = 0; j < x.length; j++) {
                            rating.push(x[j]['_doc'])

                        }
                        const reduced = rating.reduce(function (m, d) {
                            if (!m[d.product_id]) {
                                m[d.product_id] = {...d, count: 1};
                                return m;
                            }
                            m[d.product_id].starcount += d.starcount;
                            m[d.product_id].count += 1;
                            return m;
                        }, {});

                        const result1 = Object.keys(reduced).map(function (k) {
                            const item = reduced[k];

                            return {
                                seller_id:result[i]['seller_id'],
                                product_id:result[i]['_id'],
                                category_name: result[i]['category_name'],
                                name: result[i]['name'],
                                sub_category: result[i]['sub_category'],
                                price: result[i]['price'],
                                metric: result[i]['metric'],
                                description: result[i]['description'],
                                materials: result[i]['materials'],
                                image_url: result[i]['image_url'],
                                starcount: item.starcount / item.count,

                            }
                        })

                        listfinal.push(result1);


                    } else {

                        listfinal.push(
                            [{
                                seller_id:list['seller_id'],
                                product_id:list['_id'],
                                category_name: list['category_name'],
                                name: list['name'],
                                sub_category: list['sub_category'],
                                price: list['price'],
                                metric: list['metric'],
                                description: list['description'],
                                materials: list['materials'],
                                image_url: list['image_url'],
                                starcount:0,
                            }]

                        );

                    }
                }
                return res.json({
                    data: listfinal,
                    success: true
                });

            }
            res.json({
                data: 'محصول یافت نشد',
                success: false
            })

        })
    }
    SearchFilterMinPrice(req,res){
        let query = {};
        if (req.body.category_name) {
            query.category_name = req.body.category_name;
        }
        if (req.body.name) {
            query.name = req.body.name;
        }
        if (req.body._id) {
            query.seller_id = req.body._id;
        }
        this.model.Products.find(query
        ).sort({price:1}).populate('ratings').exec((err,result)=>{
            if(result.length) {
                let listfinal=[];
                for(let i = 0; i < result.length; i++) {
                    let list = result[i]
                    if (list['ratings'].length > 0) {
                        console.log('full rating')
                        let rating = [];
                        let x = list['ratings'];

                        for (let j = 0; j < x.length; j++) {
                            rating.push(x[j]['_doc'])

                        }
                        const reduced = rating.reduce(function (m, d) {
                            if (!m[d.product_id]) {
                                m[d.product_id] = {...d, count: 1};
                                return m;
                            }
                            m[d.product_id].starcount += d.starcount;
                            m[d.product_id].count += 1;
                            return m;
                        }, {});

                        const result1 = Object.keys(reduced).map(function (k) {
                            const item = reduced[k];

                            return {
                                seller_id:result[i]['seller_id'],
                                product_id:result[i]['_id'],
                                category_name: result[i]['category_name'],
                                name: result[i]['name'],
                                sub_category: result[i]['sub_category'],
                                price: result[i]['price'],
                                metric: result[i]['metric'],
                                description: result[i]['description'],
                                materials: result[i]['materials'],
                                image_url: result[i]['image_url'],
                                starcount: item.starcount / item.count,

                            }
                        })

                        listfinal.push(result1);


                    } else {

                        listfinal.push(
                            [{
                                seller_id:list['seller_id'],
                                product_id:list['_id'],
                                category_name: list['category_name'],
                                name: list['name'],
                                sub_category: list['sub_category'],
                                price: list['price'],
                                metric: list['metric'],
                                description: list['description'],
                                materials: list['materials'],
                                image_url: list['image_url'],
                                starcount:0,
                            }]

                        );

                    }
                }
                return res.json({
                    data: listfinal,
                    success: true
                });

            }
            res.json({
                data: 'محصول یافت نشد',
                success: false
            })

        })
    }
    SearchFilterMaxRating(req,res){
        let query = {};
        if (req.body.category_name) {
            query.category_name = req.body.category_name;
        }
        if (req.body.name) {
            query.name = req.body.name;
        }
        if (req.body._id) {
            query.seller_id = req.body._id;
        }
        this.model.Products.find(query
        ).sort({price:1}).populate('ratings').exec((err,result)=>{
            if(result.length) {
                let listfinal=[];
                for(let i = 0; i < result.length; i++) {
                    let list = result[i]
                    if (list['ratings'].length > 0) {
                        console.log('full rating')
                        let rating = [];
                        let x = list['ratings'];

                        for (let j = 0; j < x.length; j++) {
                            rating.push(x[j]['_doc'])

                        }
                        const reduced = rating.reduce(function (m, d) {
                            if (!m[d.product_id]) {
                                m[d.product_id] = {...d, count: 1};
                                return m;
                            }
                            m[d.product_id].starcount += d.starcount;
                            m[d.product_id].count += 1;
                            return m;
                        }, {});

                        const result1 = Object.keys(reduced).map(function (k) {
                            const item = reduced[k];

                            return {
                                seller_id:result[i]['seller_id'],
                                product_id:result[i]['_id'],
                                category_name: result[i]['category_name'],
                                name: result[i]['name'],
                                sub_category: result[i]['sub_category'],
                                price: result[i]['price'],
                                metric: result[i]['metric'],
                                description: result[i]['description'],
                                materials: result[i]['materials'],
                                image_url: result[i]['image_url'],
                                starcount: item.starcount / item.count,

                            }
                        })

                        listfinal.push(result1);


                    } else {

                        listfinal.push(
                            [{
                                seller_id:list['seller_id'],
                                product_id:list['_id'],
                                category_name: list['category_name'],
                                name: list['name'],
                                sub_category: list['sub_category'],
                                price: list['price'],
                                metric: list['metric'],
                                description: list['description'],
                                materials: list['materials'],
                                image_url: list['image_url'],
                                starcount:0,
                            }]

                        );

                    }
                }
                listfinal.sort(function(a, b) {
                    console.log(a[0]['starcount'])
                    return  b[0]['starcount']-a[0]['starcount'] ;
                });

                return res.json({
                    data: listfinal,
                    success: true
                });

            }
            res.json({
                data: 'محصول یافت نشد',
                success: false
            })

        })

    }
    SearchFilterMinRating(req,res){
        let query = {};
        if (req.body.category_name) {
            query.category_name = req.body.category_name;
        }
        if (req.body.name) {
            query.name = req.body.name;
        }
        if (req.body._id) {
            query.seller_id = req.body._id;
        }
        this.model.Products.find(query
        ).sort({price:1}).populate('ratings').exec((err,result)=>{
            if(result.length) {
                let listfinal=[];
                for(let i = 0; i < result.length; i++) {
                    let list = result[i]
                    if (list['ratings'].length > 0) {
                        console.log('full rating')
                        let rating = [];
                        let x = list['ratings'];

                        for (let j = 0; j < x.length; j++) {
                            rating.push(x[j]['_doc'])

                        }
                        const reduced = rating.reduce(function (m, d) {
                            if (!m[d.product_id]) {
                                m[d.product_id] = {...d, count: 1};
                                return m;
                            }
                            m[d.product_id].starcount += d.starcount;
                            m[d.product_id].count += 1;
                            return m;
                        }, {});

                        const result1 = Object.keys(reduced).map(function (k) {
                            const item = reduced[k];

                            return {
                                seller_id:result[i]['seller_id'],
                                product_id:result[i]['_id'],
                                category_name: result[i]['category_name'],
                                name: result[i]['name'],
                                sub_category: result[i]['sub_category'],
                                price: result[i]['price'],
                                metric: result[i]['metric'],
                                description: result[i]['description'],
                                materials: result[i]['materials'],
                                image_url: result[i]['image_url'],
                                starcount: item.starcount / item.count,

                            }
                        })

                        listfinal.push(result1);


                    } else {

                        listfinal.push(
                            [{
                                seller_id:list['seller_id'],
                                product_id:list['_id'],
                                category_name: list['category_name'],
                                name: list['name'],
                                sub_category: list['sub_category'],
                                price: list['price'],
                                metric: list['metric'],
                                description: list['description'],
                                materials: list['materials'],
                                image_url: list['image_url'],
                                starcount:0,
                            }]

                        );

                    }
                }
                listfinal.sort(function(a, b) {
                    console.log(a[0]['starcount'])
                    return a[0]['starcount'] - b[0]['starcount'];
                });

                return res.json({
                    data: listfinal,
                    success: true
                });

            }
            res.json({
                data: 'محصول یافت نشد',
                success: false
            })

        })

    }
    // productsCategory(req, res) {
    //     let p = new Object();
    //     let a=[];
    //     this.model.Products.find({category_name:req.body.category_name}).limit(2).sort({name:-1}).exec((err, products) => {
    //         if (err) throw err;
    //         if (products) {
    //             a.push(...products)
    //             console.log(a)
    //             return res.json({
    //                 data: products,
    //                 success: true
    //             });
    //         }
    //         res.json({
    //             data: 'هیچ محصولی وجود ندارد',
    //             success: false
    //         })
    //     });
    // }
    //وظیفه این متد این است که لیست محصولات بر اساس ریتینگ مرتب می کند.
    // همچنین اگر نام دسته محصول بهش بدی لیست محصولات با این دسته براتون لیست میکنه
    bestedProducts(req,res) {
        let query = {};
        if (req.body.category_name) {
            query.category_name = req.body.category_name;
        }
        this.model.Products.find(query).populate('ratings seller').exec((err,result)=>{
            if(result.length) {
                let listfinal=[];
                for(let i = 0; i < result.length; i++) {
                    let list = result[i];
                    let seller=list['seller'];
                    if (list['ratings'].length > 0) {

                        let rating = [];
                        let x = list['ratings'];

                        for (let j = 0; j < x.length; j++) {
                            rating.push(x[j]['_doc'])

                        }
                        const reduced = rating.reduce(function (m, d) {
                            if (!m[d.product_id]) {
                                m[d.product_id] = {...d, count: 1};
                                return m;
                            }
                            m[d.product_id].starcount += d.starcount;
                            m[d.product_id].count += 1;
                            return m;
                        }, {});

                        const result1 = Object.keys(reduced).map(function (k) {
                            const item = reduced[k];

                            return {

                                product_id:result[i]['_id'],
                                category_name: result[i]['category_name'],
                                name: result[i]['name'],
                                sub_category: result[i]['sub_category'],
                                price: result[i]['price'],
                                metric: result[i]['metric'],
                                description: result[i]['description'],
                                materials: result[i]['materials'],
                                image_url: result[i]['image_url'],
                                seller:seller,
                                starcount: item.starcount / item.count,

                            }
                        })

                        listfinal.push(result1);


                    } else {

                        listfinal.push(
                            [{

                                product_id:list['_id'],
                                category_name: list['category_name'],
                                name: list['name'],
                                sub_category: list['sub_category'],
                                price: list['price'],
                                metric: list['metric'],
                                description: list['description'],
                                materials: list['materials'],
                                image_url: list['image_url'],
                                seller:seller,
                                starcount:0,
                            }]

                        );

                    }
                }
                listfinal.sort(function(a, b) {
                    console.log(a[0]['starcount'])
                    return  b[0]['starcount']-a[0]['starcount'] ;
                });
                return  res.json({
                    data:listfinal,
                    success:true
                })
            }
            })
    }
    indextopproduct(req, res) {
        var xx = [];
        var sum = 0;
        var countrating = 0;
        this.model.Products.find({}).limit(2).sort({name: -1}).exec((err, products) => {
            if (err) throw err;
            if (products) {
                let count = 2;
                for (let i = 0; i <= count - 1; i++) {
                    let id = products[i]._id;
                    products[i] = {...products[i].data, rating: {rating: '5'}};
                    xx.push(products[i]);
                    console.log(products[i].data)
                    this.model.Rating.find({product_id: id}).sort({}).exec((err, rating) => {
                        if (err) throw err;
                        if (rating) {
                            countrating = rating.length;
                            for (let i = 0; i <= countrating - 1; i++) {
                                sum += rating[i].starcount;
                            }
                        }
                    });
                }
                return res.json({
                    rating: sum / count,
                    data: xx,
                    success: true
                });
                // return res.json({
                //     data: products,
                //     success: true
                // });
            }

            // res.json({
            //     data: 'هیچ محصول جدید وجود ندارد',
            //     success: false
            // })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Products.findById(req.params.id, (err, products) => {
            if (products) {
                return res.json({
                    data: products,
                    success: true
                })
            }
            res.json({
                data: 'محصول جدید یافت نشد',
                success: false
            })
        })
    }

}
