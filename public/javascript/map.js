//const axios = require('axios');

let map;

function initMap(){
    var stored = '35.2999487,-80.7330315';//CHANGE

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: stored,
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
    var cheapest;

    if (optimizeFor === "TIME"){
        destination = "8600 University City Blvd, Charlotte, NC 28213";
    } else if (optimizeFor === "COST"){
        cheapest = Math.floor(Math.random() * 3);
        if (cheapest == 0){
            destination = "8120 University City Blvd, Charlotte, NC 28213"; //CHANGE
        } else if (cheapest == 1){
            destination = "1100 Chancellor Park Dr, Charlotte, NC 28213"; //CHANGE
        } else{
            destination = "8101 University City Blvd Ste 1A, Charlotte, NC 28213"; //CHANGE
        }
    }

    directionsService.route({
        origin: document.getElementById("from").value,
        destination: destination,

        travelMode: google.maps.TravelMode[selectedMode],
    })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e)=> window.alert("Direction request failed" + status));
}
