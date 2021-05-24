const express = require('express');
const router = express.Router();
const customerRouter = express.Router();
const apiAuthcustomer = require('./middleware/apiAuthcustomer');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');
//users Controllers
const { api: ControllerApi } = config.path.controllers;
const HomeController = require(`${ControllerApi}/v1/HomeController`);
const CustomerAuthCustomerController = require(`${ControllerApi}/v1/users/AuthCustomerController`);
const CustomerCustomeruserController = require(`${ControllerApi}/v1/users/CustomeruserController`);
const CustomerCommentController = require(`${ControllerApi}/v1/users/CommentController`);
const CustomerAnswerController = require(`${ControllerApi}/v1/users/AnswerController`);
const CustomerUploadController = require(`${ControllerApi}/v1/users/UploadController`);
const CustomerCartcustomController = require(`${ControllerApi}/v1/users/CartcustomController`);
const CustomerProductsController = require(`${ControllerApi}/v1/users/ProductsController`);
const CustomerCityController = require(`${ControllerApi}/v1/users/CityController`);
const CustomerCountryController = require(`${ControllerApi}/v1/users/CountryController`);
const CustomerProvinceController = require(`${ControllerApi}/v1/users/ProvinceController`);
const CustomerRatingController = require(`${ControllerApi}/v1/users/RatingController`);
const ArticleController = require(`${ControllerApi}/v1/users/ArticleController`);
const PaymentController = require(`${ControllerApi}/v1/users/PaymentController`);
const BasketController=require(`${ControllerApi}/v1/users/BasketController`);

//customer router***********************************************

//upload image customer
customerRouter.post('/image', uploadImage.single('image'), CustomerUploadController.uploadImage.bind(CustomerUploadController));


//Article
customerRouter.get('/article', ArticleController.index.bind(ArticleController));
customerRouter.get('/findArticle/:id', ArticleController.single.bind(ArticleController));
customerRouter.get('/newest', ArticleController.newest.bind(ArticleController));
customerRouter.put('/viewCount', ArticleController.updateViewCount.bind(ArticleController));
// auth customer
customerRouter.post('/login', CustomerAuthCustomerController.login.bind(CustomerAuthCustomerController));
customerRouter.post('/register', CustomerAuthCustomerController.register.bind(CustomerAuthCustomerController));
customerRouter.get('/index/:id', CustomerAuthCustomerController.index.bind(CustomerAuthCustomerController));
customerRouter.put('/updateUser/:id', CustomerAuthCustomerController.update.bind(CustomerAuthCustomerController));
//otd code
customerRouter.get('/otd', CustomerAuthCustomerController.genarateOTD.bind(CustomerAuthCustomerController));
//customer user
customerRouter.get('/customeruser/:id', CustomerCustomeruserController.single.bind(CustomerCustomeruserController));
//comment
customerRouter.get('/comment', CustomerCommentController.index.bind(CustomerCommentController));
customerRouter.get('/comment/:id', CustomerCommentController.single.bind(CustomerCommentController));
// customerRouter.post('/comment', CustomerCommentController.AllCommentstoOneProductByseller.bind(CustomerCommentController));
customerRouter.post('/comment', CustomerCommentController.store.bind(CustomerCommentController));

//answer
customerRouter.get('/answer', CustomerAnswerController.index.bind(CustomerAnswerController));
customerRouter.get('/answer/:id', CustomerAnswerController.single.bind(CustomerAnswerController));
//seller user
//cart custom
customerRouter.get('/cartcustom', CustomerCartcustomController.index.bind(CustomerCartcustomController));
customerRouter.post('/cartcustom', CustomerCartcustomController.store.bind(CustomerCartcustomController));
customerRouter.put('/cartcustom/:id', CustomerCartcustomController.update.bind(CustomerCartcustomController));
customerRouter.get('/payment', CustomerCartcustomController.payment.bind(CustomerCartcustomController));
customerRouter.get('/payment/checker', CustomerCartcustomController.checker.bind(CustomerCartcustomController));
customerRouter.get('/paymentCartOrder', CustomerCartcustomController.paymentCartOrder.bind(CustomerCartcustomController));

customerRouter.get('/cartcustom/:id', CustomerCartcustomController.single.bind(CustomerCartcustomController));

//city
customerRouter.get('/city', CustomerCityController.index.bind(CustomerCityController));
customerRouter.get('/city/:id', CustomerCityController.single.bind(CustomerCityController));
//country
customerRouter.get('/country',CustomerCountryController.index.bind(CustomerCountryController));
customerRouter.get('/country/:id', CustomerCountryController.single.bind(CustomerCountryController));
//province
customerRouter.get('/province', CustomerProvinceController.index.bind(CustomerProvinceController));
customerRouter.get('/province/:id', CustomerProvinceController.single.bind(CustomerProvinceController));
//rating
customerRouter.post('/rating', CustomerRatingController.store.bind(CustomerRatingController));
customerRouter.get('/ratingproduct/:product_id', CustomerRatingController.singleProductRating.bind(CustomerRatingController));
customerRouter.get('/ratingseller/:seller_id', CustomerRatingController.singleSellerRating.bind(CustomerRatingController));
customerRouter.get('/allratingproduct', CustomerRatingController.ProductRating.bind(CustomerRatingController));
//filter
customerRouter.get('/SearchFilterMaxPrice', CustomerProductsController.SearchFilterMaxPrice.bind(CustomerProductsController));
customerRouter.get('/SearchFilterMinPrice', CustomerProductsController.SearchFilterMinPrice.bind(CustomerProductsController));
customerRouter.get('/SearchFilterMaxRating', CustomerProductsController.SearchFilterMaxRating.bind(CustomerProductsController));
customerRouter.get('/SearchFilterMinRating', CustomerProductsController.SearchFilterMinRating.bind(CustomerProductsController));
//productWithDetails
customerRouter.get('/productWithDetails', CustomerProductsController.productWithDetails.bind(CustomerProductsController));
customerRouter.get('/bestedProducts', CustomerProductsController.bestedProducts.bind(CustomerProductsController));

customerRouter.get('/productscategory', CustomerProductsController.productsCategory.bind(CustomerProductsController));
customerRouter.get('/products', CustomerProductsController.index.bind(CustomerProductsController));
customerRouter.get('/products/:id', CustomerProductsController.single.bind(CustomerProductsController));

// data home screen
//top products
customerRouter.get('/topproduct', CustomerProductsController.indextopproduct.bind(CustomerProductsController));
//payment
router.post('/payment',PaymentController.payment.bind(PaymentController));
router.get('/payment/checker', PaymentController.checker.bind(PaymentController));
router.get('/displayPayment/:id', PaymentController.displayPayment.bind(PaymentController));
//basket
router.get('/basketList/:id', BasketController.index.bind(BasketController));
router.get('/myPurchases/:id', BasketController.myPurchases.bind(BasketController));
router.get('/mySales/:id', BasketController.mySales.bind(BasketController));
router.use('', customerRouter);
module.exports = router;
