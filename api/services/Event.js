var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;
var schema = new Schema({

  title: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  order: {
    type: String,
    default: ""
  },
  prize: {
    type: String,
    default: ""
  },
  schedule: {
    type: String,
    default: ""
  },
  rule: {
    type: String,
    default: ""
  },
  team: {
    type: String,
    default: ""
  },
  registration: [{
    name: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    dob: {
      type: String,
      default: ""
    }
  }],

});

module.exports = mongoose.model('Event', schema);
var models = {
  saveData: function(data, callback) {
    var event = this(data);
    event.timestamp = new Date();
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
      event.save(function(err, created) {
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
  findLimited: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          Event.count({
            title: {
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
          Event.find({
            title: {
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
  },

  findRegistration: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Event.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$registration"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Event.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$registration"
          }, {
            $group: {
              _id: "_id",
              registration: {
                $push: "$registration"
              }
            }
          }, {
            $project: {
              _id: 0,
              registration: {
                $slice: ["$registration", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].registration;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
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
  },

  deleteRegistration: function(data, callback) {
    Event.update({
      "registration._id": data._id
    }, {
      $pull: {
        "registration": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },

  saveRegistration: function(data, callback) {
    var event = data.event;
    if (!data._id) {
      Event.update({
        _id: event
      }, {
        $push: {
          registration: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "registration.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Event.update({
        "registration._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },
  findOneRegistration: function(data, callback) {
    // aggregate query
    Event.aggregate([{
      $unwind: "$registration"
    }, {
      $match: {
        "registration._id": objectid(data._id)
      }
    }, {
      $project: {
        registration: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].registration) {
        callback(null, respo[0].registration);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },
};

module.exports = _.assign(module.exports, models);
