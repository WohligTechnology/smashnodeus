module.exports = {

  save: function (req, res) {
    if (req.body) {
      Assistance.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {

    if (req.body) {
      Assistance.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      Assistance.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      Assistance.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  getAllAssistanceByOrder: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      Assistance.getAllAssistanceByOrder(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  findLimited: function (req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        Assistance.findLimited(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Please provide parameters"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  exportAssistanceExcel: function (req, res) {
    Assistance
      .find({})
      .populate('city')
      .exec(function (err, response) {
        var excelData = [];
        var row = {};
        _.each(response, function (key) {
          console.log(key);
          row = {};
          row = {
            "NAME": key.name,
            "EMAIL": key.email,
            "MOBILE": key.mobile,
            "OCCASION": key.occasion,
            "ASSISTANCE FOR": key.assistancefor,
            "NO OF PEOPLE": key.noofpeople,
            "DATE": key.date,
            "TIMESTAMP": key.timestamp,
          };
          if (key.city) {
            row["CITY"] = key.city.name;
          }
          excelData.push(row);
        });
        Config.generateExcel("Assistance", excelData, res);
      });
  },
};
