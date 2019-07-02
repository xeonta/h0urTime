$(onDocumentReady);

function onDocumentReady() {
	loadCategories();
    connectButtons();
}

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
    let title = escapeUserInput($("#title").val());
    let date = escapeUserInput($("#date").val());
    let description = escapeUserInput($("#description").val());
    let categoryid = escapeUserInput($("#category-options").children(":selected").attr("id"));
    
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
		 loadContent("calendar.html");
    })
    .fail(function() { 
	console.log("Edit error.");
    });
}

function escapeUserInput(userInput) {
    return userInput
	.replace(/&/g, '&amp;')
	.replace(/>/g, '&gt;')
	.replace(/</g, '&lt;')
	.replace(/"/g, '&quot;');
}

function loadCategories(categoryid) { 
	console.log("Categories loading");
  
	$.ajax({
		url: "rest/categoryservice/loadAll",
		method: "GET",
		datatype: "json",
		contentType: "application/json",
	})

	.done(function(response) { 
		console.log(response);
		if(categoryid) {
			getCurrentCategory(response,categoryid);
		}
		else {
			categoryOptionsReady(response);
			refreshCategories(response);
		}	
	})
	.fail(function(jqXHR, statusText, error) { 
		var errorMsg = "Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText;
		console.log(errorMsg);
	});
}

function categoryOptionsReady(fetchedJSON) {
    let categoryOptions = $("#category-options");
    categoryOptions.empty();

    fetchedJSON.forEach((category) => {
	let option = $('<option id="'+ category.categoryid + '">' + category.name + '</option>');
	categoryOptions.append(option);
    });
}

function refreshCategories(fetchedJSON) {
    let categoryOptions = $("#editCategory");
    categoryOptions.empty();

    fetchedJSON.forEach((category) => {
	let option = $('<option onclick=\"\" id="'+ category.categoryid + '">' + category.name + '</option>');
	categoryOptions.append(option);
    });
}
