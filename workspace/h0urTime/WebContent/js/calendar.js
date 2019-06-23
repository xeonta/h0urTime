$(onDocumentReady);

function onDocumentReady() {
    loadCategories();
    connectButtons();

    $("#category-options").change(function() {
	categoryid = $(this).children(":selected").attr("id");
    });
}

var categoryid;

function connectButtons() {
    $("#savebutton").click(valCreateEventInput);
}

function valCreateEventInput() {
    let title = $("#title").val();
    let date = $("#date").val();

    if (title == "" || date == "") {
	alert("Error. Fields must be filled out.")
	return false;
    } else {
	createEvent();
    }
}

function createEvent() {
    let title = escape($("#title").val());
    let date = escape($("#date").val());
    let description = escape($("#description").val());
    
    // Create JSON
    let postData = {
	title: title,
	date: date,
	description: description,
	categoryid: categoryid,
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

    })
    .fail(function() { 
	console.log("Edit error.");
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

function deleteEvent(id) { 

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

function loadCategories() { 
	console.log("Categories loading");

	$.ajax({
		url: "rest/categoryservice/loadAll",
		method: "GET",
		datatype: "json",
		contentType: "application/json",
	})
	.done(function(response) { 
		console.log(response);
		categoryOptionsReady(response);
	})
	.fail(function(jqXHR, statusText, error) { 
		var errorMsg = "Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText;
		console.log(errorMsg);
	});

	console.log("Categories finished loading");
}

function categoryOptionsReady(fetchedJSON) {
    let categoryOptions = $("#category-options");
    categoryOptions.empty();

    fetchedJSON.forEach((category) => {
	let option = $('<option id="'+ categoryid + '">' + category.name + '</option>');
	categoryOptions.append(option);
    });
}
