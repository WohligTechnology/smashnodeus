module.exports = {
  save: function (req, res) {
    if (req.body) {
      Subscribe.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  getAll: function (req, res) {
    if (req.body) {
      Subscribe.getAll(req.body, function (err, respo) {
        if (err) {
          res.json({
            value: false,
            data: err
          });
        } else {
          res.json({
            value: true,
            data: respo
          });
        }
      });
    } else {
      res.json({
        value: false,
        data: "Invalid call"
      });
    }
  },
  delete: function (req, res) {
    if (req.body) {
      if (req.body._id && req.body._id !== "") {
        //  console.log("not valid");
        Subscribe.deleteData(req.body, function (err, respo) {
          if (err) {
            res.json({
              value: false,
              data: err
            });
          } else {
            res.json({
              value: true,
              data: respo
            });
          }
        });
      } else {
        res.json({
          value: false,
          data: "Invalid Id"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid call"
      });
    }
  },
  getOne: function (req, res) {
    if (req.body) {
      if (req.body._id && req.body._id != "") {
        Subscribe.getOne(req.body, function (err, respo) {
          if (err) {
            res.json({
              value: false,
              data: err
            });
          } else {
            res.json({
              value: true,
              data: respo
            });
          }
        });
      } else {
        res.json({
          value: false,
          data: "Invalid Id"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid call"
      });
    }
  },



  deleteAll: function (req, res) {
    if (req.body) {
      Subscribe.deleteAll(req.body, function (err, respo) {
        if (err) {
          res.json({
            value: false,
            data: err
          });
        } else {
          res.json({
            value: true,
            data: respo
          });
        }
      });
    } else {
      res.json({
        value: false,
        data: "Invalid call"
      });
    }
  },

  findLimited: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      if (req.body.pagesize && req.body.pagenumber) {
        Subscribe.findLimited(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Invalid Params"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  exportSubscribeExcel: function (req, res) {
    Subscribe
      .find({})
      .exec(function (err, response) {
        var excelData = [];
        var row = {};
        _.each(response, function (key) {
          console.log(key);
          row = {};
          row = {
            "EMAIL": key.email
          };
          excelData.push(row);
        });
        Config.generateExcel("Subscribers", excelData, res);
      });
  },

};
