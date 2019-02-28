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
		neuerInhalt = neuerInhalt + "<li>" + nachricht + 
			"<button type='button' onclick='nachrichtEntfernen(" + laufendeNummer + ")'>L&ouml;schen</button></li>";	
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
	var nachricht = document.getElementById("neueNachricht").value;
	var request = new XMLHttpRequest();
	request.addEventListener("load", () => { aktualisieren(); });
	request.open("POST", serverAdresse);
	request.send(nachricht);
}

document.onreadystatechange = () => {
	console.log("ReadyState: " + document.readyState);
	if (document.readyState === 'complete') {
		aktualisieren();
	}
}

window.setInterval(() => {
	var request = new XMLHttpRequest();
	request.addEventListener("load", onLoadListener);
	request.open("GET", serverAdresse);
	request.send();
}, 100);