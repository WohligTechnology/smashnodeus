/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  oldIndex: function(req, res) {
    function callback2(err) {
      Config.GlobalCallback(err, fileNames, res);
    }
    var fileNames = [];
    req.file("file").upload({
      maxBytes: 50000000
      // 10 MB Storage 1 MB = 10^6
    }, function(err, uploadedFile) {
      if (uploadedFile && uploadedFile.length > 0) {
        console.log(uploadedFile);

        async.each(
          uploadedFile,
          function(n, callback) {
            if (n.filename) {
              var splitVal = n.filename.split(".");
              var extension = splitVal[splitVal.length - 1];
              if (
                extension == "jpeg" ||
                extension == "png" ||
                extension == "jpg" ||
                extension == "gif" ||
                extension == "svg" ||
                extension == "pdf" ||
                extension == "xls" ||
                extension == "xlsx" ||
                extension == "doc"
              ) {
                Config.uploadFile(n.fd, function(err, value) {
                  if (err) {
                    callback(err);
                  } else {
                    fileNames.push(value.name);
                    callback(null);
                  }
                });
              } else {
                callback(null);
              }
            }
          },
          callback2
        );
      } else {
        callback2(null, {
          value: false,
          data: "No files selected"
        });
      }
    });
  },
  index: function(req, res) {
    function callback2(err) {
      Config.GlobalCallback(err, fileNames, res);
    }
    var fileNames = [];
    req.file("file").upload({
      maxBytes: 50000000, // 10 MB Storage 1 MB = 10^6
      adapter: require("skipper-s3"),
      key: "XD2C37PABN22MOSXFDVT",
      secret: "ssj9+k29Ff+MDM/LnnjETA1/fgjaeNlKVJZNm6hB/6c",
      bucket: "smasssh",
      headers: {
        "x-amz-acl": "public-read",
        "content-type": "image/png,image/jpeg"
      },
      endpoint: "sgp1.digitaloceanspaces.com",
      region: "sgp1"
    }, function(err, uploadedFile) {
      if (uploadedFile && uploadedFile.length > 0) {
        console.log(uploadedFile);
        var uploadedFiles = [];
        async.each(
          uploadedFile,
          function(n, callback) {
            if (n.filename) {
              var splitVal = n.filename.split(".");
              var extension = splitVal[splitVal.length - 1];
              if (
                extension == "jpeg" ||
                extension == "png" ||
                extension == "jpg" ||
                extension == "gif" ||
                extension == "svg" ||
                extension == "pdf" ||
                extension == "xls" ||
                extension == "xlsx" ||
                extension == "doc"
              ) {
                uploadedFiles.push(Upload.convertUploadObj(n));
                console.log(uploadedFiles);
                async.eachLimit(
                  uploadedFiles,
                  10,
                  function(m, callback) {
                    console.log(m);
                    var uploadObj = Upload(m);
                    uploadObj.save(m, function(err, data) {
                      console.log("Save", data);
                      if (err || _.isEmpty(data)) {
                        callback(err);
                      } else {
                        fileNames.push(data.name);
                        callback();
                      }
                    });
                  },
                  callback
                );
              } else {
                callback(null);
              }
            }
          },
          callback2
        );
      } else {
        callback2(null, {
          value: false,
          data: "No files selected"
        });
      }
    });
  },
  oldReadFile: function(req, res) {
    Config.readUploaded(
      req.query.file,
      req.query.width,
      req.query.height,
      req.query.style,
      res
    );
  },
  readFile: function(req, res) {
    Upload.findFile(req.query, function(err, data) {
      if (err || _.isEmpty(data)) {
        res.callback(err);
      } else {
        res.redirect(data.cdnLocation);
      }
    });
  },
  smaaashUsa: function(req, res) {
    Config.readUploaded(
      req.query.file,
      req.query.width,
      req.query.height,
      req.query.style,
      res
    );
  }
};
