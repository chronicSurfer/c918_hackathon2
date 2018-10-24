var global_result;
var girlDevStorage={};

$(document).ready(initializeApp);

function initializeApp(){

}

    var girlDev = {
    url: "http://api.meetup.com/2/events?key=6d367432270505e343b4d7c60634879&group_urlname=girl-develop-it-orange-county&sign=true",
    method: "GET",
    dataType:"jsonp",
    success: function(response){
        console.log(response);
        global_result=response;
        var events=global_result.results;
        data_storage(events)
    },
    error: err=>console.log(err)
}

$.ajax(girlDev)

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