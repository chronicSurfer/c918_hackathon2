$(document).ready(initializeApp);

var map;
var storeReply = {};
storeReply.chickTech = chickTechStorage;
storeReply.girlDev= girlDevStorage;

function initializeApp () {
    addClickHandlerToSubmitButton();
    $(".picture").on("click",addDataOntoPage);
    createPhotoArray();

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

            for(var i = 1; i < response.photos.photo.length; i++){
                var photoFarm = response.photos.photo[i].farm;
                var photoServer = response.photos.photo[i].server;
                var photoID = response.photos.photo[i].id;
                var photoSecret = response.photos.photo[i].secret;
                var link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                linkArray.push(link);
            }
            // var randomImage = linkArray[Math.floor(Math.random()*linkArray.length)];
            // console.log(randomImage);
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
}

function placeRandomImages(array){
    var figureArray = [];
        for(var i = 0; i < 8; i++) { //array.length
            //create an img with the src from the array and append it to the appropriate figure in the figureArray
            //append that figureArray to #events-to-choose
            var newFigure = $('<figure>');
            figureArray.push(newFigure);
            var newImage = $('<img>').attr('src', array[i]).appendTo(newFigure);
        }
        $('#events-to-choose').append(figureArray);
}


function addClickHandlerToSubmitButton(){
    $('#submit').click(search)
}

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