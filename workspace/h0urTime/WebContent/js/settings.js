$(document).ready(function() {
	connectButtons();
});

function connectButtons() { 
	$("#savebutton").click(createUser);
}

function createUser() {
	let nameInput = $("#name");
	
	let postData = {
		name: nameInput.val(),
	};

	let postDataJsonString = JSON.stringify(postData);

	$.ajax({
		url: "rest/userservice/create",
		method: "POST",
		data: postDataJsonString,
		dataType: "json",
		contentType: "application/json",
	})
	.done(function() { 
		//loadCategories();
	})
	.fail(function() { 
		console.log("Edit error.");
	});
}

