module.exports = {
	save: function(req, res) {
		if (req.body) {
			Register.saveData(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: "Invalid Request"
			});
		}
	},


	login: function(req, res) {
			var callback = function(err, data) {
					if (err || _.isEmpty(data)) {
							res.json({
									error: err,
									value: false
							});
					} else {
							if (data._id) {
									// req.session.user = data;
									// req.session.save();
									console.log(req.session.user);
									res.json({
											data: data,
											value: true
									});
							} else {
									req.session.user = {};

									res.json({
											data: {},
											value: false
									});
							}
					}
			};
			if (req.body) {
					if (req.body.email && req.body.email !== "" && req.body.password && req.body.password !== "") {
							Register.login(req.body, callback);
					} else {
							res.json({
									data: "Please provide params",
									value: true
							});
					}
			} else {
					res.json({
							data: "Invalid Call",
							value: true
					});
			}
	},
	logout: function(req, res) {
      req.session.destroy(function(err) {
				res.json({
						 data: "Logout Successful",
						 value: true
				 });
      });
}

};
