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
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        index: true
    },
    name: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: ""
    }

});

module.exports = mongoose.model('Sponsor', schema);
var models = {
    saveData: function (data, callback) {
        var Sponsor = this(data);
        Sponsor.timestamp = new Date();
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
            Sponsor.save(function (err, created) {
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
    getAllSponsorPageDetail: function (data, callback) {
        async.parallel({
            sponsor: function (callback) {
                Sponsor.find({
                    status: true
                }).sort({
                    order: -1
                }).populate('city').exec(function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found && found.length > 0) {
                        callback(null, found);
                    } else {
                        callback(null, found);
                    }
                });
            },
            esteem: function (callback) {
                Esteem.find({
                    status: true
                }).sort({
                    order: -1
                }).populate('city').exec(function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found && found.length > 0) {
                        callback(null, found);
                    } else {
                        callback(null, found);
                    }
                });
            },
            contact: function (callback) {
                Contact.find({
                    status: true
                }).sort({
                    order: -1
                }).populate('city').exec(function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found && found.length > 0) {
                        callback(null, found);
                    } else {
                        callback(null, found);
                    }
                });
            }
        }, function (err, results) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (results && results.length > 0) {
                callback(null, results);
            } else {
                callback(null, results);
            }
            // results is now equals to: {one: 'abc\n', two: 'xyz\n'}
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
                    Sponsor.count(obj).exec(function (err, number) {
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
                    Sponsor.find(obj).populate("city").skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {
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
    },
};

module.exports = _.assign(module.exports, models);