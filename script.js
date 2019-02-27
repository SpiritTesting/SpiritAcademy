function toggleText() {
	toggleDisplayAttribute(document.getElementById('inhalt'));
}

function toggleDisplayAttribute(element) {
	if (getDisplayAttribute(element) === 'none') {
		setDisplayAttribute(element, 'block');
	} else {
		setDisplayAttribute(element, 'none');
	}
}

function getDisplayAttribute(element) {
	return element.style['display'];
}

function setDisplayAttribute(element, value) {
	element.style['display'] = value;
}