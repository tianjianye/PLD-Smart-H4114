var map;
var positions = [];
var markers = [];
var assemblyTable = [];



setInterval()

function createPositions() {

    getParticipants();
    
    positions.push({location: {latitude: latitude, longitude: longitude}});
    positions.push({location: {latitude: 45.782019, longitude: 4.872554}});
    positions.push({location: {latitude: 45.781980, longitude: 4.872514}});
    positions.push({location: {latitude: 45.782039, longitude: 4.872470}});
    positions.push({location: {latitude: 45.782048, longitude: 4.872501}});
    positions.push({location: {latitude: 45.781048, longitude: 4.872501}});
    positions.push({location: {latitude: 45.781108, longitude: 4.872500}});
    positions.push({location: {latitude: 45.781008, longitude: 4.872504}});
    positions.push({location: {latitude: 45.782039, longitude: 4.862470}});
    
    
    assemblyTable.push(5);
    assemblyTable.push(5);
    assemblyTable.push(1);
    assemblyTable.push(5);
    assemblyTable.push(0);
    assemblyTable.push(4);
    assemblyTable.push(5);
    assemblyTable.push(5);
    assemblyTable.push(2);
    assemblyTable.push(5);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        alert("Geolocation is not supported by this browser");
    }
}

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    initMap(latitude, longitude);
    console.log(latitude);
    console.log(longitude);
}

var latitude;
var logitude;
//var user = getQueryVariable("user");

function newAssembly() {


    document.getElementById("createAssembly").style.display = "block";

}


function createAssembly() {
    console.log("test", latitude,longitude);
    $('#message').text("");
    var title = $('#title').val();
    var description = $('#description').val();
    var radio = $('#radio').val();
    var colour = $('#colour').val();
    if (false) { //Verify whether there are errors
        $('#message').text("Failed");
    } else {
        $.ajax({
            url: './UserServlet',
            method: 'POST',
            data: {
                action: 'createAssembly',
                title: title,
                description: description,
                radio: radio,
                colour: colour,
                latitude:latitude,
                longitude:longitude
            },
            dataType: 'json',
            error: function () {
                console.log("Error while sending  assembly request");
            }
        }).done(function (data) {
            var reponse = data.createAssembly;
            if (reponse.created === "true") {
                document.getElementById("createAssembly").style.display = "none";
            } else {
                $('#message').text("Ups we didn't succed to verify rally creation");
            }
        });
    }
}

function initMap(latitude, longitude) {
    var location = {lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        scaleControl: false,
        fullscreenControl: false,
        zoomControl: false,
        center: location,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            mapTypeIds: ['roadmap', 'satellite'],
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }});
    
    createPositions();
    //Markers
    var marker0 = new google.maps.Marker({
        position: location,
        map: map,
        icon: {url: "./icons/man-black-user.png"}
    });
    attachPseudo(marker0, "moi");

    //afficher des icons avec la couleur selon leur groupe
    dbscan();
    for (var i = 0; i < markers.length; ++i) {
        attachPseudo(markers[i], "" + i + "");
    }
    
   var controlDiv = document.createElement('div');


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
    controlText.innerHTML = 'Ajouter Rassemblement';
    controlUI.appendChild(controlText);
    controlUI.addEventListener('click', function () {
        newAssembly();
    });
    
    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);



}

/*var x = document.getElementById("demo");
 function getLocation() {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(showPosition);
 } else {
 x.innerHTML = "Geolocation is not supported by this browser.";
 }
 }
 
 function showPosition(position) {
 x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
 }*/
/**
 function NumberToIcon(number){
 switch(number){
 default:
 case 1 : return "red";
 case 2 : return "darkred";
 case 3 : return "orange";
 case 4 : return "green";
 case 5 : return "darkgreen";
 case 6 : return "blue";
 case 7 : return "purple";
 case 8 : return "darkpurple";    
 case 9 : return "cadetblue"; 
 }
 }
 
 
 
 class cluster_position{
 constructor(latlng,cluster){
 this.latlng = latlng;
 this.cluster = cluster;        
 }
 }*/

function dbscan() {
    var dbscanner = jDBSCAN().eps(0.05).minPts(1).distance('HAVERSINE').data(positions);
    //var cluster_centers = dbscanner.getClusters(); 
    var cluster = dbscanner();
    //return cluster;

    var nbicon = 4;
    var clusterUser = cluster[0];
    const assembly = new Set();
    
    for (var i = 1; i < positions.length; i++)
    {
        if(cluster[i] == clusterUser)
        {
            console.log(assemblyTable[i]);
            if(!assembly.has(assemblyTable[i]))
            {
                assembly.add(assemblyTable[i]);
            }
        }
        
    }
    
    
  /* for (var i = 0; i < positions.length; i++) {
        if (cluster[i] % nbicon == 0) {
            markers[i] = new google.maps.Marker({
                position: {lat: positions[i].location.latitude, lng: positions[i].location.longitude},
                map: map,
                icon: {url: "./icons/man-red-user.png"}
            });
        }
        if (cluster[i] % nbicon == 1) {
            markers[i] = new google.maps.Marker({
                position: {lat: positions[i].location.latitude, lng: positions[i].location.longitude},
                map: map,
                icon: {url: "./icons/man-blue-user.png"}
            });
        }
        if (cluster[i] % nbicon == 2) {
            markers[i] = new google.maps.Marker({
                position: {lat: positions[i].location.latitude, lng: positions[i].location.longitude},
                map: map,
                icon: {url: "./icons/man-green-user.png"}
            });
        }
        if (cluster[i] % nbicon == 3) {
            markers[i] = new google.maps.Marker({
                position: {lat: positions[i].location.latitude, lng: positions[i].location.longitude},
                map: map,
                icon: {url: "./icons/man-pink-user.png"}
            });
        }
    }*/
}

function attachPseudo(marker, pseudo) {
    var infowindow = new google.maps.InfoWindow({
        content: pseudo
    });

    /**
     marker.addListener('click', function() {
     for(var i = 0;i<markers.length;i++) {
     if(markers[i].infowindow!=null)
     markers[i].infowindow.close(map, markers[i]);
     }
     map.setZoom(19);
     map.setCenter(marker.getPosition());
     infowindow.open(marker.get('map'), marker);
     });*/
    // show info window when marker is clicked
    google.maps.event.addListener(marker, 'click', function () {
        map.setZoom(19);
        map.setCenter(marker.getPosition());
        infowindow.open(map, marker);

    });

    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });
}
