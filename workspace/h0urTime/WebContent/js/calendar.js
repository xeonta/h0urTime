function createDate() {
	let	title = $("#title");
	let	datestart = $("#startdate");
	let	datestop = $("#enddate");
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
