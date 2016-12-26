var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;

var schema = new Schema({

    BranchID: {
        type: String,
        default: ""
    },
    SenderName: {
        type: String,
        default: ""
    },
    SenderMobile: {
        type: Boolean,
        default: ""
    },
    SenderEmail: {
        type: String,
        default: ""
    },
    ReceiverName: {
        type: String,
        default: ""
    },
    ReceiverMobileNo: {
        type: String,
        default: ""
    },
    ReceiverAddress: {
        type: String,
        default: ""
    },
    ReceiverPinCode: {
        type: String,
        default: ""
    },
    ReceiverRemarks: {
        type: String,
        default: ""
    },
    GiftCardAmount: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('GiftCard', schema);
var models = {
    saveData: function (data, callback) {
        var GiftCard = this(data);
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
            GiftCard.timestamp = new Date();
            GiftCard.save(function (err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        }

    },
    getAll: function (data, callback) {
        GiftCard.find({}, {}, {}, function (err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
    getAllGiftCard: function (data, callback) {
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
        GiftCard.findOneAndRemove({
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
        GiftCard.remove({}, function (err, deleted) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, deleted)
            }
        });
    },
    getOne: function (data, callback) {
        GiftCard.findOne({
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
                    GiftCard.count({
                        name: {
                            '$regex': check
                        }
                    }).exec(function (err, number) {
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
                    GiftCard.find({
                        name: {
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
    },


};
module.exports = _.assign(module.exports, models);