const loginBtn = document.getElementById("login-btn");
const pwdInp = document.getElementById("password-input");
const usrInp = document.getElementById("username-input");

let keyDown = false;

const loginPOST = function loginPOST() {
	const endpoint = "http://localhost:5000/login";
	const username = usrInp.value;
	const pwd = pwdInp.value;
	
	fetch(endpoint, { 
		method: "post",
		body: JSON.stringify({
			username: username,
			password: pwd,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});
};

loginBtn.addEventListener("click", () => {
	loginPOST();
});

loginBtn.addEventListener("keydown", (ev) => {
	if (ev.code === "Enter" && !keyDown) {
		loginPOST();
	}
	keyDown = true;
});

loginBtn.addEventListener("keyup", () => {
	keyDown = false;
});

pwdInp.addEventListener("keydown", (ev) => {
	if (ev.code === "Enter" && !keyDown) {
		loginPOST();
	}
	keyDown = true;
});

pwdInp.addEventListener("keyup", () => {
	keyDown = false;
});

usrInp.addEventListener("keydown", (ev) => {
	if (ev.code === "Enter" && !keyDown) {
		loginPOST();
	}
	keyDown = true;
});

usrInp.addEventListener("keyup", () => {
	keyDown = false;
});