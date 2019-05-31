$(onDocumentReady);

function onDocumentReady() {
	loadDates();
	connectReloadButton();
}

function loadDates() {
	let getDatesMonth = $.get("calendarservice/dates");

}

function connectReloadButton() {
	var button = $("#reload-button");
	button.click(loadDates);
}

function createDate() {
	let	title = $("#title");
	let	datestart = $("#datestart");
	let	datestop = $("#datestop");
	let	description = $("#description");
	let	category = $("#category");

	// Create JSON
	let postData = {
		title: title.val(),
		datestart: datestart.val(),
		datestop: datestop.val(),
		description: description.val(),
		category: category.val(),
	};

	let createDatePromise = $.post("newDate", postData);

	createDatePromise.done(createDateSucceeded);

	createDatePromise.fail(createDateFailed);
}

function createDateSucceeded() {
	
}

function createDateFailed() {

}
