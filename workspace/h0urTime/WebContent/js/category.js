$(document).ready(function() {
	loadCategories();
	connectButtons();
});

var modalEditId;

function connectButtons() { 
	$("#savebutton").click(valEmptyCreateInput);
	$("#editbutton").click(valEmptyEditInput);
}

function valEmptyCreateInput() {
    let input = $("#name").val();
    
    if (input == "") {
	alert("Error. Fields must be filled out.");
	return false;
    } else {
	createCategory();
    }
}

function valEmptyEditInput() {
    let input = $("#editname").val();

    if (input == "") {
	alert("Error. Fields must be filled out.");
	return false;
    } else {
	editCategory();
    }
}

function escapeUserInput(userInput) {
    return userInput
	.replace(/&/g, '&amp;')
	.replace(/>/g, '&gt;')
	.replace(/</g, '&lt;')
	.replace(/"/g, '&quot;');
}

function connectCheckbox() {
	// add or remove categories from the selectedCategories array
	$(":checkbox").click(function(){
	    if($(this).is(':checked')){
	    	selectedCategories.push($(this).val());
	    	
	    } else {
	    	selectedCategories.splice(selectedCategories.indexOf($(this).val()), 1);
	    }
	});
}

function createCategory() {

    let nameInput = escapeUserInput($("#name").val());
	//let colorInput = $("#color");

	let postData = {
	    name: nameInput,
	    color: "blue",
	};

	let postDataJsonString = JSON.stringify(postData);

	$.ajax({
		url: "rest/categoryservice/create",
		method: "POST",
		data: postDataJsonString,
		dataType: "json",
		contentType: "application/json",
	})
	.done(function() { 
		loadCategories();
	})
	.fail(function() { 
		console.log("Edit error.");
	});
}

function loadCategories() {
	$.ajax({
		url: "rest/categoryservice/loadAll",
		method: "GET",
		datatype: "json",
		contentType: "application/json",
	})
	.done(function(response) {
		categoriesReady(response);
	})
	.fail(function(jqXHR, statusText, error) { 
		var errorMsg = "Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText;
		console.log(errorMsg);
	});
}

function deleteCategory(id) { 

	let postData = {
		categoryid: id,
	};

	let deleteDataJsonString = JSON.stringify(postData);

	$.ajax({
		url: "rest/categoryservice/delete",
		method: "POST",
		data: deleteDataJsonString,
		datatype: "json",
		contentType: "application/json",
	})
	.done(function() {
		loadCategories();
	})
	.fail(function() { 
		console.log("Delete error.");
	});
}

function editCategory() { 
	
    let nameUpdate = escapeUserInput($("#editname").val());
	//let colorInput = $("#color");

	let postData = {
		categoryid: modalEditId,
		name: nameUpdate,
		color: "blue",
	};

	let editDataJsonString = JSON.stringify(postData);

	$.ajax({
		url: "rest/categoryservice/update",
		method: "POST",
		data: editDataJsonString,
		datatype: "json",
		contentType: "application/json",
	})
	.done(function() { 
		loadCategories();
	})
	.fail(function() { 
		console.log("Edit error.");
	});
}

function passIdToModal(id, name) {
    modalEditId = id;
    document.getElementById("editname").value = name;
}

function categoriesReady(fetchedJSON) { 
	let categoryContainer = $("#category-container");
	categoryContainer.empty();

	fetchedJSON.forEach((category) => {
		let categoryRow = $("<div/>");
		categoryRow.addClass("row");

		let categoryCol = $("<div/>");
		categoryCol.addClass("col-sm-2");

		let categoryCheck = $('<input type="checkbox" value=""/>');
		categoryCheck.val(category.categoryid);
		if(selectedCategories.includes(categoryCheck.val())) {
			categoryCheck.prop('checked', true);
		}
		else {
			categoryCheck.prop('checked', false);
		}

		let categoryName = $("<div/>");
		categoryName.addClass("col-sm-8");
	        categoryName.append(category.name);

		let editCol = $("<div/>");
		editCol.addClass("col-sm-1");
		let editButton = $('<button type="button" id="editbutton" data-toggle="modal" onclick="passIdToModal(\'' + category.categoryid + '\', \'' + category.name + '\')" data-target="#editModal"/>');
		editButton.addClass("btn btn-primary btn-sm");
		let editIcon = $("<i/>");
		editIcon.addClass("fas fa-edit");

		let delCol = $("<div/>");
		delCol.addClass("col-sm-1");

		let delButton = $('<button type="button" id="deletebutton" onclick="deleteCategory(\'' + category.categoryid + '\')"/>');
		delButton.addClass("btn btn-primary btn-sm");
		let delIcon = $("<i/>");
		delIcon.addClass("fas fa-trash-alt");

		let hr = $("<hr>");

		categoryCol.append(categoryCheck);
		editButton.append(editIcon);
		editCol.append(editButton);
		delButton.append(delIcon);
		delCol.append(delButton);

		categoryRow.append(categoryCol);
		categoryRow.append(categoryName);
		categoryRow.append(editCol);
		categoryRow.append(delCol);

		categoryContainer.append(categoryRow);
		categoryContainer.append(hr);
	});

	connectCheckbox();
}
