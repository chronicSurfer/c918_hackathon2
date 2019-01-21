$(document).ready(initializeApp);

var map;
var storeReply = {};
var global_result;
var meetupStorage = {};

function initializeApp () {
    $.ajax(meetup);
    addClickHandlerToSubmitButton();
    addClickHandlerToCloseButton();
    createPhotoArray();
    addClickHandlers();
    hideDataPage(); 
    chickTechGallery();
    girlDevelopItGallery();
    girlsInTechGallery();
    
}

var meetup = {
    "url": "meetup.php",
    "method": "GET",
    dataType: "json",
    data: {
        format: 'json',
        zip: '92833',
        text: 'women AND tech',
        time: ',2w',
        and_text: 'true',
        text_format: 'plain',
        radius: '35',
        sign: true,
        key: '554071754212291c41435871a39671'
    },
    success: function (result) {
        console.log("success:",result);
        global_result = result;
        var events=global_result.results;
        dataStorage(events);
        getEventsList(meetupStorage);
        addDataOntoPage();
        getThreeList(meetupStorage);
    },
    error: err=>console.log("error:",err)
}


// $.ajax(meetup);

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
    var photoUrl = [];

    for (var x = 0; x<events.length; x++) {
        var groupName = global_result.results[x].group.name;
        groupNameArr.push(groupName);

        var groupPhoto1 = global_result.results[x].photo_url;
        if(groupPhoto1 === undefined){
            var oldSrc = 'images/default_pic.jpg';

            groupPhoto1 = oldSrc;
            photoUrl.push(groupPhoto1);
        }
        if(groupPhoto1.indexOf("highres_") === -1){
            var groupPhoto = groupPhoto1.replace("global_", "highres_");
            photoUrl.push(groupPhoto);
        } else{
            photoUrl.push(groupPhoto1);
        }

        var eventDescriptions = global_result.results[x].description;
        eventDescriptionsArr.push(eventDescriptions);

        var eventUrl = global_result.results[x].event_url;
        eventUrlArr.push(eventUrl);

        // var venueName = global_result.results[x].venue.name;
        // venueNameArr.push(venueName);

        // var venueAddress = global_result.results[x].venue.address_1;
        // venueAddressArr.push(venueAddress);

        // var venueCity = global_result.results[x].venue.city;
        // venueCityArr.push(venueCity);

        // var venueState = global_result.results[x].venue.state;
        // venueStateArr.push(venueState);

        // var latitude =global_result.results[x].venue.lat;
        // latitudeArr.push(latitude);

        // var longitude = global_result.results[x].venue.lon;
        // longitudeArr.push(longitude);

        var eventName = global_result.results[x].name;
        eventNameArr.push(eventName);

        //gets date and converts to readable format
        var date = global_result.results[x].time;
        var newDate = new Date(date);
        var dateToString = newDate.toLocaleString();
        dateArr.push(dateToString);

    }
    meetupStorage.groupName = groupNameArr;
    meetupStorage.groupPhoto = photoUrl;
    meetupStorage.eventName = eventNameArr;
    meetupStorage.eventDescriptions = eventDescriptionsArr;
    meetupStorage.eventUrl = eventUrlArr;
    meetupStorage.venueName = venueNameArr;
    meetupStorage.venueAddress = venueAddressArr;
    meetupStorage.venueCity = venueCityArr;
    meetupStorage.venueState = venueStateArr;
    meetupStorage.latitude = latitudeArr;
    meetupStorage.longitude = longitudeArr;
    meetupStorage.date = dateArr;
}
console.log(meetupStorage);


function addClickHandlers(){
    $(".events-page").on("click",showEventsPage);
    $(".gallery-page").on("click",showGallery);
}

function showEventsPage (){
    $(".figure").removeClass("hidePage");
    $(".landing-page").addClass("hidePage");
    $("#events-to-choose").removeClass("hidePage");
    $('#gallery').addClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
}

