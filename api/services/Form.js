var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({

  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  myDate: {
    type: Date
  },
  age: {
    type: Number
  },
  contacts: [{
    number: {
      type: Number
    }
  }]

});

module.exports = mongoose.model('Form', schema);
var models = {

  age: function (birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },
  saveData: function (data, callback) {

    var form = this(data);
    var age = this.age(form.myDate);
    form.age = age;
    form.save(function (err, data2) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data2);
      }
    });
  },
  findLimited: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          Form.count().exec(function (err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number != "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function (callback) {
          Form.find().skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
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


};
module.exports = _.assign(module.exports, models);
