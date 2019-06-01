$(document).ready(function() {
	loadCategories();
	connectReloadButton();
	connectSaveButton();
});

function connectSaveButton() { 
	$("#savebutton").click(createCategory);
}

function createCategory() {
	let nameInput = $("#name");

	let postData = {
		name: nameInput.val(),
		color: "blue",
	};

	let postDataJsonString = JSON.stringify(postData);

	let createCategoryPromise = $.ajax({
		url: "rest/categoryservice",
		method: "POST",
		data: postDataJsonString,
		dataType: "json",
		contentType: 'application/json',
	});

	createCategoryPromise.done(onCreateCategorySucc);

	createCategoryPromise.fail(onCreateCategoryFail);
}

function onCreateCategorySucc() {
	$("#name").val("");
	alert("Du bist doch nicht so dumm.");
	//loadCategories();
}

function onCreateCategoryFail() {
	alert("Du bist dumm!");
}

function loadCategories() { 
	console.log("Categories loading");
	
	let getCategories = $.getJSON("categoryservice/category.json");

	getCategories.done(categoriesReady);
	/* getCategories.fail(categoriesFailed); */

	console.log("Categories finished loading");
}

function categoriesFailed() { 
	console.log("fail");
	alert("can not load categories");
}

function categoriesReady(fetchedJSON) { 
	let categoryContainer = $("#category-container");
	categoryContainer.empty();

	fetchedJSON.forEach((entry) => {
		let categoryRow = $("<div/>");
		categoryRow.addClass("row");

		let categoryCol = $("<div/>");
		categoryCol.addClass("col-sm-2");

		let categoryCheck = $("<input/>");
		categoryCheck.addType("checkbox");

		let categoryName = $("<div/>");
		categoryName.addClass("col-sm-8");
		categoryName.append("Name");

		let editCol = $("<div/>");
		editCol.addClass("col-sm-1");
		let editButton = $("<button/>");
		editButton.addType("button");
		editButton.addClass("btn btn-primary btn-sm");
		let editIcon = $("<i/>");
		editIcon.addClass("fas fa-edit");

		let rmCol = $("<div/>");
		rmCol.addClass("col-sm-1");

		let rmButton = $("<button/>");
		rmButton.addType("button");
		rmButton.addClass("btn btn-primary btn-sm");
		let rmIcon = $("<i/>");
		rmIcon.addClass("fas fa-trash-alt");

		let hr = $("<hr>");

		categoryCol.append(categoryCheck);
		editButton.append(editIcon);
		editCol.append(editButton);
		rmButton.append(rmIcon);
		rmCol.append(rmButton);
		categoryRow.append(categoryCol);
		categoryRow.append(editCol);
		categoryRow.append(rmCol);
	});
	/* 
	<div class="row">
		<div class="col-sm-2">
			<input type="checkbox"
				>
		</div>
		<div class="col-sm-8">Home</div>
		<div class="col-sm-1">
			<button type="button" class="btn btn-primary btn-sm">
				<i class="fas fa-edit"></i>
			</button>
		</div>
		<div class="col-sm-1">
			<button type="button" class="btn btn-primary btn-sm">
				<i class="fas fa-trash-alt"></i>
			</button>
		</div>
	</div>
	<hr>
	*/
}

function connectReloadButton() { 
	var button = $("#reload-button");

	button.click(loadCategories);
}
