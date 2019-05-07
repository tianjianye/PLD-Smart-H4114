function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return(false);
}
;

document.getElementById("createRally").hidden = true;

var user = getQueryVariable("user");
var latitude;
var longitude;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

function newRally() {
    document.getElementById("createRally").hidden = false;
}


function createRally() {
    $('#message').text("");
    var rally = $('#rally').val();
    var description = $('#description').val();
    var place = $('#place').val();
    var date = $('#date').val();
    var time = $('#time').val();
    var radio = $('#radio').val();
    var email = $('#email').val();
    var password = $('#password').val();
    if (false) { //Verify whether there are errors
        $('#message').text("Failed");
    } else {
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                action: 'create rally',
                rally: rally,
                description: description,
                place: place,
                date: date,
                time: time,
                radio: radio,
                email: email,
                password: password
            },
            dataType: 'json',
            error: function () {
                alert("Error while sending new rally request");
            }
        }).done(function (data) {
            var reponse = data.createRally;
            if (reponse.rallyCreated === "true") {
                document.getElementById("createRally").hidden = true;
            } else {
                $('#message').text("Ups we didn't succed to verify rally creation");
            }
        });
    }
}

function initMap() {

    var marker;
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        scaleControl: false,
        fullscreenControl: false,
        zoomControl: false,
        center: {lat: 45.78165420692724, lng: 4.872048616873495},
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            mapTypeIds: ['roadmap', 'satellite'],
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }});

    var marker = new google.maps.Marker({
        map: map,
        icon: {url: "./icons/man-red-user.png"}
    });

    var controlDiv = document.createElement('div');

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'red';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '22px';
    controlUI.style.marginLeft = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(255,255,255)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'New Rally';
    controlUI.appendChild(controlText);
    controlUI.addEventListener('click', function () {
        newRally();
    });
    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);

    //infoWindow = new google.maps.InfoWindow;
    /*function handleLocationError(browserHasGeolocation, infoWindow, pos) {
     infoWindow.setPosition(pos);
     infoWindow.setContent(browserHasGeolocation ?
     'Error: The Geolocation service failed.' :
     'Error: Your browser doesn\'t support geolocation.');
     infoWindow.open(map);
     }*/
    // handleLocationError(false, infoWindow, map.getCenter());
    //handleLocationError(true, infoWindow, map.getCenter());
    window.setInterval(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {lat: position.coords.latitude,
                    lng: position.coords.longitude};

                var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);
                marker.setPosition(myLatlng);

            }, function () {
                Console.log("The geolocation service failed");
            });
        } else {
            Console.log("Browser doesn't support geolocation");
        }
    }, 5000);
}

