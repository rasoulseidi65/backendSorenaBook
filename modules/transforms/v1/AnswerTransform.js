const Transform = require('./../Transform');

module.exports = class AnswerTransform extends Transform {

    transform(item) {

        return {
            'user' : item.user,
            'replay' : item.replay
          
        }
    }

}