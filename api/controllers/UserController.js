var request = require('request');
module.exports = {

  save: function (req, res) {
    if (req.body) {
      User.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {
    if (req.body) {
      User.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      User.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      User.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  register: function (req, res) {
    var callback = function (err, data) {
      if (err) {
        res.json({
          error: err,
          value: false
        });
      } else if (_.isEmpty(data)) {
        res.json({
          error: "User not Registered",
          value: false
        });

      } else {
        req.session.user = data;
        res.json({
          data: "User Registered",
          value: true
        });
      }
    };
    if (req.body) {
      if (req.body.email && req.body.email !== "" && req.body.password && req.body.password !== "") {
        User.register(req.body, callback);
      } else {
        res.json({
          value: false,
          data: "Invalid params"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid call"
      });
    }
  },

  checkOtp: function (req, res) {
    if (req.body) {
      if (req.body.mobile && req.body.otp) {
        User.checkOtp(req.body, function (err, data) {
          if (err) {
            res.json({
              value: false,
              data: err
            });
          } else {
            res.json({
              value: true,
              data: data
            });
          }
        });
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

  profile: function (req, res) {
    var user = req.session.user;
    if (user) {
      res.json({
        data: user,
        value: true
      });
    } else {
      res.json({
        data: "User not logged in",
        value: false
      });
    }
  },
  loginTwitter: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        // console.log(req.session);
        req.session.save(function (err) {
          if (err) {
            res.json(err);
          } else {
            res.json(
              res.redirect(redirect)
            );
          }
        });
      }
    };
    passport.authenticate('twitter', {}, callback)(req, res);
  },

  findLimited: function (req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        User.findLimited(req.body, res.callback);
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


  // EXTERNAL API'S

  checkWithParams1: function (req, res) {

    var api = {
      "APIKey": "afa35e6d32a54d64962a78ccf28c140017636054922421850805185"
    };
    // res.body = {
    //     name: "GetCompanyDetails",
    //     // name:"GetCompanyDetails",
    //     // name:"GetPackageList",
    //     //   name:"GetPackageList",
    //     data: {
    //         // name:"GetAllBranch",
    //         // name:"GetCompanyDetails",

    //         Visitdate: "2016-09-23",
    //         BranchID: "12"
    //     }
    // };
    api = _.assign(api, req.body.data);
    console.log(api);
    request({
      url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/" + req.body.name,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(api)
    }, function (err, httpResponse, body) {
      console.log(body);
      // console.log(err);
      // console.log(httpResponse);
      // console.log(body);
      res.json(JSON.parse(JSON.parse(body)));
    });
  },


  checkWithParams2: function (req, res) {
    // API WITH PARAMS
    var api = {
      "APIkey": "afa35e6d32a54d64962a78ccf28c140017636054922421850805185"
    };
    api = _.assign(api, req.body.data);
    console.log(api);
    request({
      url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/" + req.body.name,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(api)
    }, function (err, httpResponse, body) {
      console.log(body);
      res.json(JSON.parse(JSON.parse(body)));
    });
  },


  //API WITHOUT params
  checkWithoutParams: function (req, res) {
    var api = {
      "APIKey": "afa35e6d32a54d64962a78ccf28c140017636054922421850805185"
    };
    request({
      url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/" + req.body.name,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(api)
    }, function (err, httpResponse, body) {
      res.json(JSON.parse(JSON.parse(body)));
    });
  },

};
