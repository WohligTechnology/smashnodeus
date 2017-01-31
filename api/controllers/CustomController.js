module.exports = {

  save: function (req, res) {
    if (req.body) {
      Custom.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {

    if (req.body) {
      Custom.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      Custom.deleteData(req.body, res.callback);
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
      Custom.getAll(req.body, res.callback);
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
        Custom.findLimited(req.body, res.callback);
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
  exportCustomExcel: function (req, res) {
    var gamesName = '';
    Custom
      .find({})
      .populate('city')
      .populate('games')
      .exec(function (err, response) {
        var excelData = [];
        var row = {};
        _.each(response, function (key) {
          _.each(key.games, function (n) {
            if (gamesName == '') {
              gamesName = n.hometext;
            } else {
              gamesName = gamesName + ", " + n.hometext;
            }
          });
          row = {};
          row = {
            "NAME": key.name,
            "EMAIL": key.email,
            "MOBILE": key.mobile,
            "OCCASION": key.occasion,
            "NO OF PEOPLE": key.noofpeople,
            "DATE": key.DATE,
            "FOOD STYLE": key.foodStyle,
            "STARTER": key.starter,
            "MAIN COURSE": key.mainCourse,
            "DESSERT": key.dessert,
            "ALCOHOL": key.alcohol,
            "TIMESTAMP": key.timestamp
          };
          if (key.city) {
            row["CITY"] = key.city.name;
          }
          if (key.games) {
            row["GAMES"] = gamesName;
          }
          excelData.push(row);
        });
        Config.generateExcel("CustomPackages", excelData, res);
      });
  },

};
