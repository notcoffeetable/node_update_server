exports.form = function(req, res){
	if (typeof(req.user) != "undefined")
		res.redirect('/update_record');
	res.render('login', 
	{
		user: req.user,
		message: req.flash('error')
	});
};