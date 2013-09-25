/*
 Hash WinLinkVersion
	{
	version: (number),
	required: (bool),
	url: (url)
	}
*/

var redis = require("redis"),
      client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

exports.check = function(req, res){
	client.hgetall("LatestVersion", function(err, result) {
		if (err) {
			console.log("Error: " + err);
			res.end("Error");
			return;
		}
		if (result) {
			console.log(result);
			res.end(JSON.stringify(result));			
		}
	});
}

exports.recordform = function(req, res) {
	res.render('recordupdate');
}
/*
	request.body.version
	request.body.url
	request.body.required
*/
exports.recordtoredis = function(req, res) {
	client.hmset(
		["LatestVersion",
		 "version", req.body.version,
		 "url", req.body.url,
		 "required", (req.body.required == "on") ? true : false ], redis.print);
	res.redirect('/update_check');
}