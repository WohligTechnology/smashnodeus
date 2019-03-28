var mongoose = require("mongoose");
var Jimp = require("jimp");
var md5 = require("md5");
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    index: true
  },
  size: {
    type: Number
  },
  storageName: {
    type: String,
    index: true
  },
  location: {
    type: String,
    index: true
  },
  downloadLink: {
    type: String,
    index: true
  },
  cdnLocation: {
    type: String,
    index: true
  },
  imageKey: {
    type: String,
    index: true
  },
  sizes: [
    {
      width: {
        type: String,
        index: true
      },
      height: {
        type: String,
        index: true
      },
      style: {
        type: String,
        index: true
      },
      storageName: {
        type: String,
        index: true
      }
    }
  ]
});
module.exports = mongoose.model("Upload", schema);
var models = {
  convertUploadObj: function(uploadObject) {
    var url = "https://smaaash.sgp1.cdn.digitaloceanspaces.com/";
    var locate = url + uploadObject.filename;
    var obj = {
      name: uploadObject.filename,
      size: uploadObject.size,
      storageName: uploadObject.fd
    };
    if (uploadObject.extra != undefined) {
      if (uploadObject.extra.mediaLink) {
        obj.downloadLink = uploadObject.extra.mediaLink;
      }
      if (uploadObject.extra.Location) {
        obj.location = uploadObject.extra.Location;
      }
      if (uploadObject.extra.Key) {
        obj.cdnLocation = url + uploadObject.extra.Key;
        obj.imageKey = uploadObject.extra.Key;
      }
    } else {
      obj.cdnLocation = locate;
    }
    return obj;
  },
  findFile: function(fileObj, callback) {
    var obj;
    if (fileObj.file.indexOf(".") > 0) {
      obj = {
        $or: [
          {
            name: fileObj.file
          },
          {
            storageName: fileObj.file
          }
        ]
      };
    } else {
      obj = {
        _id: fileObj.file
      };
    }
    if (fileObj || fileObj.file) {
      Upload.findOne(obj, function(err, data) {
        console.log("findOne", err, data);
        if (err || _.isEmpty(data)) {
          callback(err);
        } else {
          callback(null, data);
          //   if (fileObj.width || fileObj.height) {
          //     Upload.generateFile(data, fileObj, callback);
          //   } else {
          //     callback(null, data);
          //   }
        }
      });
    }
  },

  generateFile: function(data, fileObj, callback) {
    var resizeVal = {};
    if (fileObj.width && !_.isNaN(parseInt(fileObj.width))) {
      resizeVal.width = parseInt(fileObj.width);
    } else {
      resizeVal.width = Jimp.AUTO;
      fileObj.width = 0;
    }
    if (fileObj.height && !_.isNaN(parseInt(fileObj.height))) {
      resizeVal.height = parseInt(fileObj.height);
    } else {
      resizeVal.height = Jimp.AUTO;
      fileObj.height = 0;
    }
    if (
      (fileObj.style == "cover" ||
        fileObj.style == "scaleToFit" ||
        fileObj.style == "resize") &&
      (fileObj.width &&
        !_.isNaN(parseInt(fileObj.width)) &&
        fileObj.height &&
        !_.isNaN(parseInt(fileObj.height)))
    ) {
      resizeVal.style = fileObj.style;
    } else {
      resizeVal.style = "contain";
      fileObj.style = "contain";
    }
    var finalObject = _.find(data.sizes, function(size) {
      return (
        size.width == fileObj.width &&
        size.height == fileObj.height &&
        size.style == fileObj.style
      );
    });
    if (finalObject) {
      callback(null, finalObject);
    } else {
      Jimp.read(data.cdnLocation, function(err, image) {
        if (err) {
          callback(err);
        } else if (image) {
          image[resizeVal.style](resizeVal.width, resizeVal.height)
            .quality(60)
            .getBuffer(Jimp.MIME_PNG, function(err, buffer) {
              console.log("fileObj", fileObj);
              fileObj.storageName =
                md5(JSON.stringify(fileObj)) + data.storageName;
              console.log(fileObj.storageName);
              var file = storage.bucket("smaaash").file(fileObj.storageName);
              var wstream = file.createWriteStream({
                metadata: {
                  contentType: Jimp.MIME_PNG
                },
                public: true
              });
              wstream.write(buffer);
              wstream.end();
              wstream.on("finish", function() {
                data.sizes.push(fileObj);
                data.save();
                callback(null, fileObj);
              });
            });
        }
      });
    }
  },
  convertUploadObjFromFiles: function(uploadObject) {
    var url = "https://smaaash.sgp1.cdn.digitaloceanspaces.com/";
    var locateUrl = "sgp1.digitaloceanspaces.com/smaaash/";
    var obj = {
      name: uploadObject.filename,
      size: uploadObject.length,
      storageName: uploadObject.filename,
      location: locateUrl + uploadObject.filename,
      cdnLocation: url + uploadObject.filename,
      imageKey: uploadObject.filename
    };
    return obj;
  },
  getFilesInUploads: function(data, callback) {
    async.waterfall(
      [
        function(callback) {
          gfs.files.find().toArray(callback);
        },
        function(files, callback) {
          var count = 0;
          // console.log("files", files);
          async.eachSeries(
            files,
            function(n, callback) {
              var uploadedFiles = [];
              uploadedFiles.push(Upload.convertUploadObjFromFiles(n));
              // console.log(uploadedFiles);
              async.eachLimit(
                uploadedFiles,
                1,
                function(m, callback) {
                  // console.log(m);
                  var uploadObj = Upload(m);
                  uploadObj.save(m, function(err, data) {
                    // console.log("Save", data);
                    if (err || _.isEmpty(data)) {
                      callback(err);
                    } else {
                      count++;
                      console.log(count);
                      callback(null, "Uploaded");
                    }
                  });
                },
                callback
              );
            },
            callback
          );
        }
      ],
      callback
    );
  }
};

module.exports = _.assign(module.exports, models);
