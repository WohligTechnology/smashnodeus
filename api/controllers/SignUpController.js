var redirect = "http://tingdom.in/smaaash";
module.exports = {

  save: function (req, res) {
    if (req.body) {
      SignUp.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  demo: function (req, res) {
    var callback = function (err, data) {
      if (err) {
        res.json({
          error: err,
          value: false
        });
      } else {
        res.send(data);
      }
    }
    SignUp.demo(req.body, callback);

  },
  getOne: function (req, res) {

    if (req.body) {
      SignUp.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      SignUp.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function (req, res) {

    if (req.body) {
      SignUp.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  findLimited: function (req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        SignUp.findLimited(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Please provide parameters"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },


  login: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        if (data._id) {
          req.session.user = data;
          res.json({
            data: data,
            value: true
          });
        } else {
          req.session.user = {};
          res.json({
            data: {},
            value: false
          });
        }
      }
    };
    if (req.body) {
      if (req.body.email && req.body.email !== "" && req.body.password && req.body.password !== "") {
        SignUp.login(req.body, callback);
      } else {
        res.json({
          data: "Please provide params",
          value: true
        });
      }
    } else {
      res.json({
        data: "Invalid Call",
        value: true
      });
    }
  },



  // mobile login 

  mobileLogin: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        res.json({
          data: data,
          value: true
        });
      }
    };
    if (req.body) {
      if (req.body.name && req.body.name !== "" && req.body.mobile && req.body.mobile !== "") {
        SignUp.mobileLogin(req.body, callback);
      } else {
        res.json({
          data: "Please provide params",
          value: true
        });
      }
    } else {
      res.json({
        data: "Invalid Call",
        value: true
      });
    }
  },


  //cart
  addToCart: function (req, res) {
    if (req.body.user && req.body.user !== "" && req.body.cart && req.body.cart !== "") {
      SignUp.addToCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  showCart: function (req, res) {
    if (req.body.user && req.body.user !== "") {
      SignUp.showCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  deleteCart: function (req, res) {
    if (req.body.user && req.body.user !== "" && req.body._id && req.body._id !== "") {
      SignUp.deleteCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  totalCart: function (req, res) {
    if (req.body.user && req.body.user !== "") {
      SignUp.totalCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  // wishlist

  addToWishList: function (req, res) {
    if (req.body.user && req.body.user !== "" && req.body.wishList && req.body.wishList !== "") {
      SignUp.addToWishList(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  showWishList: function (req, res) {
    if (req.body.user && req.body.user !== "") {
      SignUp.showWishList(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  forgotPassword: function (req, res) {
    if (req.body.email && req.body.email !== "") {
      SignUp.forgotPassword(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  forgotPasswordSubmit: function (req, res) {
    function callback(err, data) {
      if (data) {
        res.json({
          value: true,
          data: {
            message: "Password Updated"
          }
        });
      } else {
        res.json({
          value: false,
          data: err
        });
      }
    }
    if (req.body.password && req.body.password !== "" && req.body._id && req.body._id !== "") {
      SignUp.forgotPasswordSubmit(req.body, callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  deleteWishList: function (req, res) {
    if (req.body.user && req.body.user !== "" && req.body._id && req.body._id !== "") {
      SignUp.deleteWishList(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  loginFacebook: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        if (data._id) {
          req.session.user = data;
          req.session.save(function (err) {
            if (err) {
              res.json(err);
            } else {
              res.redirect(redirect);
            }
          });
        } else {
          res.json({
            data: "User not found",
            value: false
          });
        }
      }
    };
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_friends', 'email']
    }, callback)(req, res);
  },
  loginGoogle: function (req, res) {
    passport.authenticate('google', {
      scope: "openid profile email"
    })(req, res);
  },
  loginGoogleCallback: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        if (data._id) {
          // console.log("google", data);
          req.session.user = data;
          req.session.save(function (err) {
            if (err) {
              res.json(err);
            } else {
              res.redirect(redirect);
            }
          });
        } else {
          res.json({
            data: "User not found",
            value: false
          });
        }
      }
    }
    passport.authenticate('google', {
      failureRedirect: '/login'
    }, callback)(req, res);
  },
  exportRegisteredUsersExcel: function (req, res) {
    SignUp
      .find({})
      .populate('city')
      .exec(function (err, response) {
        var excelData = [];
        var row = {};
        _.each(response, function (key) {
          console.log(key);
          row = {};
          row = {
            "NAME": key.name,
            "EMAIL": key.email,
            "MOBILE": key.mobile,
            "DOB": key.dob,
            "GENDER": key.gender,
            "PINCODE": key.pincode,
            "DESIGNATION": key.designation,
            "IMAGE": key.profilePic,
            "AVATAR": key.avatar,
            "CITY": key.city.name,
            "TIMESTAMP": key.timestamp,
          };
          excelData.push(row);
        });
        Config.generateExcel("RegisteredUsers", excelData, res);
      });
  },
};
