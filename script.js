// event listener
const operator = document.querySelector('.container.operator');
const historyPanel = document.querySelector('.container.history');



// value and result
const saveName = document.querySelector('.save_name');

const child = document.querySelector('.form input:nth-child(2)');
const base = document.querySelector('.form input:nth-child(4)');
const result = document.querySelector('.result p span');





// history list
const historyList = document.querySelector('.history_list');




let percent = '';
operator.addEventListener('click',function(event) {

	if(event.target.className == 'btResult' ) {
		percent = (child.value / base.value) * 100 ;
		result.innerHTML = ''+ percent +''
	};


	

	if(event.target.className == 'btSaveReset' ) {
		// CREATE NEW HISTORY LIST
		const divList = document.createElement('div');
		divList.classList.add('list');

		const divTitle = document.createElement('div');
		divTitle.classList.add('title');

		// create h3
		const h3 = document.createElement('h3');
		const th3 = document.createTextNode(''+ saveName.value +'');

		// create delete
		const del = document.createElement('button');
		const tdel = document.createTextNode('delete');
		del.classList.add('delete');

		// create <p>child :  
		const p = document.createElement('p');

		const t1 = document.createTextNode('child : ');
		const span1 = document.createElement('span');
		const fspan1 = document.createTextNode(''+ child.value +'');

		// create base : 
		const t2 = document.createTextNode('base : ');
		const span2 = document.createElement('span');
		const fspan2 = document.createTextNode(''+ base.value +'');

		// create result : 
		const t3 = document.createTextNode('result : ');
		const span3 = document.createElement('span');
		const fspan3 = document.createTextNode(''+ percent +'');


		// bundling

		span1.appendChild(fspan1);
		span2.appendChild(fspan2);
		span3.appendChild(fspan3);

		p.appendChild(t1);
		p.appendChild(span1);
		p.appendChild(t2);
		p.appendChild(span2);
		p.appendChild(t3);
		p.appendChild(span3);

		h3.appendChild(th3);
		del.appendChild(tdel);

		divTitle.appendChild(h3);
		divTitle.appendChild(del);

		divList.appendChild(divTitle);
		divList.appendChild(p);


		historyList.appendChild(divList);
		
		


		child.value = "";
		base.value = "";
		saveName.value = "";
		result.innerHTML = "";
	};

	if(event.target.className == 'btReset') {
		child.value = "";
		base.value = "";
		result.innerHTML = '';
	}



	
});



historyPanel.addEventListener('click', function(event){

	if(event.target.className == 'delete') {
		let ask = confirm('Delete this history ?');
		if(ask == true) {
			event.target.parentElement.parentElement.remove();
		}
	}

}); 