$(document).ready(function() {
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
	
	let eventTable = $("<table/>");
	eventTable.addClass("table");
	overviewContainer.append(eventTable);
	
	let eventThead = $("<thead/>");
	eventTable.append(eventThead);
	
	let eventTRhead = $("<tr/>");
	eventThead.append(eventTRhead);
	
	let eventTHDate = $("<th/>");
	eventTHDate.append("Date");
	eventTRhead.append(eventTHDate);
	
	let eventTHTitel = $("<th/>");
	eventTHTitel.append("Titel");
	eventTRhead.append(eventTHTitel);
	
	let eventTHDesc = $("<th/>");
	eventTHDesc.append("Description");
	eventTRhead.append(eventTHDesc);
	
	let eventTbody = $("<tbody/>");
	eventTable.append(eventTbody);
	
	
	fetchedJSON.forEach((event) => {
		var eventDate = new Date(event.date);
		
		if(eventDate > new Date()){ //If not in past

			let eventTRbody = $("<tr/>");
			eventTbody.append(eventTRbody);
						
			let eventTdDate = $("<td/>");
			eventTdDate.append(eventDate.toLocaleDateString());
			eventTbody.append(eventTdDate);

			let eventTdTitel = $("<td/>");
		        eventTdTitel.append(unescape(event.title));
			eventTbody.append(eventTdTitel);

			let eventTdDesc = $("<td/>");
		        eventTdDesc.append(unescape(event.description));
			eventTbody.append(eventTdDesc);

        }
        
	});

}
