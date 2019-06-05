let currentDate = new Date();
let currentMonth = 0;
let currentYear = 0;
let months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];


$(document).ready(function(){
    // Activate Carousel
    $("#demo").carousel("pause");

    // Activate prev Button for Carousel
    $(".carousel-control-prev").click(function(){
        $("#demo").carousel("prev");

        if(currentMonth == 0) {
            currentYear-=1;
            console.log(currentYear);
        }
        if(currentMonth > 0) {
            currentMonth-=1;
            console.log(currentMonth);
        }
        else {
            currentMonth = 11;
            console.log(currentMonth);
        }
        getNextDate();
    });

    // Activate next Button for Carousel
    $(".carousel-control-next").click(function(){
        
        $("#demo").carousel("next");

        if(currentMonth == 11) {
            currentYear+=1;
            console.log(currentYear);
        }
        if(currentMonth < 11) {
            currentMonth+=1;
            console.log(currentMonth);
        }
        else {
            currentMonth = 0;
            console.log(currentMonth);
        }
        getNextDate();
    });

    setCurrentDate();

    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();

    

});

function setCurrentDate(){
    document.getElementById('carouselMonth').innerHTML = months[currentDate.getMonth()];
    document.getElementById('carouselYear').innerHTML = currentDate.getFullYear();
};

function getNextDate() {
    document.getElementById('carouselMonth').innerHTML = months[currentMonth];
    document.getElementById('carouselYear').innerHTML = currentYear;
}