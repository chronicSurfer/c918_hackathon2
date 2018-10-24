$(document).ready(initializeApp)

var map;

function initializeApp () {
    addClickHandlerToSubmitButton();
}

function initMap () {
    var options = {
        zoom: 10,
        center: {lat:33.6846, lng:-117.8265}, //irvine coords
    }
    map = new google.maps.Map(document.getElementById('map'),options);

    //adding marker to the map
    var marker = new google.maps.Marker ({
        position:{lat:33.6846, lng:-117.8265},
        map:map,
    });

    //adding a custom icon
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }

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
            pickRandomImages(linkArray);
        },
      });
}

function pickRandomImages(array){
    var randomImages = [];
    for(var i = 0; i < 12; i++){
        var image = array[Math.floor(Math.random() * array.length)];
        var imagePosition = array.indexOf(image);
        array.splice(imagePosition, 1);
        randomImages.push(image);
    }
    console.log(randomImages);
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
                var tweetText = data.tweets.statuses[item].text;
                var linkIndex = tweetText.indexOf('http');
                var linkLocation = (tweetText.slice(linkIndex));

                    console.log(linkLocation);
                    console.log(tweetText + linkLocation);

                $('#tweets').append( $('<li>', {
                    text: data.tweets.statuses[item] + linkLocation.html
                // <a href="linkLocation"></a>
            }) );
            }
        }
    });
}