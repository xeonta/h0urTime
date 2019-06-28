var currentDate = new Date();
var currentMonth = 0;
var currentYear = 0;
var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
var days = [31,28,31,30,31,30,31,31,30,31,30,31];

$(document).ready(function() {
    createCalendar();
});

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

function getNextDate() {
    document.getElementById('carouselMonth').innerHTML = months[currentMonth];
    document.getElementById('carouselYear').innerHTML = currentYear;
}

function loadEvents() { 
    console.log("loadEvents");
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
        $("#"+events.date)
        .append(
                `<div id=\"${events.eventid}\">  
                    <button style=\"float:left; line-height:20px\" type=\"button\" class=\"btn btn-light\" data-toggle=\"modal\" data-target=\"#myModal2\" onclick=\"getEventInfos(\'${events.eventid}\',\'${events.date}\',\'${events.title}\',\'${events.description}\',\'${events.categoryid}\')\">
                        ${events.title}
                    </button></br>
                </div>`);
    });
}

function getEventInfos(eventid,date,title,description,categoryid) {

    console.log(eventid,date,title,description,categoryid);
}

function setDaysByMonth() {
    
    console.log(days[currentMonth], currentMonth);

    let invalidDays = 35 -days[currentMonth];

    $("div.calendar div.row").html("");

  
    for (var i = 1; i <= days[currentMonth]; i++) {
        if(currentMonth < 9) {
            if(i < 10) {
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=\"${currentYear}-0${currentMonth+1}-0${i}\" class=\"col-xs-12 calendar-day\">0${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\"></i></button></div>`);
                //console.log(currentYear+"-"+0+currentMonth+"-"+0+i);
            }
            else {
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=\"${currentYear}-0${currentMonth+1}-${i}\" class=\"col-xs-12 calendar-day\">${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\"></i></button></div>`);
                //console.log(currentYear+"-"+0+currentMonth+"-"+i);
            }   
        }
        else {
            if(i < 10) {
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=\"${currentYear}-${currentMonth+1}-0${i}\" class=\"col-xs-12 calendar-day\">0${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\"></i></button></div>`);
                //console.log(currentYear+"-"+currentMonth+"-"+0+i);
            }
            else {
                $("div.calendar div.row").append(`<div style=\"overflow: auto\" id=\"${currentYear}-${currentMonth+1}-${i}\" class=\"col-xs-12 calendar-day\">${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\"></i></button></div>`);
                //console.log(currentYear+"-"+currentMonth+"-"+i);
            }  
        }
           
    }

    for (var i = 1; i <= invalidDays; i++) {
        $("div.calendar div.row").append(`<div class=\"col-xs-12 calendar-day calendar-no-current-month\"></div>`);
    }

    console.log("Calendar generated");

    loadEvents();
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
    let categoryOptions = $("#category-options2");
    categoryOptions.empty();

    fetchedJSON.forEach((category) => {
	let option = $(`<option id="${categoryid}">${category.name}</option>`);
	categoryOptions.append(option);
    });
}
