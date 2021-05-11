// Model
const AdminUser = require(`${config.path.model}/admin_user`);
const CustomerUser = require(`${config.path.model}/customer_user`);
const Comment = require(`${config.path.model}/comment`);
const Answer = require(`${config.path.model}/answer`);
const Teacher = require(`${config.path.model}/teacher`);
const Products = require(`${config.path.model}/products`);
const CartCustom = require(`${config.path.model}/cart_custom`);
const City = require(`${config.path.model}/city`);
const Country = require(`${config.path.model}/country`);
const Slider = require(`${config.path.model}/slider`);
const Province = require(`${config.path.model}/province`);
const Rating = require(`${config.path.model}/rating`);

const Payment = require(`${config.path.model}/payment`);
const Basket = require(`${config.path.model}/basket`);
const Wallet = require(`${config.path.model}/wallet`);

const Article=require(`${config.path.model}/article`);
const Course=require(`${config.path.model}/course`);
const Episode=require(`${config.path.model}/episode`);
const Major=require(`${config.path.model}/major`);
const subCategoryQuestions=require(`${config.path.model}/subCategoryQuestions`);
const Question=require(`${config.path.model}/question`);
const Handout=require(`${config.path.model}/handout`);
const Grade=require(`${config.path.model}/grade`);
const Coupon=require(`${config.path.model}/coupon`);
const FeaturesValue=require(`${config.path.model}/featuresValue`);
const Features=require(`${config.path.model}/features`);
const ProductFeature=require(`${config.path.model}/productFeature`);
const Inventory=require(`${config.path.model}/Inventory`);
const Category = require(`${config.path.model}/category`);
const SubCategory=require(`${config.path.model}/subCategory`);

module.exports = class Controller {
    constructor() {
        this.model = { AdminUser,Course,Episode,Article, CustomerUser,Handout,Grade,Coupon,Basket,
            Comment,Question, Answer, Teacher,  Products, CartCustom, City, Country,FeaturesValue,Features,
            Category,SubCategory,  Inventory,ProductFeature, Slider, Province,Rating  ,Payment,Wallet,Major,subCategoryQuestions}
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }
    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
