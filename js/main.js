const sol = document.getElementById('solutions');
const user = document.getElementById('user');
const body = document.querySelector('body');
// const ask = document.getElementById('askquestion');
const clock = document.getElementById('clock')

var point;

function allquestions(n){
	sol.textContent = '';
	var i = 0;
	if (n == 'admin') {
		let y = document.createElement('button');
				y.classList.add('change');			
				sol.appendChild(y);
					y.textContent = 'EDIT';
		let s = document.createElement('button');
				s.classList.add('save');			
				sol.appendChild(s);
					s.textContent = 'SAVE';
	}
	for(var item of solutions){
		var listItem = document.createElement('li');
	 		listItem.classList.add('li');
	 	var listText = document.createElement('p');
	 		$(listText).attr('data-id', `q_${i}`); 
	 	var listLink = document.createElement('a');
	 		$(listLink).attr('data-id', `a_${i}`); i++;
	 		listLink.classList.add('hide');

		
	 		listItem.appendChild (listText);
	        listText.innerHTML = item.que; 		
	 		listItem.appendChild (listLink);
	        listLink.textContent = item.sol;

	        if (n == 'admin') {
	        	$(listText).attr('contenteditable', 'true');
			let x = document.createElement('button');
				x.classList.add('delete');			
				listItem.appendChild(x);
					x.textContent = 'DEL';
			
			}

	        sol.appendChild(listItem);
	}
}
document.getElementById('search').oninput = () => {
		
    	let val = document.getElementById('search').value;
    	let all = document.querySelectorAll('#solutions li');
    	
    	if (val != '') {
    		all.forEach(function(elem){
    			if (elem.childNodes[0].innerText.search(val) == -1) {
    				elem.classList.add('hide');
    				elem.childNodes[0].innerHTML = elem.childNodes[0].innerText;
    			}
    			else {
    				elem.classList.remove('hide');
    				let str = elem.childNodes[0].innerText;
    				elem.childNodes[0].innerHTML = findSymbol(str, elem.innerText.search(val), val.length);
    			}
    		});
    	}
    	else {
    		all.forEach(function(elem){
    			elem.classList.remove('hide');
    			elem.childNodes[0].innerHTML = elem.childNodes[0].innerText;
    		});
    	}
    	function findSymbol(str, pos, len){
			return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len);
		}
    }
