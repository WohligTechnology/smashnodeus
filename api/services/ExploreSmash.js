var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;

var schema = new Schema({

  video: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: ""
  },
  city: [{
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  }],
  order: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
  banner: {
    type: String,
    default: ""
  },
  showBuyNow: {
    type: Boolean,
    default: false
  },
  mobileBanner: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
    index: true
  },
  description: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  sublink: {
    type: String,
    default: ""
  },
  isHome: {
    type: Boolean,
    default: "false"
  },
  technology: {
    type: String,
    default: ""
  },
  deal: {
    type: String,
    default: ""
  },
  promotion: {
    type: String,
    default: ""
  },
  currentEvent: {
    type: String,
    default: ""
  },
  pdf: {
    type: String,
    default: ""
  },
  gameType: {
    type: Number,
    default: 0
  },

  timing: [{
    type: {
      type: String,
      default: ""
    },
    weekendPrice: {
      type: String,
      default: ""
    },
    weekdayPrice: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  }],
  gallery: [{
    image: {
      type: String,
      default: ""
    },
    order: {
      type: String,
      default: ""
    }
  }],
  fb: {
    type: String,
    default: ""
  },
  google: {
    type: String,
    default: ""
  },
  twitter: {
    type: String,
    default: ""
  },
  externallink: {
    type: String,
    default: ""
  },
  gamefor: [{
    type: String,
    default: ""
  }],
  hometext: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    default: 0
  },
  homeimage: {
    type: String,
    default: ""
  },
  multipleattraction: [{
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    attraction: [{
      type: Schema.Types.ObjectId,
      ref: 'ExploreSmash',
      index: true
    }],
    indicator: {
      type: String,
      default: ""
    },
    exploresmashid: {
      type: Schema.Types.ObjectId,
      ref: 'ExploreSmash',
      index: true
    },
  }],
  videoThumbnail: {
    type: String,
    default: ""
  },
  hostAPartyType: {
    type: String,
    default: ""
  },
  timingAndPricing: {
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
  }
});

