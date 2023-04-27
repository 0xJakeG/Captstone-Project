var axios = require('axios');

var userLat;
var userLng;
var userLocation;
var targetAddress;
var walmartAddress;
var harrisAddress;
var targetTime;
var walmartTime;
var harrisTime;
var location = "8908 University City Blvd, Charlotte, NC 28223";//CHANGE THIS

//geocode();


//GEOCODES USER ADDRESS

function geocode(){
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params:{
            address:location,
            key:'AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo'
        }
    })
    .then(function (response){
        userLat = response.data.results[0].geometry.location.lat;
        userLng = response.data.results[0].geometry.location.lng;
        userLocation = userLat + ',' + userLng;
        console.log(userLocation);
    })
    .catch(function (error){
        console.log(error);
    })
}



//SET ADDYS

function setAddresses(searchAround){

var config = { //radius is currently 5 miles
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + searchAround + '&radius=8000&type=store&keyword=target&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
    headers: { }
};


axios(config)
    .then(function (response) {
        targetAddress = response.data;
        targetAddress = targetAddress.results[0].vicinity;
        //console.log(targetAddress);
    })
    .catch(function (error) {
        console.log(error);
    });

var config = { //radius is currently 5 miles
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + searchAround + '&radius=8000&type=store&keyword=harris teeter&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
        headers: { }
};
    
    
axios(config)
        .then(function (response) {
            harrisAddress = response.data;
            harrisAddress = harrisAddress.results[0].vicinity;
            //console.log(harrisAddress);
        })
        .catch(function (error) {
            console.log(error);
});

var config = { //radius is currently 5 miles
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + searchAround + '&radius=8000&type=store&keyword=walmart&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
    headers: { }
};


axios(config)
    .then(function (response) {
        walmartAddress = response.data;
        walmartAddress = walmartAddress.results[0].vicinity;
        //console.log(walmartAddress);
    })
    .catch(function (error) {
        console.log(error);
    });
}
//SET ADDYS DONE

//TIME FUNCTION
function setTime(){
    var output;

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + location + '&destinations=' + targetAddress + '&units=imperial&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
        headers: { }
    };

    axios(config)
        .then(function (response) {
            output = JSON.stringify(response.data);
            var o = JSON.parse(output);
            var dur = (o.rows[0].elements[0].duration.text);

            dur = dur.substring(0, 2);
            var timeInt = parseInt(dur);
            targetTime = timeInt;
            console.log(targetTime);
        })
        .catch(function (error) {
            console.log(error);
        });

        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + location + '&destinations=' + walmartAddress + '&units=imperial&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
            headers: { }
        };
        
        axios(config)
            .then(function (response) {
                output = JSON.stringify(response.data);
                var o = JSON.parse(output);
                var dur = (o.rows[0].elements[0].duration.text);
        
                dur = dur.substring(0, 2);
                var timeInt = parseInt(dur);
                walmartTime = timeInt;
                console.log(walmartTime);
            })
            .catch(function (error) {
                console.log(error);
            });

            var config = {
                method: 'get',
                url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + location + '&destinations=' + harrisAddress + '&units=imperial&key=AIzaSyCzKNqUGAC9dtaqgyKmPvabVhJVkjXnuRo',
                headers: { }
            };
            
            axios(config)
                .then(function (response) {
                    output = JSON.stringify(response.data);
                    var o = JSON.parse(output);
                    var dur = (o.rows[0].elements[0].duration.text);
            
                    dur = dur.substring(0, 2);
                    var timeInt = parseInt(dur);
                    harrisTime = timeInt;
                    console.log(harrisTime);
                })
                .catch(function (error) {
                    console.log(error);
                });
}
//TIME DONE

//POST TO TABLE
function postTable(){

}
//POST TO TABLE DONE


//EXECUTE FUNCTIONS
let promise1 = new Promise((resolve, reject) => {
    resolve(geocode());
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(setAddresses(userLocation));
    }, 1000);
});

let promise3 = new Promise((resolve, reject) =>{
    setTimeout(() => {
        resolve(setTime());
    }, 2000);
});

let promise4 = new Promise((resolve, reject) =>{
    setTimeout(() => {
        resolve(postTable());
    }, 3000);
});

let promiseExecution = async () => {
    for (let promise of [promise1, promise2, promise3, promise4]) {
        try {
            //const message = await promise;
            //console.log(message);
        } catch (error) {
            console.log(error.message);
        }
    }
};
promiseExecution();