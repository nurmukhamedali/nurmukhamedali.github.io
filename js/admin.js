function adminPanel() {
 	
	
	localStorage.setItem('accounts', JSON.stringify(users));

 	xForLi();
 	createPanel();


 }


 function xForLi(){
 	allquestions('admin');
 }

 function createPanel(){
 	var panel = document.createElement('div');
 		panel.classList.add('panel');
 		var adminText = document.createElement('h2');
 			adminText.textContent = '**ADMIN  PANEL**';
 		var body_color = document.createElement('input');
 			body_color.type = 'color';
 			$(body_color).attr('id','bdyclr');
 		var label_bc = document.createElement('label');
 			$(label_bc).attr('for', 'clkclr');
 			label_bc.textContent = "BODY COLOUR";
 		var clock_color = document.createElement('input');
 			clock_color.type = 'color';
 			$(clock_color).attr('id','clkclr');
 		var label_cc = document.createElement('label');
 			$(label_cc).attr('for', 'clkclr');
 			label_cc.textContent = "CLOCK COLOUR";

 		var editable = document.createElement('button');
 			editable.textContent = "Editable False";



 		var sumbit = document.createElement('button');
 			$(sumbit).attr('id',`submit`);
 			sumbit.textContent = 'Submit';

 		sumbit.onclick = () => {
 			body.style.backgroundColor = body_color.value;
 			clock.style.backgroundColor = clock_color.value;
 		}
 		var isEditable;
 		editable.onclick = () => {
 			if (!isEditable) {
 				$('.change').click();
 			}
 			else 
 				$('.save').click();
 			isEditable = !isEditable;
 			// $("button").attr("disabled", isEditable);
 			$("input").attr("disabled", isEditable);
 			$("a").attr("disabled", isEditable);
 			$("div").attr("disabled", isEditable);
 			$('#submit').attr("disabled", false);
 			$(editable).attr("disabled", false);


 			document.getElementById('page').contentEditable = isEditable;
 			editable.innerText =  'Editable ' + isEditable;
 		}

 	panel.appendChild(adminText);

 	label_bc.appendChild(body_color);
 	panel.appendChild(label_bc);
 	label_cc.appendChild(clock_color);
 	panel.appendChild(label_cc);
 	panel.appendChild(sumbit);
 	panel.appendChild(editable);


 	document.getElementById('buy').appendChild(panel);
 }