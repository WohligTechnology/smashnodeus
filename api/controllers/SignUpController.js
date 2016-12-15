var redirect = "http://tingdom.in/smaaash";
var request = require('request');
var passport = require('passport');

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
    if (req.body) {
      var api = sails.api;
      api = _.assign(api, req.body);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/AddToCartPackage",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        //err
        if (smaaashResponse.AddToCart[0].Status !== 1) {
          res.json({
            value: false,
            data: "Something went wrong!"
          });

        } else if (smaaashResponse.AddToCart[0].Status === 1) {
          // success
          function callback(err, response) {
            if (err) {
              res.json({
                value: false,
                data: err
              });
            } else {
              res.json({
                value: true,
                data: response
              });
            }
          }
          SignUp.addToCart(smaaashResponse, api, callback);
        } else {
          res.json({
            value: false,
            data: "Something went wrong"
          });
        }

      });
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
  profile: function (req, res) {
    if (req.body._id && req.body._id !== '') {
      SignUp.profile(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  updateProfile: function (req, res) {
    if (req.body._id && req.body._id !== '') {
      SignUp.updateProfile(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  CustomerRegistration: function (req, res) {
    if (req.body) {
      var api = sails.api;
      api = _.assign(api, req.body);
      console.log("api");
      console.log(api);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/CustomerRegistration",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        // console.log(body);
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);

        if (smaaashResponse.Registration[0].Status == 3) {
          res.json({
            value: false,
            data: "Customer Already Exists"
          });

        } else if (smaaashResponse.Registration[0].Status == 0) {
          res.json({
            value: false,
            data: smaaashResponse
          });
        } else if (smaaashResponse.Registration[0].Status == 1) {
          SignUp.CustomerRegistration(req.body, api, smaaashResponse, res.callback);
        } else if (smaaashResponse.ErrorStatus[0].Status == 0) {
          res.json({
            value: false,
            data: smaaashResponse
          });
        } else {
          res.json({
            value: false,
            data: "Something Went Wrong"
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  generateOtp: function (req, res) {
    if (req.body.CustomerMobileNo && req.body.CustomerMobileNo !== "" && req.body.OTPFor && req.body.OTPFor !== "") {
      var api = sails.api;
      api = _.assign(api, req.body);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/GenerateOTP",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        if (smaaashResponse.GenerateOTPTable[0].Status == 1) {
          res.json({
            value: true,
            data: smaaashResponse
          });

        } else if (smaaashResponse.GenerateOTPTable[0].Status == 0) {
          res.json({
            value: false,
            data: smaaashResponse
          });
        } else {
          res.json({
            value: false,
            data: "Something went wrong"
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  GetCustomerBookingDetails: function (req, res) {
    if (req.body.CustID && req.body.CustID !== "") {
      var api = sails.api2;
      api = _.assign(api, req.body);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/GetCustomerBookingDetails",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);
        if (smaaashResponse.CustomerBooking == [] || smaaashResponse.ErrorStatus[0].Status == 0) {
          res.json({
            value: false,
            data: smaaashResponse
          });
        } else if (smaaashResponse.CustomerBooking) {
          res.json({
            value: true,
            data: smaaashResponse
          });
        } else {
          res.json({
            value: false,
            data: "Something went wrong"
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  GetCustomerBalance: function (req, res) {
    if (req.body.MobileNo && req.body.MobileNo !== "" && req.body.CardNo && req.body.CardNo !== "") {
      var api = sails.api1;
      api = _.assign(api, req.body);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/GetCustomerBalance",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);
        if (smaaashResponse.CustomerBalance[0].Status == 1) {
          res.json({
            value: true,
            data: smaaashResponse
          });
        } else if (smaaashResponse.CustomerBalance[0].Status == 0) {
          res.json({
            value: false,
            data: smaaashResponse
          });
        } else {
          res.json({
            value: false,
            data: "Something went wrong"
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  VerifyCustomerLogin: function (req, res) {
    if (req.body.UserName && req.body.UserName !== "") {
      var api = sails.api;
      api = _.assign(api, req.body);
      console.log(api);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/VerifyCustomerLogin",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);
        if (smaaashResponse.VerifyCustomerLogin[0].Message === "User name or password Incorrect") {
          res.json({
            value: false,
            data: "User name or password Incorrect"
          });

        } else if (smaaashResponse.VerifyCustomerLogin[0].Message === "Get Customer Data") {
          // send here data from db also
          function callback(err, response) {
            if (err) {
              res.json({
                value: false,
                data: err
              });
            } else {
              res.json({
                value: true,
                data: response
              });
            }
          }
          SignUp.getUserDetails(smaaashResponse, callback);
        } else {
          res.json({
            value: false,
            data: "Something went wrong"
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  RechargeCard: function (req, res) {
    if (req.body.CustomerID && req.body.CustomerID !== "" && req.body.CustomerCardNo && req.body.CustomerCardNo !== "" && req.body.BranchID && req.body.BranchID !== "") {
      var api = sails.api;
      api = _.assign(api, req.body);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/RechargeCard",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        console.log(api);
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);
        if (smaaashResponse.RechargeCard[0].Status == 1) {
          var Orders = {};
          Orders.customerID = req.body.CustomerID;
          Orders.orderno = smaaashResponse.RechargeCard[0].OrderNo;
          // call save api
          function callback(err, newdata) {
            if (err) {
              res.json({
                value: false,
                data: err
              });
            } else {
              res.json({
                value: true,
                data: smaaashResponse
              });
            }
          }
          Order.saveData(Orders, callback);
        } else {
          res.json({
            value: false,
            data: smaaashResponse
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  returnUrlFunction: function (req, res) {
    if (req.body.Status == 1) {
      var successUrl = "http://tingdom.in/smaaashusa/#/thankyou?orderno=" + req.body.OrderNo + "&cnrno=" + req.body.CNR_No + "&amount=" + req.body.PayAmount + "&paymentfor=" + PaymentFor;
      res.redirect(successUrl);
    } else {
      var failureUrl = "http://tingdom.in/smaaashusa/#/sorry?orderno=" + req.body.OrderNo + "&cnrno=" + req.body.CNR_No + "&amount=" + req.body.PayAmount + "&paymentfor=" + PaymentFor;
      res.redirect(failureUrl);
    }
  },
  getOrderDetails: function (req, res) {
    if (req.body.orderid) {
      Order.getOrderDetails(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  returnUrlFunctionForMobile: function (req, res) {
    if (req.body) {
      Order.findOneAndUpdate({
        orderno: req.body.OrderNo
      }, {
        cnrno: req.body.CNR_No,
        amount: req.body.PayAmount,
        status: req.body.Status
      }, {
        new: true
      }, function (err, found) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          if (req.body.Status == 1) {
            var successUrl = "http://wohlig.co.in/paisoapk/success.html?orderid=" + req.body.OrderNo;
            res.redirect(successUrl);
          } else {
            var failureUrl = "http://wohlig.co.in/paisoapk/fail.html?orderid=" + req.body.OrderNo;
            res.redirect(failureUrl);
          }

        }
      });
    } else {
      var failureUrl = "http://wohlig.co.in/paisoapk/fail.html?orderid=0";
      res.redirect(failureUrl);
    }
  },
  getUserNotification: function (req, res) {
    if (req.body.userid && req.body.userid !== '') {
      SignUp.getUserNotification(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  CustomerResetPassword: function (req, res) {
    if (req.body.CustomerID && req.body.CustomerID !== '' && req.body.OldPassword && req.body.OldPassword !== '' && req.body.NewPassword && req.body.NewPassword !== '') {
      var api = sails.api;
      api = _.assign(api, req.body);
      console.log(api);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/CustomerResetPassword",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);
        if ((smaaashResponse.ResetPassword[0].Status == 1) && (smaaashResponse.ResetPassword[0].Message == "Password Reset Successfully")) {
          res.json({
            value: true,
            data: "Password Reset Successful"
          });

        } else if ((smaaashResponse.ResetPassword[0].Status == 0) && (smaaashResponse.ResetPassword[0].Message == "Old Password Or Customer Details Not Currect")) {
          res.json({
            value: false,
            data: "Incorrect Details"
          });
        } else {
          res.json({
            value: false,
            data: "Something Went Wrong!"
          });
        }

      });
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  CustomerForgetPassword: function (req, res) {
    if (req.body) {
      var api = sails.api2;
      api = _.assign(api, req.body);
      request({
        url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/CustomerForgetPassword",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(api)
      }, function (err, httpResponse, body) {
        var smaaashResponse = JSON.parse(JSON.parse(body));
        console.log(smaaashResponse);

        if (smaaashResponse.ForgetPassword) {
          if (smaaashResponse.ForgetPassword[0].Status == 1) {
            res.json({
              value: true,
              data: "Password Send Successfully"
            });

          } else {
            res.json({
              value: false,
              data: "Something went wrong!"
            });
          }
        } else if (smaaashResponse.ErrorStatus) {
          if (smaaashResponse.ErrorStatus[0].Status == 0) {
            res.json({
              value: false,
              data: "Incorrect details!"
            });
          } else {
            res.json({
              value: false,
              data: "Something went wrong!"
            });
          }
        }
      });
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