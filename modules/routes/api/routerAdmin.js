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
const AdminCityController = require(`${ControllerApi}/v1/admin/CityController`);
const AdminCountryController = require(`${ControllerApi}/v1/admin/CountryController`);
const AdminProvinceController = require(`${ControllerApi}/v1/admin/ProvinceController`);
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
const CourseController = require(`${ControllerApi}/v1/admin/CourseController`);
const EposideController = require(`${ControllerApi}/v1/admin/EposideController`);
const QuestionController = require(`${ControllerApi}/v1/admin/QuestionsController`);
const MajorController = require(`${ControllerApi}/v1/admin/MajorController`);
const SubCategoryQuestionsController = require(`${ControllerApi}/v1/admin/subCategoryQuestionsController`);
const HandoutController = require(`${ControllerApi}/v1/admin/HandoutController`);
const GradeController = require(`${ControllerApi}/v1/admin/GradeController`);
//admin router*********************************************
//article
adminRouter.post('/article', AdminArticleController.store.bind(AdminArticleController));
adminRouter.get('/article', AdminArticleController.index.bind(AdminArticleController));
adminRouter.put('/article', AdminArticleController.update.bind(AdminArticleController));
adminRouter.delete('/article/:id', AdminArticleController.destroy.bind(AdminArticleController));

//upload image
adminRouter.post('/image', uploadImage.single('image'), AdminUploadController.uploadImage.bind(AdminUploadController));

adminRouter.post('/video', uploadVideo.single('video'), AdminUploadController.uploadVideo.bind(AdminUploadController));

//course

adminRouter.post('/course',CourseController.store.bind(CourseController));
adminRouter.get('/index',CourseController.index.bind(CourseController));
adminRouter.post('/single',CourseController.single.bind(CourseController));

//episode
adminRouter.post('/episode',EposideController.store.bind(EposideController));


//City
adminRouter.get('/City', apiAuthAdminUser,AdminCityController.index.bind(AdminCityController));
adminRouter.get('/City/:id', AdminCityController.single.bind(AdminCityController));
adminRouter.post('/City', AdminCityController.store.bind(AdminCityController));
adminRouter.put('/City/:id', AdminCityController.update.bind(AdminCityController));
adminRouter.delete('/City/:id', AdminCityController.destroy.bind(AdminCityController));


//country
adminRouter.get('/country', AdminCountryController.index.bind(AdminCountryController));
adminRouter.get('/country/:id', AdminCountryController.single.bind(AdminCountryController));
adminRouter.post('/country', AdminCountryController.store.bind(AdminCountryController));
adminRouter.put('/country/:id', AdminCountryController.update.bind(AdminCountryController));
adminRouter.delete('/country/:id', AdminCountryController.destroy.bind(AdminCountryController));

//province
adminRouter.get('/province', AdminProvinceController.index.bind(AdminProvinceController));
adminRouter.get('/province/:id', AdminProvinceController.single.bind(AdminProvinceController));
adminRouter.post('/province', AdminProvinceController.store.bind(AdminProvinceController));
adminRouter.put('/province/:id', AdminProvinceController.update.bind(AdminProvinceController));
adminRouter.delete('/province/:id', AdminProvinceController.destroy.bind(AdminProvinceController));

//products
adminRouter.get('/products', apiAuthAdminUser,AdminProductsController.index.bind(AdminProductsController));
adminRouter.get('/products/:id', AdminProductsController.single.bind(AdminProductsController));
adminRouter.delete('/products/:id', AdminProductsController.destroy.bind(AdminProductsController));

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

adminRouter.post('/login', AdminAuthAdminController.login.bind(AdminAuthAdminController));
adminRouter.post('/register', AdminAuthAdminController.register.bind(AdminAuthAdminController));

//Questions
adminRouter.get('/question', QuestionController.index.bind(QuestionController));
adminRouter.post('/question', QuestionController.store.bind(QuestionController));
adminRouter.get('/question/:id', QuestionController.single.bind(QuestionController));
adminRouter.delete('/question/:id', QuestionController.destroy.bind(QuestionController));
adminRouter.post('/findByMajorIDQuestion', QuestionController.findByMajorIDQuestion.bind(QuestionController));

//CategoryQuestions and subCategory
adminRouter.get('/major', MajorController.index.bind(MajorController)
);
adminRouter.post('/major', MajorController.store.bind(MajorController));
adminRouter.get('/major/:id', MajorController.single.bind(MajorController));
adminRouter.delete('/major/:id', MajorController.destroy.bind(MajorController));

adminRouter.get('/subCategoryQuestions', SubCategoryQuestionsController.index.bind(SubCategoryQuestionsController));
adminRouter.post('/subCategoryQuestions', SubCategoryQuestionsController.store.bind(SubCategoryQuestionsController));
adminRouter.get('/subCategoryQuestions/:id', SubCategoryQuestionsController.single.bind(SubCategoryQuestionsController));
adminRouter.delete('/subCategoryQuestions/:id', SubCategoryQuestionsController.destroy.bind(SubCategoryQuestionsController));

//handout
adminRouter.get('/handout', HandoutController.index.bind(HandoutController));
adminRouter.post('/handout', HandoutController.store.bind(HandoutController));
adminRouter.get('/handout/:id', HandoutController.single.bind(HandoutController));
adminRouter.delete('/handout/:id', HandoutController.destroy.bind(HandoutController));
adminRouter.post('/findByMajorIDHandout', HandoutController.findByMajorIDHandout.bind(HandoutController));

//grade
adminRouter.get('/grade', GradeController.index.bind(GradeController));
adminRouter.post('/grade', GradeController.store.bind(GradeController));
adminRouter.get('/grade/:id', GradeController.single.bind(GradeController));
adminRouter.delete('/grade/:id', GradeController.destroy.bind(GradeController));
router.use('', adminRouter);
module.exports = router;
