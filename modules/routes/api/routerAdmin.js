const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdminUser');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadVideo } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//admin controller
const { api: ControllerApi } = config.path.controllers;

const AdminArticleController = require(`${ControllerApi}/v1/admin/ArticleController`);
const AdminProductsController = require(`${ControllerApi}/v1/admin/ProductsController`);
const AdminSliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const AdminAuthAdminController = require(`${ControllerApi}/v1/admin/AuthAdminController`);
const AdminAddAdminController = require(`${ControllerApi}/v1/admin/AddAdminController`);
const AdminUserController = require(`${ControllerApi}/v1/admin/UserController`);
const AdminCustomeruserController = require(`${ControllerApi}/v1/admin/CustomeruserController`);
const AdminAnswerController = require(`${ControllerApi}/v1/admin/AnswerController`);
const AdminCommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const AdminCartcustomController = require(`${ControllerApi}/v1/admin/CartcustomController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const CategoryController = require(`${ControllerApi}/v1/admin/CategoryController`);

//admin router*********************************************
//article
adminRouter.post('/article', AdminArticleController.store.bind(AdminArticleController));
adminRouter.get('/article', AdminArticleController.index.bind(AdminArticleController));
adminRouter.put('/article', AdminArticleController.update.bind(AdminArticleController));
adminRouter.delete('/article/:id', AdminArticleController.destroy.bind(AdminArticleController));

//upload image
adminRouter.post('/image', uploadImage.single('image'), AdminUploadController.uploadImage.bind(AdminUploadController));
adminRouter.post('/multiUpload',uploadFiles,AdminUploadController.uploadFiles.bind(AdminUploadController));

adminRouter.post('/video', uploadVideo.single('video'), AdminUploadController.uploadVideo.bind(AdminUploadController));




//products
router.post('/registerProduct', AdminProductsController.registerProduct.bind(AdminProductsController));
adminRouter.get('/products', AdminProductsController.index.bind(AdminProductsController));
adminRouter.get('/products/:id', AdminProductsController.single.bind(AdminProductsController));
adminRouter.delete('/products/:id', AdminProductsController.destroy.bind(AdminProductsController));

adminRouter.get('/sendemail', AdminProductsController.sendEmail.bind(AdminProductsController));
//feature
router.post('/feature', AdminProductsController.storeFeature.bind(AdminProductsController));
router.post('/featureValue', AdminProductsController.storeFeatureValue.bind(AdminProductsController));
router.post('/productFeature', AdminProductsController.storeProductFeature.bind(AdminProductsController));

router.get('/indexFeature', AdminProductsController.indexFeature.bind(AdminProductsController));
router.post('/indexFeatureValue', AdminProductsController.indexFeatureValue.bind(AdminProductsController));
router.delete('/deleteProductFeature/:id', AdminProductsController.deleteProductFeature.bind(AdminProductsController));
router.delete('/deleteFeature/:id', AdminProductsController.deleteFeature.bind(AdminProductsController));

router.delete('/deleteFeatureValue/:id', AdminProductsController.deleteFeatureValue.bind(AdminProductsController));

router.post('/storeProductFeatureSingle', AdminProductsController.storeProductFeatureSingle.bind(AdminProductsController));

//slider
adminRouter.get('/slider', AdminSliderController.index.bind(AdminSliderController));
adminRouter.get('/slider/:id', AdminSliderController.single.bind(AdminSliderController));
adminRouter.post('/slider', AdminSliderController.store.bind(AdminSliderController));
adminRouter.put('/slider/:id', AdminSliderController.update.bind(AdminSliderController));
adminRouter.delete('/slider/:id', AdminSliderController.destroy.bind(AdminSliderController));

//add admin
adminRouter.post('/addadmin' , AdminAddAdminController.store.bind(AdminAddAdminController));
adminRouter.put('/addadmin/:id' , AdminAddAdminController.update.bind(AdminAddAdminController));

//admin user
adminRouter.get('/adminuser',AdminUserController.index.bind(AdminUserController));
adminRouter.get('/adminuser/:id', AdminUserController.single.bind(AdminUserController));
adminRouter.post('/adminuser', AdminUserController.store.bind(AdminUserController));
adminRouter.put('/adminuser/:id', AdminUserController.update.bind(AdminUserController));
adminRouter.delete('/adminuser/:id', AdminUserController.destroy.bind(AdminUserController));


//customer user
adminRouter.get('/customeruser/:id', AdminCustomeruserController.single.bind(AdminCustomeruserController));

//answer
adminRouter.get('/answer',AdminAnswerController.index.bind(AdminAnswerController));
adminRouter.get('/answer/:id', AdminAnswerController.single.bind(AdminAnswerController));
adminRouter.post('/answer',AdminAnswerController.store.bind(AdminAnswerController));

//comment
adminRouter.get('/comment', AdminCommentController.index.bind(AdminCommentController));
adminRouter.get('/comment/:id', AdminCommentController.single.bind(AdminCommentController));
adminRouter.put('/comment/:id', AdminCommentController.update.bind(AdminCommentController));
adminRouter.delete('/comment/:id', AdminCommentController.destroy.bind(AdminCommentController));

//cartcustom
adminRouter.get('/cartcustom', apiAuthAdminUser,AdminCartcustomController.index.bind(AdminCartcustomController));
adminRouter.get('/cartcustom/:id', AdminCartcustomController.single.bind(AdminCartcustomController));

//category
adminRouter.post('/registerCategory', CategoryController.register.bind(CategoryController));
adminRouter.get('/category', CategoryController.index.bind(CategoryController));
adminRouter.post('/registerSubCategory', CategoryController.registerSubCategory.bind(CategoryController));
adminRouter.get('/subCategory/:id', CategoryController.indexSubCategory.bind(CategoryController));
adminRouter.put('/updateCategory/:id', CategoryController.updateCategory.bind(CategoryController));
adminRouter.get('/searchParentSubCategory/:id', CategoryController.searchParentSubCategory.bind(CategoryController));
adminRouter.delete('/deleteCategory/:id', CategoryController.deleteCategory.bind(CategoryController));
adminRouter.put('/updateSubCategory/:id', CategoryController.updateSubCategory.bind(CategoryController));
adminRouter.delete('/deleteSubCategory/:id', CategoryController.deleteSubCategory.bind(CategoryController));


adminRouter.post('/login', AdminAuthAdminController.login.bind(AdminAuthAdminController));
adminRouter.post('/register', AdminAuthAdminController.register.bind(AdminAuthAdminController));

router.use('', adminRouter);
module.exports = router;
