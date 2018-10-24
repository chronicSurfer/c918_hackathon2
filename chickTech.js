var globalReply;
var chickTechStorage = {};

$(document).ready(initializeApp);

function initializeApp() {
    addClickHandler();
    hideDataPage(); 
}

function addClickHandler () {
    // $(".picture").on("click",addDataOntoPage);


}

function hideDataPage () {
    $("#event-chosen").addClass("hidePage");
    $("#twitter-and-google-maps").addClass("hidePage");
}

var chickTech = {
    "url": "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=ChickTech-Orange-County&sign=true",
    "method": "GET",
    dataType: "jsonp",
    success: function (reply) {
        console.log(reply);
        globalReply = reply;
        var events=globalReply.results;
        dataStorage(events);
    },
    error: err=>console.log(err)
}

$.ajax(chickTech)

function dataStorage(events) {
    var groupNameArr = [];
    var eventDescriptionsArr = [];
    var eventUrlArr = [];
    var venueNameArr = [];
    var venueAddressArr = [];
    var venueCityArr = [];
    var venueStateArr = [];
    var latitudeArr = [];
    var longitudeArr = [];
    var eventNameArr = [];
    var dateArr = [];

    for (var x = 0; x<events.length; x++) {
        var groupName = globalReply.results[x].group.name;
        groupNameArr.push(groupName);

        var eventDescriptions = globalReply.results[x].description;
        eventDescriptionsArr.push(eventDescriptions);

        var eventUrl = globalReply.results[x].event_url;
        eventUrlArr.push(eventUrl);

        var venueName = globalReply.results[x].venue.name;
        venueNameArr.push(venueName);

        var venueAddress = globalReply.results[x].venue.address_1;
        venueAddressArr.push(venueAddress);

        var venueCity = globalReply.results[x].venue.city;
        venueCityArr.push(venueCity);

        var venueState = globalReply.results[x].venue.state;
        venueStateArr.push(venueState);

        var latitude =globalReply.results[x].venue.lat;
        latitudeArr.push(latitude);

        var longitude = globalReply.results[x].venue.lon;
        longitudeArr.push(longitude);

        var eventName = globalReply.results[x].name;
        eventNameArr.push(eventName);

        //gets date and converts to readable format
        var date = globalReply.results[x].time;
        var newDate = new Date(date);
        var dateToString = newDate.toLocaleString();
        dateArr.push(dateToString);


    }
    chickTechStorage.groupName = groupNameArr;
    chickTechStorage.eventName = eventNameArr;
    chickTechStorage.eventDescriptions = eventDescriptionsArr;
    chickTechStorage.eventUrl = eventUrlArr;
    chickTechStorage.venueName = venueNameArr;
    chickTechStorage.venueAddress = venueAddressArr;
    chickTechStorage.venueCity = venueCityArr;
    chickTechStorage.venueState = venueStateArr;
    chickTechStorage.latitude = latitudeArr;
    chickTechStorage.longitude = longitudeArr;
    chickTechStorage.date = dateArr;
}
console.log(chickTechStorage);

//dynamically creates data for each specific meetup

// function addDataOntoPage () {
//     for(var i = 0; i < storeReply.eventName.length; i++){
//         var attributeIndex = i.toString();
//         if($(event.currentTarget).attr("index") === attributeIndex){
//             console.log("I am alive");
//             $(".event-name").text(storeReply.eventName[i]);
//             $(".date").text("Date: " + storeReply.date[i]);
//             $(".host").text("Hosted by: " + storeReply.groupName[i]);
//             if(storeReply.venueState[i] === undefined){
//                 storeReply.venueState[i] = "CA";
//             }
//             $(".address").text("Address: " + storeReply.venueAddress[i] + ", " + storeReply.venueCity[i] + ", " + storeReply.venueState[i]);
//             var coordinates = {
//                 lat: storeReply.latitude[i],
//                 lng: storeReply.longitude[i]
//             }
    
//             addOneMarkerToMap(coordinates);
//         } 
//     }
// }

// //add functionality of hiding and showing divs


// //adds a marker for each specific meetup location

// function addOneMarkerToMap(coordinates) {
//     var icon = {
//         url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
//         scaledSize: new google.maps.Size(30, 30),
//         origin: new google.maps.Point(0,0),
//         anchor: new google.maps.Point(0,0)
//     }

//     var marker = new google.maps.Marker ({
//         position:coordinates,
//         map:map,
//         icon:icon
//     });

//     //resets the center of the google map to our specific coordinates
//     map.panTo(coordinates);
// }