const serverAdresse = "http://spirit-academy.herokuapp.com/api/echo";

function aktualisieren() {
	// Verbindung zum Nachrichtenserver aufbauen und Nachrichten abrufen
	var request = new XMLHttpRequest();
	request.addEventListener("load", onLoadListener);
	request.open("GET", serverAdresse);
	request.send();
}

function onLoadListener() {
	// Inhaltselement identifizieren und Referenz bekommen
	var inhaltselement = document.getElementById('inhalt');
	var json = JSON.parse(this.responseText);
	var neuerInhalt = "<ul>";
	
	for (laufendeNummer = 0; laufendeNummer < json.length; laufendeNummer++ ) {
		var nachricht = json[laufendeNummer];
		var klasse = nachricht.startsWith(localStorage.getItem('username')) ? 'meinEintrag' : 'vonAnderen';
		console.log(klasse);
		neuerInhalt = neuerInhalt + "<li class='" + klasse + "'><button type='button' onclick='nachrichtEntfernen(" + 
		laufendeNummer + ")'>X</button>" + nachricht + "</li>";	
	}
	neuerInhalt = neuerInhalt + "</ul>";

	inhaltselement.innerHTML = neuerInhalt;
}

function nachrichtEntfernen(laufendeNummer) {
	var request = new XMLHttpRequest();
	request.addEventListener("load", () => { aktualisieren(); });
	request.open("DELETE", serverAdresse + "/" + laufendeNummer);
	request.send();
}

function neueNachrichtSenden() {
	var name = document.getElementById("username").value;
	var nachricht = document.getElementById("neueNachricht").value;
	if (name) { 
		nachricht = name + " sagt: " + nachricht; 
	}
	var request = new XMLHttpRequest();
	request.addEventListener("load", () => { aktualisieren(); });
	request.open("POST", serverAdresse);
	request.send(nachricht);
}

function setUsername() {
	var name = document.getElementById("username").value;
	localStorage.setItem('username', name);
}

document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		var username = localStorage.getItem('username');
		if (username) {
			document.getElementById('username').value = username;
		}
		aktualisieren();
	}
}

window.setInterval(() => {
	var request = new XMLHttpRequest();
	request.addEventListener("load", onLoadListener);
	request.open("GET", serverAdresse);
	request.send();
}, 1000);