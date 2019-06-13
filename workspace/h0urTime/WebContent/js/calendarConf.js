var currentDate = new Date();
var currentMonth = 0;
var currentYear = 0;
var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
var days = [31,28,31,30,31,30,31,31,30,31,30,31];

$(document).ready(createCalendar());

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
            setDaysByMonth();
        }
        else {
            currentMonth = 11;
        }
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
            setDaysByMonth();
        }
        else {
            currentMonth = 0;
        }
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

function setDaysByMonth() {
    
    console.log(days[currentMonth], currentMonth);

    let invalidDays = 35 -days[currentMonth];

    $("div.calendar div.row").html("");

  
    for (var i = 1; i <= days[currentMonth]; i++) {
        $("div.calendar div.row").append(`<div class=\"col-xs-12 calendar-day\">${i}<button type=\"button\" class=\"btn shadow-none\" data-toggle=\"modal\" data-target=\"#myModal\"><i class=\"fas fa-plus\"></i></button></div>`);
    }

    for (var i = 1; i <= invalidDays; i++) {
        $("div.calendar div.row").append(`<div class=\"col-xs-12 calendar-day calendar-no-current-month\"></div>`);
    }
}