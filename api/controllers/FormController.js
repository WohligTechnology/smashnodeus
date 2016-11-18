module.exports = {
  save: function (req, res) {
    if (req.body) {
      Form.saveData(req.body, function (err, respo) {
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

  getLimited: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      if (req.body.pagesize && req.body.pagenumber) {
        Form.findLimited(req.body, res.callback);
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

};
