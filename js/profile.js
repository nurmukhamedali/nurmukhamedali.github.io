const name = document.getElementById('user_name');
const email = document.getElementById('user_email');
const pwd = document.getElementById('user_pwd');
const p = document.getElementById('user_p');
const que = document.getElementById('user_q');
const ans = document.getElementById('user_a');



window.addEventListener('load', function() {
document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.getElementById('myImg');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src url
          img.onload = imageIsLoaded();
      }
  });
	

	let x = localStorage.getItem('user'); // при загрузке сразу поучаем сведения о пользователе
	x = JSON.parse(x);
	if (x.email != 'admin') {
		name.innerHTML = x.name;
		email.innerHTML = x.email;
		pwd.innerHTML = x.password;
		p.innerHTML = x.point;
		que.innerHTML = x.que;
		ans.innerHTML = 0;
	}
	else{
		var profile_b = document.getElementById('profile_block');
		profile_b.removeChild(document.getElementById('user_profile'));
	// <a href="login.html"><button style="width: 100px;">Log out</button></a>
		var logOut = document.createElement('button');
			logOut.textContent = 'Log Out';
			logOut.style.position = 'absolute';
			logOut.onclick = () => {
				window.location.href = "../html/login.html"
			}
		var listUser = document.createElement('iframe');
			listUser.src = '../html/adminfall.html';
			listUser.style.height = '100%';
			listUser.style.width = '100%';
			profile_block.appendChild(listUser);
			profile_block.appendChild(logOut);
	}

});

document.getElementById('search').onclick = () => {
	window.window.location.href = "../html/main.html"; // load the next page 
}

function imageIsLoaded() { 
  // update width and height ...
}