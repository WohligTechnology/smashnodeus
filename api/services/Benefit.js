var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;

var schema = new Schema({

  name: {
    type: String,
    default: ""
  },
  order: {
    type: Number,
    default: ""
  },
  status: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  }

});

module.exports = mongoose.model('Benefit', schema);
var models = {
  saveData: function (data, callback) {
    var Benefit = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, function (err, data2) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    } else {
      Benefit.timestamp = new Date();
      Benefit.status = false;
      Benefit.save(function (err, data2) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    }

  },
  getAll: function (data, callback) {
    Benefit.find({
      status: true
    }, {}, {
      sort: {
        order: -1
      }
    }, function (err, deleted) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, deleted);
      }
    });
  },
  getAllBenefit: function (data, callback) {
    this.find({
      status: true
    }).sort({
      order: -1
    }).exec(function (err, found) {
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
  deleteData: function (data, callback) {
    Benefit.findOneAndRemove({
      _id: data._id
    }, function (err, deleted) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, deleted)
      }
    });
  },
  deleteAll: function (data, callback) {
    Benefit.remove({}, function (err, deleted) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, deleted)
      }
    });
  },
  getOne: function (data, callback) {
    Benefit.findOne({
      _id: data._id
    }, function (err, deleted) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, deleted);
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
          Benefit.count({
            name: {
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
          Benefit.find({
            name: {
              '$regex': check
            }
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
            console.log(data2);
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              _.each(newreturns.data, function (n) {
                if (n.status == true) {
                  n.status = "Enabled";
                } else if (n.status == false) {
                  n.status = "Disabled";
                } else {
                  n.status = "Disabled";
                }
              });
              console.log(newreturns.data);
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


};
module.exports = _.assign(module.exports, models);
