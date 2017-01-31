var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
  mobile: {
    type: String,
    default: ""
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  },
  occasion: {
    type: String,
    default: ""
  },
  noofpeople: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'ExploreSmash',
    index: true
  }],
  foodStyle: {
    type: String,
    default: ""
  },
  starter: {
    type: String,
    default: ""
  },
  mainCourse: {
    type: String,
    default: ""
  },
  dessert: {
    type: String,
    default: ""
  },
  alcohol: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Custom', schema);
var models = {
  saveData: function (data, callback) {
    var Custom = this(data);
    Custom.timestamp = new Date();
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
      Custom.save(function (err, created) {
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
          Custom.count(obj).exec(function (err, number) {
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
          Custom.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {
            sort: {}
          }).lean().exec(function (err, data2) {
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
