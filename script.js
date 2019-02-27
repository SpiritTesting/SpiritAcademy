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
	json.forEach(function(nachricht) {
		neuerInhalt = neuerInhalt + "<li>" + nachricht + "</li>";
	});
	neuerInhalt = neuerInhalt + "</ul>";

	inhaltselement.innerHTML = neuerInhalt;
}
