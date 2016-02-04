'use strict';
var name_validator = function(v){
    return /^[A-Za-z '-]+$/.test(v)
};
// to be honest I didn't created this regex :)
var email_validator = function(e) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(e);
}

/**
 * @apiDefine Params
 * @apiSuccess {String} forename Firstname of the User.
 * @apiSuccess {String} surname Lastname of the User.
 * @apiSuccess {String} email Email of the User.
 */
var user_struct = {
    forename: {
        type: String,
        validate: {
            validator: name_validator
        },
        required: true,
        default: undefined
    },
    email: {
        type: String,
        validate: {
            validator: email_validator
        },
        required: true,
        index: {unique: true},
        default: undefined
    },
    surname: {
        type: String,
        validate: {
            validator: name_validator
        },
        required:true,
        default:undefined
    },
    created: Date
};


module.exports = function(mongoose){
    var content = {};
    var user_schema = mongoose.Schema(user_struct);
    /** let's add a method to check integrity */
    user_schema.pre('save', function (next) {
      if (!this.created) this.created = new Date;
      next();
    });

    var user = mongoose.model('User', user_schema);
    /** defining our schema and model */

    content.model = {User:user};

    /**
     * @api {put}  /user/:id Update User
     * @apiName PutUser
     * @apiGroup User
     * @apiError UserNotFound This User has not been found.
     * @apiParam {String} forename
     * @apiParam {String} surname
     * @apiParam {String} email
     * @apiUse Params
     * @apiSuccess {Date} created Date of creation of this User.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "forename": "John",
     *       "surname": "Doe",
     *       "email": "John.Doe@hx.uk"
     *       "created": "2016-02-04T12:58:50.395Z"
     *     }
     */

    content.put = function(req, res) {
        user.findOneAndUpdate({_id: req.params.id}, req.body, {upsert:true}, function(err, obj){
            if (err) return res.status(500).json(err);
            if (obj === null) {
                res.status(404).json({message:"No user("+req.params.id+") found"});
            }
            return res.status(200).json(obj);
        });
    };
    /**
     * @api {get}  /user/:id Retrieve User
     * @apiName GetUser
     * @apiGroup User
     * @apiError UserNotFound This User has not beend found.
     * @apiError InternalServerError Something wrong happened.
     * @apiUse Params
     * @apiSuccess {Date} created Date of creation of this User.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "forename": "John",
     *       "surname": "Doe",
     *       "email": "John.Doe@hx.uk"
     *       "created": "2016-02-04T12:58:50.395Z"
     *     }
     */
    content.get = function(req, res, next) {
        user.findOne({'_id': req.params.id}, function(err, user){
            if (err) {return console.error(err);}
        }).then(function(obj){
            if (obj !== null) {
                res.status(200).json(obj);
            } else {
                res.status(404).json({message: "No user("+req.params.id+") found."});
            }
        }, function(err){
            res.status(500).json({message: "Invalid Id given."});
        });
    };
    /**
     * @api {delete}  /user/:id Delete User
     * @apiError UserNotFound This User has not beend found.
     * @apiName DeleteUser
     * @apiGroup User
     */
    content.delete = function(req, res) {
        var pr = user.remove({ _id: req.params.id }, function(err) {
            if (err) {
                return console.error(err);
            }
        })
        if (pr) {
            pr.then(function(obj){
                res.status(204).json();
            }, function(err) {
                res.status(404).json({message: "You're trying to delete an unexistant resource"});
            });
        }
    };
    /**
     * @api {post}  /user Create User
     * @apiName PostUser
     * @apiGroup User
     * @apiError BadParameters Parameters are not valid.
     * @apiParam {String} forename
     * @apiParam {String} surname
     * @apiParam {String} email
     * @apiUse Params
     * @apiSuccess {Date} created Date of creation of this User.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "forename": "John",
     *       "surname": "Doe",
     *       "email": "John.Doe@hx.uk"
     *       "created": "2016-02-04T12:58:50.395Z"
     *     }
     */
    content.post = function(req, res) {
        var u = new user(req.body);
        u.save(function(err, new_user) {
            if (err) {return console.error(err);}
        }).then(function(obj) {
            res.status(200).json(obj);
        }, function(err){
            res.status(422).json(err);
        });
    };

    return content;
};
