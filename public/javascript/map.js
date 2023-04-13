//const axios = require('axios');

let map;

function initMap(){

    //geocoder
    var stored;
    const geocoder = new google.maps.Geocoder();

    let address = "8908 University City Blvd, Charlotte, NC";

    geocoder.geocode({address: address}, (results, status) => {
        if (status === "OK") {
            stored = results;
            stored = stored[0].geometry.location;
            var lat = stored.lat;
            var long = stored.lng;
            console.log(stored);
            console.log(lat);
            console.log(long);
        } else{
            alert("Geocode error: " + status);
        }
    })
//end geocoder

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: stored,//{lat:35.2271,lng:-80.8431},
    });
    //render directions based on route

    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("mode").addEventListener("change", ()=>{
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });



//place pins functionality
    const script = document.createElement("script");

    script.src =
        "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
    document.getElementsByTagName("head")[0].appendChild(script);

}

const eqfeed_callback = function (results) {
    for (let i = 0; i < results.features.length; i++) {
        //const coords = results.features[i].geometry.coordinates;
        //const latLng = new google.maps.LatLng(coords[1], coords[0]);
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);

        new google.maps.Marker({
            position: latLng,
            map: map,
        });
    }
};

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;

//display route between two points

function calculateAndDisplayRoute(directionsService, directionsRenderer){
    const selectedMode = document.getElementById("mode").value;
    const optimizeFor = document.getElementById("optimize").value;
    var destination = document.getElementById("to").value;

    if (optimizeFor === "TIME"){
        destination = "8600 University City Blvd, Charlotte, NC 28213";
    } else if (optimizeFor === "COST"){
        destination = "8120 University City Blvd, Charlotte, NC 28213";
    }

    directionsService.route({
        origin: document.getElementById("from").value,
        destination: destination,
        //intermediates: document.getElementById("inter").value,

        travelMode: google.maps.TravelMode[selectedMode],
    })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e)=> window.alert("Direction request failed" + status));
}


//json output store locations
/*
const config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.2271,-80.8431&radius=8000&type=store&keyword=walmart&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
    headers: { }
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
*/