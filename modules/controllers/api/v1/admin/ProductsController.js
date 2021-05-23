const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductsController extends Controller {
    index(req, res) {
        this.model.Products.find({}).sort({name: -1}).populate({
            path: 'Category SubCategory SubSubCategory  Inventory ProductFeature',
            populate: [{
                path: 'FeaturesValue',
                model: 'FeaturesValue',
            },
                {
                    path: 'Feature',
                    model: 'Features'

                }],

        }).exec((err, products) => {
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
                data: 'محصولی یافت نشد',
                success: false
            })
        })
    }
    registerProduct(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newProduct = new this.model.Products({
            categoryID: req.body.categoryID,
            subCategory: req.body.subCategory,
            title: req.body.title,
            count: req.body.count,
            price: req.body.price,
            detail: req.body.detail,
            offer: req.body.offer,
            offerPercent: req.body.offerPercent,
            offerText: req.body.offerText,
            countSell: req.body.countSell,
            topText: req.body.topText,
            date: req.body.date,
            time: req.body.time,
            image: req.body.image,
            gallery: req.body.gallery,
            briefFeature: req.body.briefFeature,
            giftType: req.body.giftType,
            freeSend: req.body.freeSend,
        })
        newProduct.save(err => {
            if (err) {
                throw err;
            }

            this.model.Inventory({
                productID: newProduct._id,
                count: req.body.count,
                date: req.body.date,
                time: req.body.time,
            }).save(err => {
                if (err) {
                    throw err;
                }
                return res.json({
                    data: 'محصول با موفقیت ثبت  شد',
                    result: newProduct,
                    success: true
                });
            });

        })

    }

    updateProduct(req, res) {
        let listFields = {};
        if (req.body.categoryID) {
            listFields.categoryID = req.body.categoryID
        }
        if (req.body.subCategory) {
            listFields.subCategory = req.body.subCategory
        }
        if (req.body.title) {
            listFields.title = req.body.title
        }
        if (req.body.count) {
            listFields.count = req.body.count
        }
        if (req.body.detail) {
            listFields.detail = req.body.detail
        }
        if (req.body.offer) {
            listFields.offer = req.body.offer
        }
        if (req.body.offerPercent) {
            listFields.offerPercent = req.body.offerPercent
        }
        if (req.body.offerText) {
            listFields.offerText = req.body.offerText
        }
        if (req.body.topText) {
            listFields.topText = req.body.topText
        }
        if (req.body.image) {
            listFields.image = req.body.image
        }
        if (req.body.gallery) {
            listFields.gallery = req.body.gallery
        }
        if (req.body.briefFeature) {
            listFields.briefFeature = req.body.briefFeature
        }
        if (req.body.giftType) {
            listFields.giftType = req.body.giftType
        }
        if (req.body.price) {
            listFields.price = req.body.price
        }
        if (req.body.freeSend) {
            listFields.freeSend = req.body.freeSend
        }
        console.log(listFields)
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Product.update({_id: req.params.id},
            // sellerID: req.body.sellerID,
            {$set: listFields}


            , (err, slider) => {
                if (err) throw err;
                if (slider) {
                    return res.json({
                        data: ' محصول با موفقیت آپدیت شد',
                        success: true
                    });
                }
                res.status(404).json({
                    data: 'چنین محصولی وجود ندارد',
                    success: false
                });
            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Products.findByIdAndRemove(req.params.id, (err, products) => {
            if (err) throw err;
            if (products) {
                return res.json({
                    data: 'محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

    async storeFeature(req, res) {
        req.checkBody('titleFarsi', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newFeature = new this.model.Features({...req.body});
        await newFeature.save();

        if (newFeature) {
            return res.json({
                data: 'ویژگی با موفقيت ثبت شد',
                success: true
            })
        } else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }

    async storeFeatureValue(req, res) {
        console.log(req.body)

        let newFeature = new this.model.FeaturesValue({...req.body});
        await newFeature.save();
        if (newFeature) {
            return res.json({
                data: 'مقدار ویژگی با موفقيت ثبت شد',
                success: true
            })
        } else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }

    async storeProductFeature(req, res) {
        console.log(req.body);
        let newFeature;
        for (var i = 0; i < req.body.productFeature.length; i++) {
            newFeature = new this.model.ProductFeature({
                productID: req.body.productID,
                featuresID: req.body.productFeature[i].featuresID,
                valueID: req.body.productFeature[i].valueID,

            }).save();

        }

        if (newFeature) {
            return res.json({
                data: 'ویژگی محصول با موفقيت ثبت شد',
                success: true
            })
        } else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }

    async indexFeature(req, res) {
        let result = await this.model.Features.find().populate('FeaturesValue');
        if (result) {
            return res.json({
                data: result,
                success: true
            })
        } else {
            return res.json({
                data: 'ویژگی وجود ندارد',
                success: false
            })
        }
    }

    async indexFeatureValue(req, res) {
        let result = await this.model.FeaturesValue.find({featuresID: req.body.featuresID});
        if (result) {
            return res.json({
                data: result,
                success: true
            })
        } else {
            return res.json({
                data: 'ویژگی وجود ندارد',
                success: false
            })
        }
    }

    deleteProductFeature(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductFeature.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'ویژگی محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین ویژگی وجود ندارد',
                success: false
            });
        });
    }

    storeProductFeatureSingle(req, res) {
        console.log(req.body);
        let newFeature;

        newFeature = new this.model.ProductFeature({
            productID: req.body.productID,
            featuresID: req.body.featuresID,
            valueID: req.body.valueID,

        }).save();


        if (newFeature) {
            return res.json({
                data: 'ویژگی محصول با موفقيت ثبت شد',
                success: true
            })
        } else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }

    async  sendEmail(req, res) {
        let transporter = nodemailer.createTransport({
            host: 'everest.pws-dns.net',
            port: 587,
            secure: false,
            requireTLS: false,
            auth: {
                user: '_mainaccount@jahantebkhoram.ir', // generated ethereal user
                pass: 'i7j3I5YIuK1w' // generated ethereal password
            },
        });
        let mailOptions = {
            from: 'info@jahantebkhoram.ir', // sender address
            to: "ras.seidi65@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>654646456456888</b>", // html body
        }
        // send mail with defined transport object
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info.response)
            }
        });

    }

  }
// async function  sendemail(){
//     let testAccount = await nodemailer.createTestAccount();
//
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//             user: 'ras.seidi65@gmail.com', // generated ethereal user
//             pass: 'rasmas1365' // generated ethereal password
//         },
//     });
// let mailOptions={
//     from: 'ras.seidi65@gmail.com', // sender address
//     to: "ras.seidi65@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// }
//     // send mail with defined transport object
//      await transporter.sendMail(mailOptions,function (err,info) {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(info.response)
//         }
//     });
//
//     console.log("Message sent: %s");
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
//     // Preview only available when sending through an Ethereal account
//
// }