function initMap () {
    var options = {
        zoom: 15,
    }

    map = new google.maps.Map(document.getElementById('map'),options);

    //adding a custom icon
    // var icon = {
    //     url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
    //     scaledSize: new google.maps.Size(50, 50),
    //     origin: new google.maps.Point(0,0),
    //     anchor: new google.maps.Point(0,0)
    // };

    // //adding multiple markers to the map
    // function addMarker (coordinates) {
    //     var marker = new google.maps.Marker ({
    //     position:coordinates,
    //     map:map,
    //     icon:icon
    //     });
    // }
}


function hideEventsPageAndShowDataPage () {
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").removeClass("hidePage").addClass("event_chosen");
    $("#twitter-and-google-maps").removeClass("hidePage").addClass("twitter_and_google_maps");
}

//add functionality of showing landing page and showing divs

function showLandingPageAndHideDataPage () {
    $("#events-to-choose").removeClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
}

function showGallery(){
    $(".landing-page").addClass("hidePage");
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
    $("#gallery").removeClass("hidePage");
}

// //images for landing page will change to meetup
function createPhotoArray(){
    // var linkArray = [];
    // $.ajax({
    //     url: 'https://api.flickr.com/services/rest/',
    //     method: 'get',
    //     dataType: 'json',
    //     data: {
    //         api_key: 'e00e98b08d999c1fbe15689b175ad887',
    //         method:'flickr.people.getPublicPhotos',
    //         user_id: '136629440@N06',
    //         format: 'json',
    //         nojsoncallback: 1
    //     },
    //     success: function(response){
    //         console.log('got data from flickr', response);

    //         for(var i = 66; i < 74; i++){
    //             var photoFarm = response.photos.photo[i].farm;
    //             var photoServer = response.photos.photo[i].server;
    //             var photoID = response.photos.photo[i].id;
    //             var photoSecret = response.photos.photo[i].secret;
    //             var link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
    //             linkArray.push(link);
    //         }
    //         // pickRandomImages(linkArray);
            
    //     },
        
    //   });
    // var b = "wit.jpg";
    // var placeholderImages = [b,b,b,b,b,b,b,b,b,b,b,b];
    // placeRandomImages(placeholderImages);
}


// function pickRandomImages(array){
//     var randomImages = [];
//     for(var i = 0; i < 8; i++){
//         var image = array[Math.floor(Math.random() * array.length)];
//         var imagePosition = array.indexOf(image);
//         array.splice(imagePosition, 1);
//         randomImages.push(image);
//     }

//     placeRandomImages(randomImages);
//     console.log(randomImages);
// }


function addClickHandlerToSubmitButton(){
    $('#submit').click(search)
    $("#close").hide();
}

function search () {
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
    $("#submit").hide();
    $("#close").show();
}

function addClickHandlerToCloseButton () {
    $("#close").click(closeTwitter)
}

function closeTwitter () {
    $("#tweets").hide()
    $("#close").hide();
}

function hideDataPage () {
    $("#event-chosen").addClass("hidePage");
    $("#twitter-and-google-maps").addClass("hidePage");
    $("#gallery").addClass("hidePage");
}

function getEventsList(meetupStorage){
    var figureArray = [];
        for(let i = 0; i <12; i++) {
            //create an img with the src from the array and append it to the appropriate figure in the figureArray
            //append that figureArray to #events-to-choose
            var newFigure = $('<figure>').addClass('figure').attr('index',i);
            var newImage = $('<img>').addClass('picture').attr(
                'src', meetupStorage.groupPhoto[i]
            );
            newFigure.append(newImage);
            figureArray.push(newFigure);
            var nameOfEvent=$('<div>').text(meetupStorage.eventName[i]).addClass("figure-text");
            var location = $('<p>').text(meetupStorage.venueName[i]).addClass("figure-text");
            var date = $('<p>').text(meetupStorage.date[i]).addClass("figure-text");
            newFigure.append(nameOfEvent);
            newFigure.append(location);
            newFigure.append(date);
            newFigure.addClass("hidePage");
        }
        $('#events-to-choose').append(figureArray);
        // $("figure").on("mouseenter",addHoverText);
        $(".figure").on("click",addDataOntoPage);
        $(".figure").on("click",hideEventsPageAndShowDataPage);
        $(".active").on("click",showLandingPageAndHideDataPage);

}

