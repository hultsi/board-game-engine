const app = require("express")();

const PORT = 5000;

app.get("/",(req,res) => {
	console.log(req);
	res.send("hello");
});

app.listen(PORT, () => {
	console.log(`Listening port ${PORT}`);
});