function loading(){
        var mute = document.createElement('article');
        var point1 = document.createElement('div');
        	point1.className = `line`;
        var point2 = document.createElement('div');
        	point2.className = `line`;
        var point3 = document.createElement('div');
        	point3.className = `line`;
        var body = document.querySelector('body');

        mute.appendChild (point1);
        mute.appendChild (point2);
        mute.appendChild (point3);

        mute.style.cssText = `
        	display: flex;
        	position: absolute;
                top: 0;
                left: 0;
        	width: 100vw;
        	height: 100vh;
        	background-color: black;
        	z-index: 999;
        	opacity: 0.8;
			justify-content:center;
			align-items:center;
        `;
        body.appendChild(mute);
        setTimeout(()=>{
        	body.removeChild(mute);
        },2000);
}