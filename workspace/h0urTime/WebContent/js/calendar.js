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

function createEvent() {
	let titleInput = $("#title");
	let dateInput = $("#date");
	let descriptionInput = $("#description");
	let categoryInput = $("#category");

	let postData = {
	    name: titleInput.val(),
	    color: dateInput.val(),
	    description: descriptionInput .val(),
	    color: categoryInput .val(),
	};

	let postDataJsonString = JSON.stringify(postData);

	$.ajax({
		url: "rest/eventservice/create",
		method: "POST",
		data: postDataJsonString,
		dataType: "json",
		contentType: "application/json",
	})
	.done(function() { 
		loadEvents();
	})
	.fail(function() { 
		console.log("Error.");
	});
}

function loadEvents() { 
	$.ajax({
		url: "rest/eventservice/loadAll",
		method: "GET",
		datatype: "json",
		contentType: "application/json",
	})
	.done(function(response) { 
		console.log(response);
		categoriesReady(response);
	})
	.fail(function(jqXHR, statusText, error) { 
		var errorMsg = "Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText;
		console.log(errorMsg);
	});
}

function deleteCategory(id) { 

	let postData = {
		event: id,
	};

	let deleteDataJsonString = JSON.stringify(postData);

	$.ajax({
		url: "rest/eventservice/delete",
		method: "POST",
		data: deleteDataJsonString,
		datatype: "json",
		contentType: "application/json",
	})
	.done(function() { 
		console.log("Delete successful.");
		loadEvents();
	})
	.fail(function() { 
		console.log("Delete error.");
	});
}
