const express = require('express');
const router = express.Router();
const teacherRouter = express.Router();
const apiAuthcustomer = require('./middleware/apiAuthcustomer');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');
const { api: ControllerApi } = config.path.controllers;
const TeacherAuthController = require(`${ControllerApi}/v1/teacher/AuthTeacherController`);


//upload image teacher
// teacherRouter.post('/image', uploadImage.single('image'), CustomerUploadController.uploadImage.bind(CustomerUploadController));

// auth teacher
teacherRouter.post('/login', TeacherAuthController.login.bind(TeacherAuthController));
teacherRouter.post('/register', TeacherAuthController.register.bind(TeacherAuthController));
teacherRouter.get('/index', TeacherAuthController.index.bind(TeacherAuthController));




router.use('', teacherRouter);
module.exports = router;
