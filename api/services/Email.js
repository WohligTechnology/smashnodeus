var mongoose = require('mongoose');
var base64 = require('base-64');
var SendGrid = require('sendgrid').SendGrid;

var models = {
  sendMail: function (data, emailtemplate, callback) {
    sails.renderView('email/' + emailtemplate, data.toObject(), function (err, view) {
      if (err) {
        callback(err);
      } else {
        var helper = require('sendgrid').mail
        from_email = new helper.Email("no-reply@smaaashindia.com")
        to_email = new helper.Email('smaaashindia@gmail.com')
        subject = "SMAAASH INDIA"
        content = new helper.Content("text/html", view)
          // content = new helper.Content("text/html", "views/email/index.ejs")
        mail = new helper.Mail(from_email, subject, to_email, content)
        var decodedData = base64.decode('U0cudEJIbVZ3WDRUbzYwVWpYekJqLUFpQS50TWk0am5sMm1zYVhVWUlwbHFycWxjV3J0dF9ycGkyWW1JaklKeGw5OWZ3');
        var sg = require('sendgrid')(decodedData);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function (err, response) {
          if (err) {
            console.log(err);
            callback(err, null);
          } else if (response) {
            callback(null, data);
          } else {
            callback(null, {});
          }
        });
      }

    });
  },

  sendMailWithoutObj: function (data, emailtemplate, callback) {
    sails.renderView('email/' + emailtemplate, data, function (err, view) {
      if (err) {
        callback(err);
      } else {

        var helper = require('sendgrid').mail
        from_email = new helper.Email("no-reply@smaaashindia.com")
        to_email = new helper.Email(data.email)
        subject = "SMAAASH INDIA"
        content = new helper.Content("text/html", view)
          // content = new helper.Content("text/html", "views/email/index.ejs")
        mail = new helper.Mail(from_email, subject, to_email, content)
        var decodedData = base64.decode('U0cuc2pfOEtQVDdReXlNM3k3cGNUNVF4US5TZjNKSmlCdzZJZVpENmVQYUhZTTc0Mi1HT0FyMkRON1RjbFlrRHpiOTJN');
        var sg = require('sendgrid')(decodedData);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function (err, response) {
          if (err) {
            console.log(err);
            callback(err, null);
          } else if (response) {
            callback(null, data);
          } else {
            callback(null, {});
          }
        });
      }

    });



  },

};

module.exports = _.assign(module.exports, models);
