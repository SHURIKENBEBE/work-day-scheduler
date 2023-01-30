//Day Time Clock
setInterval(function(){
    var todayClock = moment();
    $("#currentDay").text(todayClock.format('dddd, MMMM Do YYYY, h:mm:ss a'));
},1000); // updates clock every 1 second


//setting variables
var saveButton = document.getElementById("save");



// saved event local storge 
function addEvent() {
    // saving related input data as an object
    var newEvent = {
        event: [...document.querySelectorAll("textarea")].map(textarea => textarea.value),
        hour: [...document.querySelectorAll(".time")].map(time => time.innerHTML)
    };

    // use .setItem() to store object in storage and JSON.stringily to convert it as a string
    localStorage.setItem("newEvent", JSON.stringify(newEvent));
}

function showEvent(){
    // use json.parse() to convert text to javascript object 
    var savedEvent = JSON.parse(localStorage.getItem("newEvent"));

    // check if data is returned; if not exit out 
    if (savedEvent != null){
        document.querySelectorAll("textarea").forEach((textarea, i) => textarea.value = savedEvent.event[i]);

        document.querySelectorAll(".time").forEach((time, i) => time.value = savedEvent.hour[i]);

    } else{
        return;
    }
};

// saving input data
saveButton.addEventListener("click", function(event){
    event.preventDefault();
    var eventData = [...document.querySelectorAll("textarea")].map(textarea => textarea.value);
    console.log("text area: ", textarea);

    localStorage.setItem("newEvent", JSON.stringify(eventData));

    addEvent();
    showEvent();
});


//retrieve and display saved data from local storage & display on page

window.onload = function(){
    var savedEvent = JSON.parse(localStorage.getItem('newEvent'));

    if (savedEvent != null){
        document.querySelectorAll("textarea").forEach((textarea, i)=> textarea.value = savedEvent.event[i]);
    }
};


// colorcode time block by past present & future

// get current time 
var currentTime = moment().hours();
console.log("current time: ", currentTime);
// select all timeblocks 
var timeBlocks = document.querySelectorAll(".time");
console.log("timeblocks: ", timeBlocks);
// loop through each time block 
timeBlocks.forEach(function(block, index){
    // getting the hours of the time block
    var blockHour = parseInt(block.innerHTML.split(":")[0]);
    console.log("block hour: ", blockHour);

    const rows = document.getElementsByClassName('row');
    console.log("rows: ", rows);

    if (blockHour < currentTime){
        rows[index].classList.add("past");
    } else if (blockHour === currentTime){
        rows[index].classList.add("present");
    } else {
        rows[index].classList.add("future");
    }

    console.log("Class List: ", rows[index].classList);


    
});
    // color code time block 