function getThreeList(meetupStorage){
    var figureArray = [];
        for(let i = 0; i <3; i++) {
            var newFigure = $('<figure>').addClass("new-events").attr('index',i);
            var newImage = $('<img>').addClass('picture').attr(
                'src', meetupStorage.groupPhoto[i]
            );
            newFigure.append(newImage);
            figureArray.push(newFigure);
            var nameOfEvent=$('<div>').text(meetupStorage.eventName[i]).addClass("figure-text");
            var location = $('<p>').text(meetupStorage.venueName[i]).addClass("figure-text");
            var date = $('<p>').text(meetupStorage.date[i]).addClass("figure-text");
            newFigure.append(nameOfEvent);
            newFigure.append(location);
            newFigure.append(date);
            // newFigure.addClass("hidePage");
        }
        $('.newest-section').append(figureArray);
        // $("figure").on("mouseenter",addHoverText);
        $(".figure").on("click",addDataOntoPage);
        $(".figure").on("click",hideEventsPageAndShowDataPage);
        $(".active").on("click",showLandingPageAndHideDataPage);

        console.log(figureArray);

}

function addDataOntoPage () {
    for(let i = 0; i < meetupStorage.eventName.length; i++){
        var attributeIndex = i.toString();
        if($(event.currentTarget).attr("index") === attributeIndex){
            var address = `${meetupStorage.venueAddress[i]}, ${meetupStorage.venueCity[i]}, ${meetupStorage.venueState[i]}`;
            var eventName = meetupStorage.eventName[i];
    
            $(".date").text("Date: " + meetupStorage.date[i]);
            $(".event-name").text(meetupStorage.eventName[i]);
            $(".event-description").text(meetupStorage.eventDescriptions[i]).css("margin", "1rem 0px");
            $(".address").text(`Address: ${address}`);
            $(".host").text("Hosted by: " + meetupStorage.groupName[i]);
            // var oldSrc = 'https://www.televerde.com/wp-content/uploads/2018/08/group-people-meeting-talking.1200x500.jpg';
            // $('img[src="' + oldSrc + '"]').attr('src', meetupStorage.groupPhoto[i]);
            $('.event-img').attr('src', meetupStorage.groupPhoto[i]);
    
            var coordinates = {
                lat: meetupStorage.latitude[i],
                lng: meetupStorage.longitude[i]
            }
    
            $(".eventURL").attr({
                href: meetupStorage.eventUrl[i],
                target: "_blank"
            }).css("color", "white");

            $(".back_button").on("click",showEventsPage).css("color", "white");
                
            addOneMarkerToMap(coordinates, eventName, address);
        }

        // var attributeIndex = i.toString();
        // if($(event.currentTarget).attr("index") === attributeIndex){
        //     console.log("I am alive");



        //     if(i > storeReply.chickTech.eventName.length-1){
        //         $(".event-name").text(storeReply.girlDev.eventName[i]);
                
                //stuff inside the replace method is a regex call
                //it grabs everything that starts with "<" and something inside and ends with a ">"
                //and get every instance of that
                //then it replaces them all with an empty string
                // storeReply.chickTech.eventDescriptions[0].replace(/<[^<>]*>/g, '');
                
        //         var totalEventDescriptions = "";
        //         for(var index = 0; index < 1; index++){
        //             totalEventDescriptions = storeReply.girlDev.eventDescriptions[i].replace(/<[^<>]*>/g, '');
        //         }
        //         $(".event-description").text(totalEventDescriptions);
        //         $(".date").text("Date: " + storeReply.girlDev.date[i]);
        //         $(".host").text("Hosted by: " + storeReply.girlDev.groupName[i]);
        //         var oldSrc = 'https://www.televerde.com/wp-content/uploads/2018/08/group-people-meeting-talking.1200x500.jpg';
        //         $('img[src="' + oldSrc + '"]').attr('src', storeReply.girlDev.groupPhoto[i]);
        //         if(storeReply.girlDev.venueState[i] === undefined){
        //             storeReply.girlDev.venueState[i] = "CA";
        //         }
        //         $(".address").text("Address: " + storeReply.girlDev.venueAddress[i] + ", " + storeReply.girlDev.venueCity[i] + ", " + storeReply.girlDev.venueState[i]);
        //         var coordinates = {
        //             lat: storeReply.girlDev.latitude[i],
        //             lng: storeReply.girlDev.longitude[i]
        //         }
        //         $(".eventURL").attr("href", storeReply.girlDev.eventUrl[i]).css("color", "white");

        
        //         addOneMarkerToMap(coordinates);
        //     }
        // } 
    }
}

