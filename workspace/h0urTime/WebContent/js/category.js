$(document).ready(function() {
	var categories = null;
	loadCategories();
	connectButtons();
});

var modalEditId;

function connectButtons() { 
	$("#savebutton").click(createCategory);
	$("#editbutton").click(editCategory);
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
		categoryid: modalEditId,
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

function passIdToModal(id) {
	modalEditId = id;
}

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
		let editButton = $('<button type="button" id="editbutton" data-toggle="modal" onclick="passIdToModal(\'' + category.categoryid + '\')" data-target="#editModal"/>');
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
