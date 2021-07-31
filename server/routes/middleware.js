const isLoggedIn = function isLoggedIn(req,res,next) {
	const { userId } = req.session;
	const path = req.originalUrl.split("/")[1]; // Second element should be "login"
	if (userId || path === "login")
		next();
	else
		res.redirect("/login");
};


module.exports = {
	isLoggedIn,
};