function chickTechGallery(){
    var chickTechArray = [];
    var position = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method: 'flickr.photosets.getPhotos',
            photoset_id: '72157673615663237',
            user_id: '92769341@N03',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            console.log('got data from ChickTech gallery:', response);
            var photo = response.photoset.photo;
            
            for(var i = 0; i < position.length; i++){
                var link = '';
                var photoFarm = photo[i].farm;
                var photoServer = photo[i].server;
                var photoID = photo[i].id;
                var photoSecret = photo[i].secret;
                // link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';
                
                chickTechArray.push(link);
            }

            console.log('chickTechArray:', chickTechArray);
            placeImages(chickTechArray, '.gallery-chicktech');
        }
    })
}

function girlDevelopItGallery(){
    var girlDevelopItArray = [];
    var position = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method: 'flickr.photosets.getPhotos',
            photoset_id: '72157639104508314',
            user_id: '10512012@N08',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            console.log('got data from Girl Develop IT gallery:', response);
            var photo = response.photoset.photo;
            
            for(var i = 1; i < position.length; i++){
                var link = '';
                var photoFarm = photo[i].farm;
                var photoServer = photo[i].server;
                var photoID = photo[i].id;
                var photoSecret = photo[i].secret;
                // link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';
                
                girlDevelopItArray.push(link);
            }

            console.log('girlDevelopItArray:', girlDevelopItArray);
            placeImages(girlDevelopItArray, '.gallery-girldevelopit');
        }
    })
}

function girlsInTechGallery(){
    var girlsInTechArray = [];
    var position = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method: 'flickr.people.getPublicPhotos',
            user_id: '29179749@N03',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            console.log('got data from Girls in Tech gallery:', response);
            var photo = response.photos.photo;
            
            for(var i = 0; i < 10; i++){
                var link = '';
                var photoFarm = photo[i].farm;
                var photoServer = photo[i].server;
                var photoID = photo[i].id;
                var photoSecret = photo[i].secret;
                // link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';
                
                girlsInTechArray.push(link);
            }

            console.log('girlsInTechArray:', girlsInTechArray);
            placeImages(girlsInTechArray, '.gallery-girlsintech');
        }
    })

    // var linkArray = [];
    // $.ajax({
    //     url: 'https://api.flickr.com/services/rest/',
    //     method: 'get',
    //     dataType: 'json',
    //     data: {
    //         api_key: 'e00e98b08d999c1fbe15689b175ad887',
    //         method:'flickr.people.getPublicPhotos',
    //         user_id: '136629440@N06',
    //         format: 'json',
    //         nojsoncallback: 1
    //     },
    //     success: function(response){
    //         console.log('got data from flickr', response);

    //         for(var i = 66; i < 74; i++){
    //             var photoFarm = response.photos.photo[i].farm;
    //             var photoServer = response.photos.photo[i].server;
    //             var photoID = response.photos.photo[i].id;
    //             var photoSecret = response.photos.photo[i].secret;
    //             var link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
    //             linkArray.push(link);
    //         }
    //         // pickRandomImages(linkArray);
            
    //     },
        
    //   });
    // var b = "wit.jpg";
    // var placeholderImages = [b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b];
    // placeRandomImages(placeholderImages);
}




