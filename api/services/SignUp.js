var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;
var uniqueValidator = require('mongoose-unique-validator');
var SendGrid = require('sendgrid').SendGrid;
var md5 = require('md5');
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: "",
    unique: true
  },
  password: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  },
  cart: [{
    exploresmash: {
      type: Schema.Types.ObjectId,
      ref: 'ExploreSmash',
      index: true
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      index: true
    },
    quantity: {
      type: Number,
      default: 0
    }
  }],
  wishList: [{
    exploresmash: {
      type: Schema.Types.ObjectId,
      ref: 'ExploreSmash',
      index: true
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      index: true
    }
  }],
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  K120K200: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: false
  },
  pincode: {
    type: Number,
    default: ""
  },
  dob: {
    type: Date,
    default: Date.now
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  profilePic: {
    type: String,
    default: ""
  },
  otp: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  designation: {
    type: String,
    default: ""
  },
  oauthLogin: {
    socialId: String,
    socialProvider: String
  }
});
schema.plugin(uniqueValidator);

module.exports = mongoose.model('SignUp', schema);
var models = {
  saveData: function (data, callback) {
    if (data.password && data.password !== "") {
      data.password = md5(data.password);
    }
    var signup = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).exec(function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (updated) {
          callback(null, updated);
        } else {
          callback(null, {});
        }
      });
    } else {
      signup.save(function (err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          callback(null, created);
          // Email.sendMail(created, 'index', function (err, res) {
          //   // Email.sendMail(created, function (err, res) {
          //   if (err) {
          //     callback(err, null);
          //   } else if (res) {
          //     callback(null, res);
          //   } else {
          //     callback(null, {});
          //   }
          // });
        } else {
          callback(null, {});
        }
      });
    }
  },

  deleteData: function (data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function (err, deleted) {
      if (err) {
        callback(err, null);
      } else if (deleted) {
        callback(null, deleted);
      } else {
        callback(null, {});
      }
    });
  },
  demo: function (data, callback) {
    sails.renderView('email/index', {
      name: "Pooja",
      lastname: "Thakre",
      hobbies: ["cricket", "name", "email", "phone"]
    }, function (err, res) {
      if (err) {
        callback(err, null);
      } else if (res) {
        callback(null, res);
      } else {
        callback(null, {});
      }


    });
  },
  addToCart: function (data, callback) {
    this.update({
        _id: data.user
      }, {
        $push: {
          cart: data.cart
        }
      }, {
        upsert: true
      },
      function (err, res) {
        if (err) {
          callback(err, null);
        } else if (res) {
          callback(null, res);
        } else {
          callback(null, {});
        }
      }
    );

  },
  addToWishList: function (data, callback) {
    this.update({
        _id: data.user
      }, {
        $push: {
          wishList: data.wishList
        }
      }, {
        upsert: true
      },
      function (err, res) {
        if (err) {
          callback(err, null);
        } else if (res) {
          callback(null, res);
        } else {
          callback(null, {});
        }
      }
    );

  },
  showCart: function (data, callback) {
    this.findOne({
      "_id": data.user
    }, {
      "cart": 1
    }).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        SignUp.populate(found, {
          path: "cart.exploresmash"
        }, function (err, res) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, res);
          }
        });
      } else {
        callback(null, {});
      }
    });
  },
  showWishList: function (data, callback) {
    this.findOne({
      "_id": data.user
    }, {
      "wishList": 1
    }).exec(function (err, found) {
      if (err) {
        callback(err, null);
      } else if (found) {
        SignUp.populate(found, {
          path: "wishList.exploresmash"
        }, function (err, res) {
          if (err) {
            callback(err, null);
          } else {
            console.log(res);
            callback(null, res);
          }
        });
      } else {
        callback(null, {});
      }
    });
  },
  deleteCart: function (data, callback) {
    this.update({
      _id: data.user
    }, {
      $pull: {
        cart: {
          _id: data._id
        }
      }
    }, function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, {
          message: "Deleted",
          value: true
        });
      }
    })
  },
  deleteWishList: function (data, callback) {
    this.update({
      _id: data.user
    }, {
      $pull: {
        wishList: {
          _id: data._id
        }
      }
    }, function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, {
          message: "Deleted",
          value: true
        });
      }
    })
  },
  totalCart: function (data, callback) {

    console.log(data);
    SignUp.aggregate([{
      $match: {
        "_id": objectid(data.user)
      }
    }, {
      $unwind: "$cart"
    }, {
      $lookup: {
        from: 'exploresmashes',
        localField: 'cart.exploresmash',
        foreignField: '_id',
        as: 'cart.exploresmash'
      }
    }, {
      $unwind: '$cart.exploresmash'
    }, {
      $group: {
        _id: null,
        "sum": {
          $sum: "$cart.exploresmash.price"
        }
      }
    }]).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found) {
        callback(null, found);
      }
    });
  },
  getAll: function (data, callback) {
    this.find({}).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  forgotPassword: function (data, callback) {
    this.findOne({
      email: data.email
    }).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found) {
        var obj = {};
        obj.name = found.name;
        obj.email = found.email;
        obj.id = found._id;
        obj.link = 'http://tingdom.in/smaaash/#/reset/' + obj.id;
        Email.sendMailWithoutObj(obj, 'forgotPassword', function (err, res) {
          // Email.sendMail(created, function (err, res) {
          if (err) {
            callback(err, null);
          } else if (res) {
            callback(null, res);
          } else {
            callback(null, {});
          }
        });
        // callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  forgotPasswordSubmit: function (data, callback) {
    this.findOneAndUpdate({
      _id: data._id
    }, {
      password: md5(data.password)
    }, function (err, data5) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, data5);
      }
    });
  },

  getOne: function (data, callback) {
    var arr = [];
    var found = {};
    this.findOne({
      "_id": data._id
    }, {
      "password": 0
    }).populate('games', 'hometext').exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found) {
        _.each(found.games, function (n) {
          arr.push(n.hometext);

        });
        y = _.clone(found);
        y._doc.arr = arr;
        callback(null, y._doc);
      } else {
        callback(null, {});
      }
    });
  },
  mobileLogin: function (data, callback) {

    //generate random Number
    var randomNumber = Config.randomNumber();
    // check first mobile number
    SignUp.findOne({
      "mobile": data.mobile
    }).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found) {

        callback(null, found);
      } else {
        callback(null, {
          message: "Number not Found"
        });
      }
    });


  },
  findLimited: function (data, callback) {
    var obj = {};
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    var checkStatus = new RegExp(data.status, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var status = data.status;
    var fromDate = data.fromDate;
    var toDate = data.toDate;
    if (check != "/(?:)/i") {
      obj = {
        $or: [{
          name: {
            '$regex': check
          }
        }, {
          email: {
            '$regex': check
          }
        }]
      };
    } else if (fromDate && toDate) {
      obj.timestamp = {
        "$gte": fromDate,
        "$lte": toDate
      }
    }
    async.parallel([
        function (callback) {
          SignUp.count(obj).exec(function (err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number !== "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function (callback) {
          SignUp.find(obj).populate('city').skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        }
      ],
      function (err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },



  login: function (data, callback) {
    data.password = md5(data.password);
    SignUp.findOne({
      email: data.email,
      password: data.password
    }, function (err, data2) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (_.isEmpty(data2)) {
          SignUp.findOne({
            email: data.email,
            forgotpassword: data.password
          }, function (err, data4) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              if (_.isEmpty(data4)) {
                callback(null, {
                  comment: "User Not Found"
                });
              } else {
                SignUp.findOneAndUpdate({
                  _id: data4._id
                }, {
                  password: data.password,
                  forgotpassword: ""
                }, function (err, data5) {
                  if (err) {
                    console.log(err);
                    callback(err, null);
                  } else {
                    data5.password = "";
                    data5.forgotpassword = "";
                    callback(null, data5);
                  }
                });
              }
            }
          });
        } else {
          SignUp.findOneAndUpdate({
            _id: data2._id
          }, {
            forgotpassword: ""
          }, function (err, data3) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              data3.password = "";
              data3.forgotpassword = "";
              callback(null, data3);
            }
          });
        }
      }
    });
  },
};

module.exports = _.assign(module.exports, models);
