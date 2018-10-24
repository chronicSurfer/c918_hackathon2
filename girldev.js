var global_result;


$(document).ready(initializeApp);

function initializeApp(){
    // $('button').click(getData);
    getDataFromGirlDev();
}

function getDataFromGirlDev(){
var settings = {
    url: "http://api.meetup.com/2/events?key=6d367432270505e343b4d7c60634879&group_urlname=girl-develop-it-orange-county&sign=true",
    method: "GET",
    dataType:"jsonp",
    success: function(response){
        console.log(response);
        global_result=response;
        var events=global_result.results;
        for(var i=0;i<events.length; i++){
            //lat
            var latitude = global_result.results[i].venue.lat;

            //lon
            var longitude = global_result.results[i].venue.lon;

            //name
            var eventName = global_result.results[i].name;
            // var eventNameElement=$('<div>').text(eventName);
            // $('.event-name').append(eventNameElement);
            
            //date toDateString
            var date = global_result.results[i].time;
            var d = new Date(date);
            var n=d.toLocaleString();
            
            //time   toTimeString
            var n=d.toTimeString();

            //directions including venue name, city, address
            var venueName =global_result.results[i].venue.name;
            var city =global_result.results[i].venue.city;
            var address = global_result.results[i].venue.address_1;
        
            //group name
            var groupName = global_result.results[i].group.name;

            //event_url
            var url=  global_result.results[i].event_url;

            //description
            var description=global_result.results[i].description;
            var coordinates = {
                lat: latitude,
                lng: longitude
            }

            addOneMarkerToMap(coordinates);
            
        }
  
    },
    error: err=>console.log(err)
  } 
  
  $.ajax(settings)

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
}};