function placeImages(array, section){
    var figureArray = [];
        for(var i = 0; i < array.length; i++) {
            //create an img with the src from the array and append it to the appropriate figure in the figureArray
            //append that figureArray to #events-to-choose
            var imgFigure = $('<figure>');
            var image = $('<img>').addClass('gallery-image').attr({
                src: array[i],
                index: i
            });
            imgFigure.append(image);
            figureArray.push(imgFigure);
            // var hoverP = $('<p>').addClass('hoverText firstp');
            // var hoverP2 = $('<p>').addClass('hoverText2 secondp');
            // newFigure.append(hoverP);
            // newFigure.append(hoverP2);
            // newFigure.addClass("hidePage");
            // $('figure').addClass("hidePage");

        }
        $(section).append(figureArray);

        // $("figure").on("mouseenter",addHoverText);
        // $(".picture").on("click",addDataOntoPage);
    // $(".picture").on("click",hideEventsPageAndShowDataPage);
    // $(".active").on("click",showLandingPageAndHideDataPage);

}















// function addHoverText (event) {
    // for(let i = 0; i < (storeReply.chickTech.eventName.length + storeReply.girlDev.eventName.length); i++){
    //     var attributeIndex = i.toString();

    //     if($(event.currentTarget).find(".picture").attr("index") === attributeIndex){
    //         if(i > storeReply.chickTech.eventName.length-1){
    //             $(".firstp").text(storeReply.girlDev.eventName[i]);
    //             $(".secondp").text(storeReply.girlDev.date[i]);
    //         }
    //         else{
    //             $(".firstp").text(storeReply.chickTech.eventName[i]);
    //             $(".secondp").text(storeReply.chickTech.date[i]);
    //         }
    //     }
    // }

// }

//adds a marker for each specific meetup location

// function addOneMarkerToMap(coordinates,oldSrc) {
//     var icon = {
//         url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
//         scaledSize: new google.maps.Size(50, 50),
//         origin: new google.maps.Point(0,0),
//         anchor: new google.maps.Point(0,0)
//     }
// }
// //                 addOneMarkerToMap(coordinates);
// //             }
// //         } 
// //     }

// //chickTech
// // function addHoverText (event) {
// //     for(let i = 0; i < (storeReply.chickTech.eventName.length); i++){
// //         var attributeIndex = i.toString();

// //         if($(event.currentTarget).find(".picture").attr("index") === attributeIndex){
// //                 $(".firstp").text(storeReply.chickTech.eventName[i]);
// //                 $(".secondp").text(storeReply.chickTech.date[i]);
// //         }
// //     }

// // }

// //adds a marker for each specific meetup location

function addOneMarkerToMap(coordinates, eventName, address) {
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }

    var marker = new google.maps.Marker ({
        position:coordinates,
        map:map,
        icon:icon
    });

    var contentString = `<p><strong>${eventName}<strong><p><p>${address}</p>`;

    var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

    //   marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    //   });

    marker.addListener('mouseover', function() {
        infowindow.open(map, this);
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });
    
    // assuming you also want to hide the infowindow when user mouses-out
    marker.addListener('mouseout', function() {
        infowindow.close();
        marker.setAnimation(null);
    });

    marker.addListener('click', function () {
        marker.setAnimation(null);
    });

    //resets the center of the google map to our specific coordinates
    map.panTo(coordinates);
}