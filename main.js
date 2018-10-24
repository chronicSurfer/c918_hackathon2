$(document).ready(initializeApp)

function initializeApp () {
    initMap();
}
function initMap () {
    var options = {
        zoom: 10,
        center: {lat:34.0522, lng:-118.2437}, //los angeles coords
    }
    var map = new google.maps.Map(document.getElementById('map'),options);
    
    //adding marker to the map
    var marker = new google.maps.Marker ({
        position:{lat:34.0235, lng:-118.2813},
        map:map,
    });

    //adding a custom icon
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(30, 30), 
        origin: new google.maps.Point(0,0), 
        anchor: new google.maps.Point(0,0)
    }
    
    //the Shrine coords
    addMarker({lat:34.0522, lng:-118.2437});
    //hollywood bowl coords
    addMarker({lat:34.1122, lng:-118.3391});
    
    
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