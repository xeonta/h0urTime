var currentDate = new Date();
var currentMonth = 0;
var currentYear = 0;
var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var editEventId;
var editCategoryId;

$(document).ready(function() {
    createCalendar();
    connectEditButtons();
});

function connectEditButtons() {
    $("#editEventButton").click(valEditInput);
    $("#deleteEventButton").click(deleteEvent);
}

function createCalendar(){

    // Activate Carousel
    $("#demo").carousel("pause");

    // Activate prev Button for Carousel
    $(".carousel-control-prev").click(function(){
        $("#demo").carousel("prev");

        if(currentMonth == 0) {
            currentYear-=1;
        }
        if(currentMonth > 0) {
            currentMonth-=1;
        }
        else {
            currentMonth = 11;
        }
        setDaysByMonth();
        getNextDate();
    });

    // Activate next Button for Carousel
    $(".carousel-control-next").click(function(){
        
        $("#demo").carousel("next");

        if(currentMonth == 11) {
            currentYear+=1;
        }
        if(currentMonth < 11) {
            currentMonth+=1;
        }
        else {
            currentMonth = 0;
        }
        setDaysByMonth();
        getNextDate();
    });

    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();

    setCurrentDate();
    setDaysByMonth();
};  

function setCurrentDate(){
    document.getElementById('carouselMonth').innerHTML = months[currentDate.getMonth()];
    document.getElementById('carouselYear').innerHTML = currentDate.getFullYear();
};

function getCurrentDate(eventDate) {
    console.log(eventDate);
    document.getElementById("date").value=eventDate;
}

function getNextDate() {
    document.getElementById('carouselMonth').innerHTML = months[currentMonth];
    document.getElementById('carouselYear').innerHTML = currentYear;
}

function loadEvents() { 
	$.ajax({
		url: "rest/eventservice/loadAll",
		method: "GET",
		datatype: "json",
		contentType: "application/json",
	})
	.done(function(response) { 
		showEventsInCalendar(response);
	})
	.fail(function(jqXHR, statusText, error) { 
		var errorMsg = "Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText;
		console.log(errorMsg);
	});
}

function showEventsInCalendar(fetchedJSON) {
    fetchedJSON.forEach((events) => {
    	//only show events of category x if checkbox in category is checked
    	if(!selectedCategories.includes(String(events.categoryid))) {
	        $("#"+events.date)
	        .append('<div id="' + events.eventid + '"><button style="float:left; line-height:20px" type="button" class="btn btn-light" data-toggle="modal" data-target="#myModal2" onclick="getEventInfos(\'' + events.eventid + '\', \'' + events.date + '\', \'' + escapeUserInput(events.title)+ '\', \'' + escapeUserInput(events.description)+ '\', \'' + events.categoryid + '\')">' + events.title + '</button></br></div>');
	}
    });
}

function getEventInfos(eventid, date, title, description, categoryid) {

    editEventId = eventid;
    editCategoryId = categoryid;
    document.getElementById("editTitle").value=title;
    document.getElementById("editDate").value=date;
    document.getElementById("editDescription").value=description;
    loadCategories(categoryid);
}

function getCurrentCategory(fetchedJSON, categoryid) {

    var currentCategory;

    fetchedJSON.forEach((events) => {
        if(events.categoryid == categoryid) {
            currentCategory = events.name;
        }
    });

    document.getElementById("editCategory").innerHTML='<option id="'+ categoryid + '">' + currentCategory + '</option>';

    $("#editCategory").one("click",function(event) {
        loadCategories();
        $(this).off(event);
    });
}

function valEditInput() {
    let title = $("#editTitle").val();
    let description = $("#editDescription").val();

    if (title == "" || description == "") {
	alert("Error. Fields must be filled out.")
	return false;
    } else {
	editEvent();
    }
}

function editEvent() { 

    let eventDate = $("#editDate").val();
    let eventTitle = escapeUserInput($("#editTitle").val());
    let eventDescription = escapeUserInput($("#editDescription").val());
    let eventCategoryId = $("#categoryid");

    let postData = {
	eventid: editEventId,
	date: eventDate,
	title: eventTitle,
	description: eventDescription,
	categoryid: editCategoryId,
    };
    
    let editDataJsonString = JSON.stringify(postData);
    
    $.ajax({
	url: "rest/eventservice/update",
	method: "POST",
	data: editDataJsonString,
	datatype: "json",
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

function deleteEvent() { 

    let deleteEventId = editEventId;
    console.log(deleteEvent);
	let postData = {
	    eventid: editEventId,
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
	    loadContent("calendar.html");
	})
	.fail(function() { 
	    console.log("Delete error.");
	});
}

function setDaysByMonth() {

    let invalidDays = 35 -days[currentMonth];

    $("div.calendar div.row").html("");

    var dayDate;

    for (var i = 1; i <= days[currentMonth]; i++) {

        if(currentMonth < 9) {
            if(i < 10) {
                dayDate = `\'${currentYear}-0${currentMonth+1}-0${i}\'`
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=${dayDate} class=\"col-xs-12 calendar-day\">0${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\" onclick=\"getCurrentDate(${dayDate})\"></i></button></div>`);
            }
            else {
                dayDate = `\'${currentYear}-0${currentMonth+1}-${i}\'`
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=${dayDate} class=\"col-xs-12 calendar-day\">${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\" onclick=\"getCurrentDate(${dayDate})\"></i></button></div>`);
            }   
        }
        else {
            if(i < 10) {
                dayDate = `\'${currentYear}-${currentMonth+1}-0${i}\'`
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=${dayDate} class=\"col-xs-12 calendar-day\">0${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\" onclick=\"getCurrentDate(${dayDate})\"></i></button></div>`);
            }
            else {
                dayDate = `\'${currentYear}-${currentMonth+1}-${i}\'`
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=${dayDate} class=\"col-xs-12 calendar-day\">${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\" onclick=\"getCurrentDate(${dayDate})\"></i></button></div>`);
            }  
        }
           
    }

    for (var i = 1; i <= invalidDays; i++) {
        $("div.calendar div.row").append(`<div class=\"col-xs-12 calendar-day calendar-no-current-month\"></div>`);
    }

    loadEvents();
}