// *** clock js begin ** // 
	const deg = 6;
	const hr = document.querySelector('#hr');
	const mn = document.querySelector('#mn');
	const sc = document.querySelector('#sc');

	setInterval(() => {
			// получаем данные о текущей времени 
		let day = new Date();
		let hh = day.getHours() * 30;
		let mm = day.getMinutes() * deg;
		let ss = day.getSeconds() * deg;

		hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`; 
		mn.style.transform = `rotateZ(${mm}deg)`;
		sc.style.transform = `rotateZ(${ss}deg)`;
		
	});
// *** clock js end ** //
var userArr = {};

window.onload = () =>{
	userArr = localStorage.getItem('user'); // при загрузке сразу поучаем сведения о пользователе
	userArr = JSON.parse(userArr); // преобразуем их в его стандартный тип
	// console.log(x)
	user.innerHTML = userArr.name; // передаем на экран имя
	
	point = parseInt(userArr.point);
	if(point >= 99) {
		document.getElementById('npoint').innerHTML = '&infin;';
		document.getElementById('npoint').style.fontSize = '2rem';
	}
	else{
		document.getElementById('npoint').innerText = point;
		document.getElementById('npoint').style.alignItems = 'center';

	}
	console.log(userArr.name); // для себя чисто
	if (window.location.pathname.includes("main.html")) {
		if (userArr.email == 'admin') {
			adminPanel();
		}
		else{
			allquestions(0);
		}
	}
	
}

let q,a; // question & answer variables
document.onclick = e => { // при клике мышкой на обьект получаем данные об объекте
			// console.log(e);
				if (e.target.classList.contains('delete')) { // admin
					let delli = e.target.parentNode;
					sol.removeChild(delli);
				}
				if (e.target.classList.contains('change')) { // admin
					let delli = e.target.parentNode;
					userArr.point = 0;
					point = 0;
					let all_q = document.querySelectorAll('p');
					all_q.forEach((p)=>{
						p.contentEditable = 'true';
					});
				}
				if (e.target.classList.contains('save')) { // admin
					let delli = e.target.parentNode;
					console.log(e);
					let all_p = document.querySelectorAll('p');
					all_p.forEach((p)=>{
						p.contentEditable = 'false';
					});
					userArr.point = 1000;
					point = 1000;
				}
				if (e.target.id == 'logo' ) {
					loading();
					localStorage.setItem('user', JSON.stringify(userArr));
					setTimeout(()=>{
						window.window.location.href = "../html/main.html"; // load the next page 
					},2000);
				}
				if (e.target.id == 'user'){
					loading();
					localStorage.setItem('user', JSON.stringify(userArr));

					setTimeout(()=>{
						window.window.location.href = "../html/profile.html"; // load the next page 
					},2000);
				}
			    if (e.target.tagName == "ASIDE") { // if aside already created we delete it
			    	let x = document.querySelector('#visible'); // get value of aside by id
				 	body.removeChild(x); // delete aside from body
				}
				else if (e.target.classList.contains('li')) { // если кликнули на лист то ищем содержит ли этот лист класс Ли 
					q = event.target.firstChild.dataset.id; // если да, то выводим дата-айди первого дочерного элемента
					a = event.target.lastChild.dataset.id; // если да, то выводим дата-айди последнего дочерного элемента
					answers(q,a); // send question answer ids to next window
				
				}
				else if (e.target.dataset.id) { // если же кликнули по ссылке(параграф) то ищем сразу дата-айди
					q = event.target.dataset.id; // question:
					a = event.target.parentNode.lastChild.dataset.id; // answer: выводим дата-айди последнего дочерного элемента родительского элемента
					answers(q,a); // send qestion answer ids to next window
				}
}
function answers(q, a){
		point--; // when get answer for question we lost points
		userArr.point--;
		if (point >= 0) { // if we have some points we can get answer
			if(point >= 99) {
				document.getElementById('npoint').innerHTML = '&infin;';
				document.getElementById('npoint').style.fontSize = '2rem';
			}
			else{
				document.getElementById('npoint').innerText = point;
				document.getElementById('npoint').style.fontSize = '1.4rem';
				document.getElementById('npoint').style.alignItems = 'center';

			}
		    var mute = document.createElement('aside');
	 			$(mute).attr('id', `visible`); 
		    var block = document.createElement('div');
		    	block.classList.add('AnsPage');
	        var question = document.createElement('q');
	        	question.classList.add('visible');
	        var answer = document.createElement('p');
	        	answer.classList.add('visible');

	        	let all = document.querySelectorAll('#solutions li');
	    	
		    	if (q != '' && q != undefined) {
		    		all.forEach(function(elem){
		    			if(elem.childNodes[0].dataset.id == q){
		    				question.textContent = elem.childNodes[0].textContent;
		    				answer.textContent = elem.childNodes[1].textContent;
		    			}
		    		});
		    	}
	        block.appendChild (question);
	        block.appendChild (answer);
	        mute.appendChild (block);

	        mute.style.cssText = `
	        	display: flex;
	        	position: absolute;
	        	top:0;
	        	left:0;
	        	width: 100vw;
	        	background-color: #4fb3f69e;
	        	min-height: 100vh;
	        	z-index: 999;
	        	opacity: 1;
				justify-content:center;
				align-items:flex-start;
				padding: 50px;
	        `;
			question.focus();
	        body.appendChild(mute);
		}
		else{
			// перебросить на страницу покупки
		}
}
function ask() {
	askblock();		    
	}
// array of available subjects
	subjects = [
	{
		ject : 'Business',
		0: 'Accounting',
		1: 'Economics',
		2: 'Finance',
		3: 'Management'
	},
	{
		ject : 'Science',
		0: 'Biology',
		1: 'Chemistry',
		2: 'Physics',
		3: 'Advanced Physics'
	},
	{
		ject: 'Math',
		0: 'Algebra',
		1: 'Calculus',
		2: 'Geometry',
		3: 'Probability',
		4: 'Statictics',
		5: 'Trigonometry',
		6: 'Advanced Math'
	}
	];
function askblock (){
	var k = 0;
	var mute = document.createElement('aside');
	// create ask question block
 		$(mute).attr('id', `visible`); 
	    var block = document.createElement('div');
	    	block.classList.add('AnsPage');
	    	block.classList.add('AskQ');
        var select = document.createElement('select');
        	select.classList.add('subjects');
        	var chooseSubject = document.createElement('option');
        		chooseSubject.textContent = 'Choose a Subject';
        		chooseSubject.style.color = 'gray';
        		chooseSubject.style.backgroundColor = 'white';

        	select.appendChild(chooseSubject);
        for(var sub of subjects){
        	var optgroup = document.createElement('optgroup');
        		optgroup.label = sub.ject;
        		for(var i in sub){
        			if (i != "ject") {
        				var option = document.createElement('option');
        					option.textContent = sub[i];
        					$(option).attr('id', `option_${k}`); 
        					$(option).attr('value', `${k}`); k++;
        					optgroup.appendChild(option);
        			}
        		}
        	select.appendChild(optgroup);
        };
	    
	    var title_div = document.createElement('div');
			$(title_div).attr('id', `title_div`);
	        var h1 = document.createElement('h3');
	        	h1.textContent = 'Title';
	        var title = document.createElement('input');
	        	title.placeholder = 'e.g. Is there an R function for finding the index of an element in a vector?';
	    	title_div.appendChild(h1);
	    	title_div.appendChild(title);
	        
		var bodie_div = document.createElement('div');
			$(bodie_div).attr('id', `bodie`);
			var h2 = document.createElement('h3');
	        	h2.textContent = 'Body';
		    var bodie = document.createElement('div');    
		        var file = document.createElement('input');
		        	file.type = 'file';
		        	file.id = 'file';
		        var label = document.createElement('label');
		        	label.for = 'file';
		        	$(label).attr('for', file.id);
		        	var span = document.createElement('span');
		        		span.id = 'filecss';
		        		var img = document.createElement('img');
		        			img.src = '../img/upload.png';
		        		span.appendChild(img);
		        		var p = document.createElement('b');
		        			p.textContent = 'Upload File'
		        		span.appendChild(p);
		        	label.appendChild(span);

		        var text = document.createElement('textarea');
		        	text.placeholder = "What is your question?";
		        bodie.appendChild(text);
	    		bodie.appendChild(label);
		        bodie.appendChild(file);
	    	bodie_div.appendChild(h2);
	    	bodie_div.appendChild(bodie);

	    var button = document.createElement('button');
	    	button.textContent = "Send Question";
	    var h0 = document.createElement('h1');
	    	h0.textContent = " Ask Question";

	    //style of invisible element via JS 
	    	mute.style.cssText = `
	        	display: flex;
	        	position: absolute;
	        	top:0;
	        	left:0;
	        	width: 100vw;
	        	background-color: #4fb3f69e;
	        	min-height: 100vh;
	        	z-index: 999;
	        	opacity: 1;
				justify-content:center;
				align-items:flex-start;
	        `;
	    block.appendChild(h0);
	    block.appendChild(select);
	    block.appendChild(title_div);
	    block.appendChild(bodie_div);
	    block.appendChild(button);
	   	mute.appendChild(block);
	// include our ask Question window as a child of body
   	body.appendChild(mute);

   	// oninput some document we change icon and remove text
   	file.onchange = () => {
   		img.src = '../img/uploaded.png';
   		span.removeChild(p);
   		img.style.height = '70px';
   	}
   	// on click submit question run this finction
   	button.onclick = () => {
   		if (title.value != '' && title.value.length >= 10 && text.value != '' && (select.value != '' && select.value != undefined && select.value != 'Choose a Subject' ) ) {
   			loading(); // run loading animation 
	   		solutions.unshift({ // push question into array
	   			title: title.value,
	   			que: title.value + '<br>' + text.value,
	   			sol: '',
	   			subject: select.value,
	   			file: file.value
	   			});
	   			userArr.que == undefined ? userArr.que = 1 : userArr.que++;

	   		allquestions();
	   		body.removeChild(mute);
   		}
   	}
}


