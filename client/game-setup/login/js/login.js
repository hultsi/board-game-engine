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
	}).then(async ans => {
		const body = await ans.json();
		if (body.loggedIn) {
			// Send req to move to main.html
			window.location.href = "http://localhost:5000/mainMenu"
		} else {
			// Show error msg
			const divErr = document.getElementById("login-err");
			divErr.innerHTML = "Incorrect credentials";
		}
	});
};

loginBtn.addEventListener("click", () => {
	loginPOST();
});

pwdInp.addEventListener("keydown", (ev) => {
	if (ev.code === "Enter" && !keyDown) {
		loginPOST();
	}
	keyDown = true;
});

usrInp.addEventListener("keydown", (ev) => {
	if (ev.code === "Enter" && !keyDown) {
		loginPOST();
	}
	keyDown = true;
});

document.addEventListener("keyup", () => {
	keyDown = false;
});