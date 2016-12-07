var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

  order: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  appImage: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  city: [{
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  }],
  title: {
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

module.exports = mongoose.model('Slider', schema);
var models = {
  saveData: function (data, callback) {
    var slider = this(data);
    slider.timestamp = new Date();
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
      slider.save(function (err, created) {
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

    if (data._id && data._id !== '') {
      obj = {
        city: data._id
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          Slider.count(obj).exec(function (err, number) {
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
          Slider.find(obj).populate("city").skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {
            sort: {}
          }).lean().exec(function (err, data2) {
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
  getAllSliderByOrder: function (data, callback) {
    this.find({
      city: data.city,
      type: 1,
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
  getAllHostPartySlider: function (data, callback) {
    this.find({
      city: data.city,
      type: 2
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
};

module.exports = _.assign(module.exports, models);