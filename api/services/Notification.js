var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;

var schema = new Schema({
  image: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Notification', schema);
var models = {
  saveData: function (data, callback) {
    var notification = this(data);
    notification.timestamp = new Date();
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
      notification.save(function (err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          SignUp.update({}, {
            $push: {
              "notification": created._id
            }
          }, {
            multi: true
          }).exec(function (err, updated) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, updated);
            }
          });
        } else {
          callback(null, {});
        }
      });
    }
  },
  removeNotification: function (data, callback) {
    SignUp.update({
      '_id': objectid(data.userid)
    }, {
      $pull: {
        "notification": data._id
      }
    }, function (err, deleted) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, deleted);
      }
    });
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
  getAll: function (data, callback) {
    this.find({
      status: true
    }).sort({
      '_id': -1
    }).limit(5).exec(function (err, found) {
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

  getOne: function (data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(function (err, found) {
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
  findLimited: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          Notification.count({
            title: {
              '$regex': check
            },
            city: data.city
          }).exec(function (err, number) {
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
          Notification.find({
            title: {
              '$regex': check
            },
            city: data.city
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
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
  findLimitedForBackend: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          Notification.count({
            title: {
              '$regex': check
            }
          }).exec(function (err, number) {
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
          Notification.find({
            title: {
              '$regex': check
            }
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
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
  }
};

module.exports = _.assign(module.exports, models);