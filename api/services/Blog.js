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
  banner: {
    type: String,
    default: ""
  },
  mobileBanner: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  like: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true
    }
  }],
  city: [{
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  }],
  comments: [{
    text: {
      type: String,
      default: ""
    }
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },

  //insert date and time together
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Blog', schema);
var models = {
  saveData: function (data, callback) {
    var Blog = this(data);
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
      Blog.timestamp = new Date();
      Blog.status = false;
      Blog.save(function (err, data2) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    }

  },
  getAll: function (data, callback) {
    Blog.find({
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
  getAllBlog: function (data, callback) {
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
    Blog.findOneAndRemove({
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
    Blog.remove({}, function (err, deleted) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, deleted)
      }
    });
  },
  getOne: function (data, callback) {
    Blog.findOne({
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
          Blog.count({
            name: {
              '$regex': check
            },
            status: "true"
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
          Blog.find({
            name: {
              '$regex': check
            },
            status: "true"
          }).sort({
            order: 1
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).lean().exec(function (err, data2) {
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
  findLimitedForBackend: function (data, callback) {

    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id
      };
    } else {
      obj = {
        name: {
          '$regex': check
        }
      };
    }
    async.parallel([
        function (callback) {
          Blog.count(obj).exec(function (err, number) {
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
          Blog.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).lean().exec(function (err, data2) {
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
