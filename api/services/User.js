var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  points: {
    type: String,
    default: ""
  },
  oauthLogin: {
    type: [{
      socialProvider: String,
      socialId: String,
      modificationTime: Date
    }],
    index: true
  },
  profilePic: {
    type: {
      image: String
    }
  },
  plan: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  mobile: {
    type: Number,
    default: ""
  },
  accesslevel: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: false
  }
});

module.exports = mongoose.model('User', schema);
var models = {
  saveData: function(data, callback) {
    var user = this(data);
    user.timestamp = new Date();
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).exec(function(err, updated) {
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
      user.save(function(err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          callback(null, created);
        } else {
          callback(null, {});
        }
      });
    }
  },
  deleteData: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, deleted) {
      if (err) {
        callback(err, null);
      } else if (deleted) {
        callback(null, deleted);
      } else {
        callback(null, {});
      }
    });
  },
  getAll: function(data, callback) {
    this.find({}).exec(function(err, found) {
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
  getOne: function(data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
      } else {
        callback(null, {});
      }
    });
  },
  updateOtp: function(data, callback) {
    User.update({
      mobile: data.mobile
    }, {
      $set: {
        otp: data.otp
      }
    }).exec(function(err, data3) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (_.isEmpty(data3)) {
        callback("Mobile number not found", null);
      } else {
        callback(null, data3);
      }
    });
  },
  checkOtp: function(data, callback) {
    User.update({
      mobile: data.mobile,
      otp: data.otp
    }, {
      $set: {
        status: true
      }
    }).exec(function(err, data3) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (_.isEmpty(data3)) {
        callback("Invalid Otp", null);
      } else {
        callback(null, data3);
      }
    });
  },
  register: function(data, callback) {
    data.status = false;
    var user = this(data);
    this.count({
      "email": user.email
    }).exec(function(err, data2) {
      if (err) {
        callback(err, data);
      } else {
        if (data2 === 0) {
          user.save(function(err, data3) {
            if (err) {
              callback(err, null);
            } else {
              User.updateOtp({
                mobile: data.mobile,
                otp: (Math.random() + "").substring(2, 6)
              }, function(err, data4) {
                if (err) {
                  callback(null, "Saved");
                } else {
                  callback(null, data4);
                }
              });
            }
          });
        } else {
          callback("User already Exists", false);
        }
      }
    });
  },
  findLimited: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          User.count({
            name: {
              '$regex': check
            }
          }).exec(function(err, number) {
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
        function(callback) {
          User.find({
            name: {
              '$regex': check
            }
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
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
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  }
};

module.exports = _.assign(module.exports, models);
