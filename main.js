$(document).ready(initializeApp);

var map;
var storeReply = {};
var globalReply;
var chickTechStorage = {};
var global_result;
var girlDevStorage={};
storeReply.chickTech = chickTechStorage;
storeReply.girlDev= girlDevStorage;

function retrieveMeetupData() {
    var girlDevData = new Promise(function(resolve, reject) {
        var girlDev = {
            url: "http://api.meetup.com/2/events?key=6d367432270505e343b4d7c60634879&group_urlname=girl-develop-it-orange-county&sign=true",
            method: "GET",
            dataType:"jsonp",
            success: function(response){
                console.log(response);
                global_result=response;
                var events=global_result.results;
                data_storage(events)
                resolve(true);
            },
            error: err=> {
                console.log(err)
                reject(err);
            }
        }
        
        $.ajax(girlDev)
    });
    
    var chickTechData = new Promise(function(resolve, reject) {
        var chickTech = {
            "url": "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=ChickTech-Orange-County&sign=true",
            "method": "GET",
            dataType: "jsonp",
            success: function (reply) {
                console.log(reply);
                globalReply = reply;
                var events=globalReply.results;
                dataStorage(events);
                resolve(true);
            },
            error: err=> {
                console.log(err) 
                reject(err);
            }
        }
        
        $.ajax(chickTech)
    });

    var retrievedAllData = Promise.all([girlDevData, chickTechData]).then(function(response) {
        console.log("Did it work?");
        $("figure").on("mouseenter",addHoverText);
        $(".picture").on("click",addDataOntoPage);
        $(".picture").on("click",hideLandingPageAndShowDataPage);
        $(".active").on("click",showLandingPageAndHideDataPage);
    }).catch(function(err) {
        console.log("Did it didn't work?");
    });
}

function initializeApp () {
    // addClickHandlerToSubmitButton();
    createPhotoArray();
    hideDataPage(); 
    retrieveMeetupData();

}

function hideDataPage () {
    $("#event-chosen").addClass("hidePage");
    $("#twitter-and-google-maps").addClass("hidePage");
}

function data_storage(events){
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

        for(var i=0;i<events.length; i++){
            //lat
            var latitude = global_result.results[i].venue.lat;
            latitudeArr.push(latitude);

            //lon
            var longitude = global_result.results[i].venue.lon;
            longitudeArr.push(longitude);

            //name
            var eventName = global_result.results[i].name;
            eventNameArr.push(eventName);

            //date toDateString
            var date = global_result.results[i].time;
            var d = new Date(date);
            var newDate=d.toLocaleString();
            dateArr.push(newDate);
            

            //directions including venue name, city, address
            var venueName =global_result.results[i].venue.name;
            venueNameArr.push(venueName);

            var state = global_result.results[i].venue.state;
            venueStateArr.push(state);
            
            var city =global_result.results[i].venue.city;
            venueCityArr.push(city);

            var address = global_result.results[i].venue.address_1;
            venueAddressArr.push(address);
        
            //group name
            var groupName = global_result.results[i].group.name;
            groupNameArr.push(groupName);

            //event_url
            var url=  global_result.results[i].event_url;
            eventUrlArr.push(url);

            //description
            var description=global_result.results[i].description;
            eventDescriptionsArr.push(description);

            
        }
        girlDevStorage.groupName = groupNameArr;
        girlDevStorage.eventName = eventNameArr;
        girlDevStorage.eventDescriptions = eventDescriptionsArr;
        girlDevStorage.eventUrl = eventUrlArr;
        girlDevStorage.venueName = venueNameArr;
        girlDevStorage.venueAddress = venueAddressArr;
        girlDevStorage.venueCity = venueCityArr;
        girlDevStorage.venueState = venueStateArr;
        girlDevStorage.latitude = latitudeArr;
        girlDevStorage.longitude = longitudeArr;
        girlDevStorage.date = dateArr;
}

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

function initMap () {
    var options = {
        zoom: 15,
        // center: {lat:33.6846, lng:-117.8265}, //irvine coords
    }

    map = new google.maps.Map(document.getElementById('map'),options);

    //adding marker to the map
    // var marker = new google.maps.Marker ({
    //     position:{lat:33.6846, lng:-117.8265},
    //     map:map,
    // });

    //adding a custom icon
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    };

    // //the Shrine coords
    // addMarker({lat:34.0522, lng:-118.2437});
    // //hollywood bowl coords
    // addMarker({lat:34.1122, lng:-118.3391});


    //adding multiple markers to the map
    function addMarker (coordinates) {
        var marker = new google.maps.Marker ({
        position:coordinates,
        map:map,
        icon:icon
        });
    }
}


function hideLandingPageAndShowDataPage () {
    // $("header").addClass("hidePage");
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").removeClass("hidePage");
    $("#twitter-and-google-maps").removeClass("hidePage");
}

//add functionality of showing landing page and showing divs

function showLandingPageAndHideDataPage () {
    $("#events-to-choose").removeClass("hidePage");
    $("#event-chosen").addClass("hidePage");
    $("#twitter-and-google-maps").addClass("hidePage");
}