module.exports = mongoose.model('ExploreSmash', schema);
var models = {
  saveData: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
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
      exploresmash.save(function (err, created) {
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
  saveAttraction: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bc4b2aeb9c91f1025a3b55";
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
      exploresmash.save(function (err, created) {
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
  saveWhatsNew: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bc4af6eb9c91f1025a3b4f";
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
      exploresmash.save(function (err, created) {
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
  saveBuyNow: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57c9470e214d5a1c10f7d042";
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
      exploresmash.save(function (err, created) {
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
  saveEvents: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bd4e71a86ee9fa6770d4b2";
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
      exploresmash.save(function (err, created) {
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
  savePromotion: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bc4b36eb9c91f1025a3b56";
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
      exploresmash.save(function (err, created) {
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
  saveFood: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bc4b48eb9c91f1025a3b57";
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
      exploresmash.save(function (err, created) {
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
  saveHost: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bc4b10eb9c91f1025a3b54";
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
      exploresmash.save(function (err, created) {
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
  saveDeals: function (data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
    exploresmash.type = "57bc4b5aeb9c91f1025a3b58";
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
      exploresmash.save(function (err, created) {
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
  getFoodGallery: function (data, callback) {
    this.findOne({
      "_id": data._id,
      "city": data.city,
    }, {
      _id: 0,
      gallery: 1
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
  getAllForDropDown: function (data, callback) {
    this.find({}, {
      hometext: 1
    }).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        var newFound = {};
        newFound = _.clone(found);

        _.each(newFound, function (n) {
          n.name = n.hometext;
        })
        console.log(newFound);
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  getAllAttraction: function (data, callback) {
    var name = '';
    this.find({}, {
      _id: 1,
      hometext: 1
    }).where('type').in(['57bd4e71a86ee9fa6770d4b2', '57bc4b36eb9c91f1025a3b56', '57bc4b5aeb9c91f1025a3b58']).lean().exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        _.each(found, function (n) {
          n.name = n.hometext;
          delete n.hometext;
        });
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  getSingleExploreSmaaash: function (data, callback) {
    var checkobj = {};
    checkobj.type = data._id;
    checkobj.city = data.city;
    if (data.search && data.search !== '') {
      var check = new RegExp(data.search, "i");
      checkobj.hometext = {
        '$regex': check
      };
    }
    if (data.gameFor && data.gameFor !== '') {
      checkobj.gamefor = data.gameFor;
    }
    if (data.gameType && data.gameType !== '') {
      checkobj.gameType = data.gameType;
    }
    this.find(checkobj).exec(function (err, found) {
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
  getAllExploreSmashByCity: function (data, callback) {
    this.find({
      city: data._id
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
  getHomeContent: function (data, callback) {
    this.find({
      isHome: true,
      city: data.city
    }).populate('type').exec(function (err, found) {
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

  //side menu

  getAllTiming: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function (callback) {
          ExploreSmash.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$timing"
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
          }]).exec(function (err, result) {
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
        function (callback) {
          ExploreSmash.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$timing"
          }, {
            $group: {
              _id: "_id",
              timing: {
                $push: "$timing"
              }
            }
          }, {
            $project: {
              _id: 0,
              timing: {
                $slice: ["$timing", skip, data.pagesize]
              }
            }
          }]).exec(function (err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].timing;
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


  deleteTiming: function (data, callback) {
    ExploreSmash.update({
      "timing._id": data._id
    }, {
      $pull: {
        "timing": {
          "_id": objectid(data._id)
        }
      }
    }, function (err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },

  saveTiming: function (data, callback) {
    var exploresmash = data.exploresmash;
    if (!data._id) {
      ExploreSmash.update({
        _id: exploresmash
      }, {
        $push: {
          timing: data
        }
      }, function (err, updated) {
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
      var attribute = "timing.$.";
      _.forIn(data, function (value, key) {
        tobechanged[attribute + key] = value;
      });
      ExploreSmash.update({
        "timing._id": data._id
      }, {
        $set: tobechanged
      }, function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },
  getOneTiming: function (data, callback) {
    // aggregate query
    ExploreSmash.aggregate([{
      $unwind: "$timing"
    }, {
      $match: {
        "timing._id": objectid(data._id)
      }
    }, {
      $project: {
        timing: 1
      }
    }]).exec(function (err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].timing) {
        callback(null, respo[0].timing);
      } else {
        callback({
          message: "No data found"
        }, null);
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
  getDetailExploreSmaaash: function (data, callback) {
    this.findOne({
      "_id": data._id,
      "city": data.city
    }).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        console.log(found);
        ExploreSmash.populate(found, {
            path: 'multipleattraction.attraction'
          }, function (err, response) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, response);

            }
          })
          // callback(null, found);
      } else {
        callback(null, {});
      }
    });
  },
  getOneExploreSmaaash: function (data, callback) {
    this.findOne({
      "_id": data._id,
      "city": data.city
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
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count().exec(function (err, number) {
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
          ExploreSmash.find().populate("type").skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
            console.log(data2);
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
  findLimitedAttraction: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bc4b2aeb9c91f1025a3b55"
      };
    } else {
      obj = {
        type: "57bc4b2aeb9c91f1025a3b55"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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
  findLimitedWhatsNew: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bc4af6eb9c91f1025a3b4f"
      };
    } else {
      obj = {
        type: "57bc4af6eb9c91f1025a3b4f"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
            console.log(data2);
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
  findLimitedEvents: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bd4e71a86ee9fa6770d4b2"
      };
    } else {
      obj = {
        type: "57bd4e71a86ee9fa6770d4b2"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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
  findLimitedFood: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bc4b48eb9c91f1025a3b57"
      };
    } else {
      obj = {
        type: "57bc4b48eb9c91f1025a3b57"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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
  findLimitedDeals: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bc4b5aeb9c91f1025a3b58"
      };
    } else {
      obj = {
        type: "57bc4b5aeb9c91f1025a3b58"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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
  findLimitedPromotion: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bc4b36eb9c91f1025a3b56"
      };
    } else {
      obj = {
        type: "57bc4b36eb9c91f1025a3b56"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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
  findLimitedBuyNow: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57c9470e214d5a1c10f7d042"
      };
    } else {
      obj = {
        type: "57c9470e214d5a1c10f7d042"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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
  findLimitedHost: function (data, callback) {
    var obj = {};

    if (data._id && data._id !== '') {
      obj = {
        city: data._id,
        type: "57bc4b10eb9c91f1025a3b54"
      };
    } else {
      obj = {
        type: "57bc4b10eb9c91f1025a3b54"
      };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          ExploreSmash.count(obj).exec(function (err, number) {
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
          ExploreSmash.find(obj).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function (err, data2) {
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


  //gallery

  //SIDEMENU CAST

  saveGallery: function (data, callback) {
    console.log(data);
    var explore = data.explore;
    if (!data._id) {
      ExploreSmash.update({
        _id: explore
      }, {
        $push: {
          gallery: data
        }
      }, function (err, updated) {
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
      var attribute = "gallery.$.";
      _.forIn(data, function (value, key) {
        tobechanged[attribute + key] = value;
      });
      ExploreSmash.update({
        "gallery._id": data._id
      }, {
        $set: tobechanged
      }, function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllGallery: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function (callback) {
          ExploreSmash.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$gallery"
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
          }]).exec(function (err, result) {
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
        function (callback) {
          ExploreSmash.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$gallery"
          }, {
            $group: {
              _id: "_id",
              gallery: {
                $push: "$gallery"
              }
            }
          }, {
            $project: {
              _id: 0,
              gallery: {
                $slice: ["$gallery", skip, data.pagesize]
              }
            }
          }]).exec(function (err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].gallery;
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


  deleteGallery: function (data, callback) {
    ExploreSmash.update({
      "gallery._id": data._id
    }, {
      $pull: {
        "gallery": {
          "_id": objectid(data._id)
        }
      }
    }, function (err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneGallery: function (data, callback) {
    // aggregate query
    ExploreSmash.aggregate([{
      $unwind: "$gallery"
    }, {
      $match: {
        "gallery._id": objectid(data._id)
      }
    }, {
      $project: {
        gallery: 1
      }
    }]).exec(function (err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].gallery) {
        callback(null, respo[0].gallery);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },


  // Muilptle Attractions

  saveMultipleAttraction: function (data, callback) {
    var explore = data.explore;
    if (!data._id) {
      ExploreSmash.update({
        _id: explore
      }, {
        $push: {
          multipleattraction: data
        }
      }, function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
          // ExploreSmash.update({
          //   _id: data.attraction
          // }, {
          //   $push: {
          //     "multipleattraction": {
          //       icon: data.icon,
          //       indicator: "deal",
          //       exploresmashid: data.explore
          //     }
          //   }
          // }, function(err, response) {
          //   if (err) {
          //     callback(err, null);
          //   } else {
          //     callback(null, response);
          //   }
          // });
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "multipleattraction.$.";
      _.forIn(data, function (value, key) {
        tobechanged[attribute + key] = value;
      });
      ExploreSmash.update({
        "multipleattraction._id": data._id
      }, {
        $set: tobechanged
      }, function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          // ExploreSmash.update({
          //   "_id": data.attraction,
          //   "multipleattraction._id" : data._id
          // }, {
          //   "$set": {
          //     "multipleattraction.$": {
          //       "icon": data.icon,
          //       "indicator": "deal",
          //       "exploresmashid": data.explore
          //     }
          //   }
          // }, function(err, response) {
          //   if (err) {
          //     callback(err, null);
          //   } else {
          //     callback(null, response);
          //   }
          // });




          callback(null, updated);
        }
      });
    }
  },

  getAllMultipleAttraction: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function (callback) {
          ExploreSmash.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$multipleattraction"
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
          }]).exec(function (err, result) {
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
        function (callback) {
          ExploreSmash.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$multipleattraction"
          }, {
            $group: {
              _id: "_id",
              multipleattraction: {
                $push: "$multipleattraction"
              }
            }
          }, {
            $project: {
              _id: 0,
              multipleattraction: {
                $slice: ["$multipleattraction", skip, data.pagesize]
              }
            }
          }]).exec(function (err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].multipleattraction;
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
    // var newreturns = {};
    // newreturns.data = [];
    // var check = new RegExp(data.search, "i");
    // data.pagenumber = parseInt(data.pagenumber);
    // data.pagesize = parseInt(data.pagesize);
    // var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    // async.parallel([
    //     function(callback) {
    //       ExploreSmash.aggregate([{
    //         $match: {
    //           _id: objectid(data._id)
    //         }
    //       }, {
    //         $unwind: "$multipleattraction"
    //       }, {
    //         $group: {
    //           _id: null,
    //           count: {
    //             $sum: 1
    //           }
    //         }
    //       }, {
    //         $project: {
    //           count: 1
    //         }
    //       }]).exec(function(err, result) {
    //         console.log(result);
    //         if (result && result[0]) {
    //           newreturns.total = result[0].count;
    //           newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
    //           callback(null, newreturns);
    //         } else if (err) {
    //           console.log(err);
    //           callback(err, null);
    //         } else {
    //           callback({
    //             message: "Count of null"
    //           }, null);
    //         }
    //       });
    //     },
    //     function(callback) {
    //       ExploreSmash.aggregate([{
    //         $match: {
    //           _id: objectid(data._id)
    //         }
    //       }, {
    //         $unwind: "$multipleattraction"
    //       }, {
    //         $group: {
    //           _id: "_id",
    //           multipleattraction: {
    //             $push: "$multipleattraction"
    //           }
    //         }
    //       }, {
    //         $project: {
    //           _id: 0,
    //           multipleattraction: {
    //             $slice: ["$multipleattraction", skip, data.pagesize]
    //           }
    //         }
    //       }]).exec(function(err, found) {
    //         console.log(found);
    //         if (found && found.length > 0) {
    //           newreturns.data = found[0].multipleattraction;
    //           callback(null, newreturns);
    //         } else if (err) {
    //           console.log(err);
    //           callback(err, null);
    //         } else {
    //           callback({
    //             message: "Count of null"
    //           }, null);
    //         }
    //       });
    //     }
    //   ],
    //   function(err, data4) {
    //     if (err) {
    //       console.log(err);
    //       callback(err, null);
    //     } else if (data4) {
    //       callback(null, newreturns);
    //     } else {
    //       callback(null, newreturns);
    //     }
    //   });
  },


  deleteMultipleAttraction: function (data, callback) {
    ExploreSmash.update({
      "multipleattraction._id": data._id
    }, {
      $pull: {
        "multipleattraction": {
          "_id": objectid(data._id)
        }
      }
    }, function (err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneMultipleAttraction: function (data, callback) {
    // aggregate query
    ExploreSmash.aggregate([{
      $unwind: "$multipleattraction"
    }, {
      $match: {
        "multipleattraction._id": objectid(data._id)
      }
    }, {
      $project: {
        multipleattraction: 1
      }
    }]).exec(function (err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].multipleattraction) {

        callback(null, respo[0].multipleattraction);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },
};

module.exports = _.assign(module.exports, models);
