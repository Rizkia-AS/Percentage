// event listener
const operator = document.querySelector('.container.operator');
const historyPanel = document.querySelector('.container.history');



// DOM
const saveName = document.querySelector('.save_name');
const child = document.querySelector('.form input:nth-child(2)');
const base = document.querySelector('.form input:nth-child(4)');
const result = document.querySelector('.result p span');
const historyList = document.querySelector('.history_list');

// storage key
const SSK_percentageHistoryList = `Percentage_History_List` ;



// action
let HistoryHTML = [];
let percent = '';




// load event
window.addEventListener(`load`, function() {
	if(checkStorage() == true) {
		document.querySelector(`.ss_check`).innerText = `active`
	} else { document.querySelector(`.ss_check`).innerText = `not active`}

	createListHTML(loadDataSS() || []);
})



// operator click event
operator.addEventListener('click', function(event) {
	const a = saveName.value;
	const c = parseInt(child.value);
	const b = parseInt(base.value);
	let percent = null;

	if(event.target.className == 'btResult' ) {
		if(c > b) {
			alert(`Child has more value than base !`);
			return ;
		}

		percent = Math.round((c / b) * 100) ;
		result.innerHTML = ''+ percent +''
	};

	if(event.target.className == 'btSaveReset' ) {
		HistoryHTML = loadDataSS() || [];
		addHistoryList(a,c,b,percent);
		upDataSS(HistoryHTML);
		createListHTML(loadDataSS());
		clearForm(`savereset`);
	};

	if(event.target.className == 'btReset') { clearForm(); }
});



// history panel click event
historyPanel.addEventListener('click', function(event){

	if(event.target.className == 'delete') {
		let ask = confirm('Delete this history ?');
		if(ask == true) {
			event.target.parentElement.parentElement.remove(); }
	}
}); 





















// FUNCTION MODULE
function checkStorage() {
	return typeof(Storage) !== `undefined`;
}

function addHistoryList(name,child,base,result) {
	HistoryHTML.unshift({
		saveName : name,
		child : child,
		base : base,
		result : result,
	});

	if(HistoryHTML.length > 5) { HistoryHTML.pop(); }
}

function createListHTML(data) {
	historyList.innerHTML = ``;
	data.map(d => { printListHTML(d); })
}

function printListHTML(data) {
	const divList = document.createElement('div');
	divList.classList.add('list');

	const divTitle = document.createElement('div');
	divTitle.classList.add('title');

	// create h3
	const h3 = document.createElement('h3');
	const th3 = document.createTextNode(''+ data.saveName +'');

	// create delete
	const del = document.createElement('button');
	const tdel = document.createTextNode('delete');
	del.classList.add('delete');

	// create <p>child :  
	const p = document.createElement('p');

	const t1 = document.createTextNode('child : ');
	const span1 = document.createElement('span');
	const fspan1 = document.createTextNode(''+ data.child +'');

	// create base : 
	const t2 = document.createTextNode('base : ');
	const span2 = document.createElement('span');
	const fspan2 = document.createTextNode(''+ data.base +'');

	// create result : 
	const t3 = document.createTextNode('result : ');
	const span3 = document.createElement('span');
	const fspan3 = document.createTextNode(''+ data.result +'');


	// assembly
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
}

function clearForm(option) {
	child.value = "";
	base.value = "";
	if(option == `savereset`) {saveName.value = "";}
	result.innerHTML = "";
}

function upDataSS(data) {
	sessionStorage.setItem(SSK_percentageHistoryList, JSON.stringify(data));
}

function loadDataSS() {
	return JSON.parse(sessionStorage.getItem(SSK_percentageHistoryList));
}