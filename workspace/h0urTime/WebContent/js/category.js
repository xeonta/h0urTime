$(document).ready(function() {
	var categories = null;
	loadCategories();
	connectButtons();
});

function connectButtons() { 
	$("#savebutton").click(createCategory);
}

function createCategory() {
	let nameInput = $("#name");
	//let colorInput = $("#color");

	let postData = {
		name: nameInput.val(),
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
	console.log("Categories loading");
	
	$.ajax({
		url: "rest/categoryservice/loadAll",
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

	console.log("Categories finished loading");
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
		console.log("Delete successful.");
		loadCategories();
	})
	.fail(function() { 
		console.log("Delete error.");
	});
}

function editCategory() { 
	
	let nameUpdate = $("#editname");
	//let colorInput = $("#color");


	let postData = {
		categoryid: id,
		name: nameUpdate.val(),
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

function editButton(id) {
	// I have no idea why this does not work 
	$("#editbutton").click(editCategory);  
}

/*
function editModalsReady(responseJSON) {
	let editContainer = $("edit-container");
	editContainer.empty();

	responseJSON.forEach((category) => {
		
		let modal = $('<div id="editModal"/>');
		modal.addClass("modal modal-dialog modal-md modal-content");

		let modalHeader = $('<div/>');
		modalHeader.addClass("modal-header");

		let header = $('<h4/>');
		header.addClass("modal-title");
		header.append("Edit category");

		let dismissButton = $('<button type="button" class="close" data-dismiss="modal"/>');
		dismissButton.append("&times;");

		let form = $("<form/>");

		let modalBody = $("<div/>");
		modalBody.addClass("modal-body form-group");

		let modalRow = $("<div/>");
		modalRow.addClass("row");
		
		let labelCol = $("<div/>");
		modalRow.addClass("col-sm-2");

		let label = $('<label for="name"/>');
		
		let inputCol = $('<div/>');
		inputCol.addClass("col-sm-9");

		let input = $('<label for="name" type="text" id="editname" name="editname"/>');

		let modalFooter = $('<div/>');
		modalFooter.addClass("modal-footer");

		let saveEdit = $('<button type="button" data-dismiss="modal" id="editbutton" onclick="editCategory(\'' + category.categoryid + '\')"/>');
		saveEdit.addClass("btn btn-success");

		modalHeader.append(header);
		modalHeader.append(dismissButton);

		label.append("Name: ");
		labelCol.append(label);
		inputCol.append(input);
		modalRow.append(labelCol);
		modalRow.append(inputCol);
		modalBody.append(modalRow);
		form.append(modalBody);

		saveEdit.append("Save");
		modalFooter.append(saveEdit);

		modal.append(modalHeader);
		modal.append(form);
		modal.append(modalFooter);

		editContainer.append(modal);

		<div class="modal" id="editModal">
			<div class="modal-dialog modal-md">
				<div class="modal-content">
					<!-- Modal Header -->
					<div class="modal-header">
						<h4 class="modal-title">Edit category</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<!-- Modal body -->
					<form>
					<div class="modal-body form-group">
						<div class="row">
							<div class="col-sm-2"><label for="name">Name: </label></div>
							<div class="col-sm-9"><input class="form-control" type="text" id="editname" name="editname"></div>
						</div>	
					</div>
					</form>
					<!-- Modal footer -->
					<div class="modal-footer">
						<button type="button" class="btn btn-success" data-dismiss="modal">Save</button>
					</div>
				</div>
			</div>
		</div>
	});
}*/

function categoriesReady(fetchedJSON) { 
	let categoryContainer = $("#category-container");
	categoryContainer.empty();

	fetchedJSON.forEach((category) => {
		let categoryRow = $("<div/>");
		categoryRow.addClass("row");

		let categoryCol = $("<div/>");
		categoryCol.addClass("col-sm-2");

		let categoryCheck = $('<input type="checkbox"/>');

		let categoryName = $("<div/>");
		categoryName.addClass("col-sm-8");
		categoryName.append(category.name);

		let editCol = $("<div/>");
		editCol.addClass("col-sm-1");
		let editButton = $('<button type="button" id="editbutton" data-toggle="modal" onclick="editButton(\'' + category.categoryid + '\')" data-target="#editModal"/>');
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

	/* 
	<div class="row">
		<div class="col-sm-2">
			<input type="checkbox">
		</div>
		<div class="col-sm-8">Category</div>
		<div class="col-sm-1">
			<button type="button" id="editbutton" class="btn btn-primary btn-sm">
				<i class="fas fa-edit"></i>
			</button>
		</div>
		<div class="col-sm-1">
			<button type="button" id="deletebutton" class="btn btn-primary btn-sm">
				<i class="fas fa-trash-alt"></i>
			</button>
		</div>
	</div>
	<hr>
	*/
}
