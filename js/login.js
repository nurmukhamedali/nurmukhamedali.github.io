var email_v = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var login_v = /[a-z]{1,14}$/;
var password_v = /(?=.*\d)(?=.*[A-Za-z]).{4,}/;
var password2_v = /(?=.*\d)(?=.*[A-Za-z]).{4,}/;

// 	(?=^.{8,}$)    # there are at least 8 characters
//  (?=.*\d)       # there is at least a digit
//  |              # or
//  (?=.*\W+)      # there is one or more "non word" characters (\W is equivalent to [^a-zA-Z0-9_])
//  (?![.\n])      # there is no . or newline and
//  (?=.*[A-Z])    # there is at least an upper case letter and
//  (?=.*[a-z]).*$ # there is at least a lower case letter
//  .*$            # in a string of any characters


document.getElementById('signUp').onclick = () => {
	if (localStorage.getItem('accounts')) {
		console.log('a');
		let ac = localStorage.getItem('accounts');
		users = JSON.parse(ac);
	}
	
	// console.log(users);
	
	var result = true;
	var a = document.getElementById('email').value;
	var b = document.getElementById('user').value;
	var c = document.getElementById('valid0').value;
	var d = document.getElementById('valid').value;
	var e = document.getElementById('checkbox').checked;

	document.getElementById("email_message").innerHTML = "";
	document.getElementById("login_message").innerHTML = "";
	document.getElementById("password_message").innerHTML = "";
	document.getElementById("password2_message").innerHTML = "";

	if (a==null || a==" " || email_v.test(a) == false) {
		document.getElementById("email_message").innerHTML = "Email address empty or wrong format";
		result = false;
	}
	users.find(item => {
		if (item.email == a){
			document.getElementById("email_message").innerHTML = "Email address already registrated";
			result = false;
		}
	});

	if (b==null || b==" " || login_v.test(b) == false) {
		document.getElementById("login_message").innerHTML = "Must contain any lowercase letters no-spaces";
		result = false;
	}
	if (c==null || c==" " || password_v.test(c) == false ){
		document.getElementById("password_message").textContent = "Password shoud be at least 1 letter and 1 digit";
		x = "Password is not valid";
		result = false;
	}
	if (d!==c || password2_v.test(d) == false ){
		document.getElementById("password2_message").innerHTML = "Password isn't correct";
		result = false;
	}
	if (!e) {
		document.getElementById("checkbox_message").innerHTML = "Please, fill out this checkbox";
		result = false;
	}

	if (result == true)
	{
		users.push({
			email : a,
			name : b,
			password: c,
			point: 5
		});
		localStorage.setItem('accounts', JSON.stringify(users));
		setTimeout(()=>{
			rotate(1);
			document.getElementById("Registration").textContent = "successfully registered";

		},500);
			// let bh = localStorage.getItem('accounts');
			// bh = JSON.parse(bh);
			// console.log(bh);
	}
}
document.getElementById('signIn').onclick = () => {
	var result = false;
	if (localStorage.getItem('accounts')) {
		let ac = localStorage.getItem('accounts');
		users = JSON.parse(ac);
	}
	var a = document.getElementById('e-mail').value;
	var c = document.getElementById('password').value;

	document.getElementById("email_check").innerHTML = "";
	document.getElementById("password_check").innerHTML = "";
	let flag;
	users.find(item => {
		if (item.email == a){
			flag = true;

			if (item.password == c){
				loading();
				localStorage.setItem('user', JSON.stringify(item));
				setTimeout(()=>{
					window.location.href = "../html/main.html"; // load the next page after 1.5 seconds 
				},2000);
				result = true;
			} 
			else {
				document.getElementById("password_check").textContent = "Password isn't correct";
				result = false;
			}
		} 
	});
	if (flag != true) {
			document.getElementById("email_check").innerHTML = "Email address is not registrated";
	}
}
function ResetForm(){
		document.getElementById("email_message").innerHTML = "";
		document.getElementById("login_message").innerHTML = "";
		document.getElementById("password_message").innerHTML = "";
		document.getElementById("password2_message").innerHTML = "";
		document.getElementById("checkbox_message").innerHTML = "";
		document.getElementById("checkbox").checked = false;
	}
function rotate(n){
			if(n == 0) 
				document.getElementsByClassName("container")[0].style.transform = "rotateX(180deg)";
			if(n == 1)
				 document.getElementsByClassName("container")[0].style.transform = "rotateY(0deg)";
		}
window.onload = () => {
	document.getElementById('e-mail').focus();
}