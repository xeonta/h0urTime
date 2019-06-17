$(document).ready(function() {
	var events = null;
	loadEvents();
});

function loadEvents() { 
	console.log("Events loading");
	
	$.ajax({
		url: "rest/eventservice/loadAll",
		method: "GET",
		datatype: "json",
		contentType: "application/json",
	})
	.done(function(response) { 
		console.log(response);
		overviewReady(response);
	})
	.fail(function(jqXHR, statusText, error) { 
		var errorMsg = "Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText;
		console.log(errorMsg);
	});

	console.log("Events finished loading");
}

function overviewReady(fetchedJSON) { 
	let overviewContainer = $("#overview-container");
	overviewContainer.empty();

	fetchedJSON.forEach((event) => {
		let eventRow = $("<div/>");
		eventRow.addClass("row");

		let eventCol = $("<div/>");
		eventCol.addClass("col-sm-2");
		
		let eventTitle = $("<div/>");
		eventTitle.addClass("col-sm-2");
		eventTitle.append(event.title);

		let hr = $("<hr>");

		eventRow.append(eventCol);
		eventRow.append(eventTitle);

		overviewContainer.append(categoryRow);
		overviewContainer.append(hr);
	});

}