function createPhotoArray(){
    var linkArray = [];
    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method:'flickr.people.getPublicPhotos',
            user_id: '136629440@N06',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            console.log('got data from flickr', response);

            for(var i = 66; i < 74; i++){
                var photoFarm = response.photos.photo[i].farm;
                var photoServer = response.photos.photo[i].server;
                var photoID = response.photos.photo[i].id;
                var photoSecret = response.photos.photo[i].secret;
                var link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                linkArray.push(link);
            }
            pickRandomImages(linkArray);
        },
      });
}

function pickRandomImages(array){
    var randomImages = [];
    for(var i = 0; i < 8; i++){
        var image = array[Math.floor(Math.random() * array.length)];
        var imagePosition = array.indexOf(image);
        array.splice(imagePosition, 1);
        randomImages.push(image);
    }
    placeRandomImages(randomImages);
    console.log(randomImages);
}

function placeRandomImages(array){
    var figureArray = [];
        for(var i = 0; i < array.length; i++) {
            //create an img with the src from the array and append it to the appropriate figure in the figureArray
            //append that figureArray to #events-to-choose
            var newFigure = $('<figure>');
            var newImage = $('<img>').addClass('picture').attr({
                src: array[i],
                index: i
            });
            newFigure.append(newImage);
            figureArray.push(newFigure);
            var hoverP = $('<p>').addClass('hoverText');
            newFigure.append(hoverP);
        }
        $('#events-to-choose').append(figureArray);
}


// function addClickHandlerToSubmitButton(){
//     $('#submit').click(search)
// }

function search(){
    $.ajax({
        url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php?search_term=womenintech',
        dataType:'json',
        success: function(data){
            console.log(data);
            for(item in data.tweets.statuses) {
                $('#tweets').append( $('<li>', {
                    text: data.tweets.statuses[item].text
                }) );
            }
        }
    });
}

function addDataOntoPage () {
    for(let i = 0; i < (storeReply.chickTech.eventName.length + storeReply.girlDev.eventName.length); i++){
        var attributeIndex = i.toString();
        if($(event.currentTarget).attr("index") === attributeIndex){
            console.log("I am alive");
            if(i > storeReply.chickTech.eventName.length-1){
                $(".event-name").text(storeReply.girlDev.eventName[i]);
                
                //stuff inside the replace method is a regex call
                //it grabs everything that starts with "<" and something inside and ends with a ">"
                //and get every instance of that
                //then it replaces them all with an empty string
                // storeReply.chickTech.eventDescriptions[0].replace(/<[^<>]*>/g, '');
                
                var totalEventDescriptions = "";
                for(var index = 0; index < 1; index++){
                    totalEventDescriptions = storeReply.girlDev.eventDescriptions[i].replace(/<[^<>]*>/g, '');
                }
                $(".event-description").text(totalEventDescriptions);
                $(".event-description").text(totalEventDescriptions);
                $(".date").text("Date: " + storeReply.girlDev.date[i]);
                $(".host").text("Hosted by: " + storeReply.girlDev.groupName[i]);
                if(storeReply.girlDev.venueState[i] === undefined){
                    storeReply.girlDev.venueState[i] = "CA";
                }
                $(".address").text("Address: " + storeReply.girlDev.venueAddress[i] + ", " + storeReply.girlDev.venueCity[i] + ", " + storeReply.girlDev.venueState[i]);
                var coordinates = {
                    lat: storeReply.girlDev.latitude[i],
                    lng: storeReply.girlDev.longitude[i]
                }
        
                addOneMarkerToMap(coordinates);
            }
            else{
                $(".event-name").text(storeReply.chickTech.eventName[i]);
                var totalEventDescriptions = "";
                for(var index = 0; index < 1; index++){
                    totalEventDescriptions = storeReply.chickTech.eventDescriptions[i].replace(/<[^<>]*>/g, '');
                }
                $(".event-description").text(totalEventDescriptions);
                $(".date").text("Date: " + storeReply.chickTech.date[i]);
                $(".host").text("Hosted by: " + storeReply.chickTech.groupName[i]);
                if(storeReply.chickTech.venueState[i] === undefined){
                    storeReply.chickTech.venueState[i] = "CA";
                }
                $(".address").text("Address: " + storeReply.chickTech.venueAddress[i] + ", " + storeReply.chickTech.venueCity[i] + ", " + storeReply.chickTech.venueState[i]);
                var coordinates = {
                    lat: storeReply.chickTech.latitude[i],
                    lng: storeReply.chickTech.longitude[i]
                }
        
                addOneMarkerToMap(coordinates);
            }
        } 
    }
}

function addHoverText (event) {
    for(let i = 0; i < (storeReply.chickTech.eventName.length + storeReply.girlDev.eventName.length); i++){
        var attributeIndex = i.toString();

        if($(event.currentTarget).find(".picture").attr("index") === attributeIndex){
            if(i > storeReply.chickTech.eventName.length-1){
                $(".hoverText").text(storeReply.girlDev.eventName[i] + storeReply.girlDev.date[i]);
            }
            else{
                $(".hoverText").text(storeReply.chickTech.eventName[i] + storeReply.chickTech.date[i]);
            }
        }
    }

    // var index = $(event.currentTarget).find(".picture").attr("index");
    // $(".hoverText").text(storeReply.girlDev.eventName[index]);
}

//adds a marker for each specific meetup location

function addOneMarkerToMap(coordinates) {
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }

    var marker = new google.maps.Marker ({
        position:coordinates,
        map:map,
        icon:icon
    });

    //resets the center of the google map to our specific coordinates
    map.panTo(coordinates);
}