let map;
const cheapest = Math.floor(Math.random() * 3);

function initMap(){
    var stored = {lat:35.2999487,lng:-80.7330315};//CHANGE

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

}

window.initMap = initMap;


//display route between two points

function calculateAndDisplayRoute(directionsService, directionsRenderer){
    const selectedMode = document.getElementById("mode").value;
    const optimizeFor = document.getElementById("optimize").value;
    var destination = document.getElementById("to").value;

    if (optimizeFor === "TIME"){
        destination = "8600 University City Blvd, Charlotte, NC 28213";
    } else if (optimizeFor === "COST"){
        if (cheapest == 0){
            destination = "8120 University City Blvd, Charlotte, NC 28213"; //CHANGE
        } else if (cheapest == 1){
            destination = "8600 University City Blvd, Charlotte, NC 28213"; //CHANGE
        } else{
            destination = "7735 N Tryon St Charlotte, NC 28262"; //CHANGE
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
