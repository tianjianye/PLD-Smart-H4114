/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var socketListen;
var pcListen;



const configuration = {iceServers: [{urls: 'stun:stun.l.googke.com:19302'}/*{urls: 'turn:10.43.6.50:3478',credential: 'test',
    username: 'test'}*/]};
const constraints = window.constraints = {
  audio: false,
  video: true
};

function setLocalAndSendMessage(sessionDescription) {
    pcListen.setLocalDescription(sessionDescription);
    sendMessage(sessionDescription);
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
}

function connectListen(number){
    socketListen = new WebSocket("ws://192.168.137.1:8084/H4114/video/" + number + "/listen/" + name);
    socketListen.onopen = function (event) {
        console.log("/!\\ Connexion serveur");
    };
    socketListen.onerror = function (event) {
        console.log(event);
    };
    socketListen.onmessage = function (event) {
        errorMsg(event.data);
        console.log(event.data);
        var json = JSON.parse(event.data);
        if(json.type === 'candidate') {
            var candidate = new RTCIceCandidate(json.candidate);
            pcListen.addIceCandidate(candidate);
        }else if(json.type === 'offer') {
            console.log(json.sdp);
            handleVideoOfferMsg(json);
        }
    };
    socketListen.onclose = function (event) {
        sendMessage({
            user : 'start',
            type : 'bye'
        });
        console.log("/!\\ Déconnexion serveur");
    };
}

function handleVideoOfferMsg(msg) {
    errorMsg("handleVideoOfferMsg");
    createPeerConnection();
    errorMsg("handleVideoOfferMsg2");
    var desc = new RTCSessionDescription(msg.sdp);
    errorMsg("handleVideoOfferMsg4");

    pcListen.setRemoteDescription(desc).then(function() {
        return pcListen.createAnswer();
        errorMsg("handleVideoOfferMsg5");
    })
    .then(function(answer) {
        return pcListen.setLocalDescription(answer);
    })
    .then(function() {
        errorMsg("handleVideoOfferMsg3");
        var msg = {
            user: "listen",
            type: "answer",
            sdp: pcListen.localDescription
        }; 
        errorMsg(msg);
        sendMessage(msg);
    });
}


function createPeerConnection() {
    errorMsg("createPeerConnection");
    errorMsg(configuration);
    pcListen = new RTCPeerConnection(configuration);
    errorMsg("createPeerConnection2");

    pcListen.onicecandidate = handleICECandidateEventListen;
    pcListen.ontrack = handleTrackEventListen;
    pcListen.onnegotiationneeded = handleNegotiationNeededEventListen;
    pcListen.onremovetrack = handleRemoveTrackEventListen;
    pcListen.oniceconnectionstatechange = handleICEConnectionStateChangeEventListen;
    pcListen.onicegatheringstatechange = handleICEGatheringStateChangeEventListen;
    pcListen.onsignalingstatechange = handleSignalingStateChangeEventListen;
}

function handleNegotiationNeededEventListen() {
    console.log("Sending offer to peer.");
    pcListen.createOffer().then(function(offer) {
        return pcListen.setLocalDescription(offer);
    })
    .then(function() {
        sendMessage({
            user : 'start',
            type : 'offer',
            sdp : pcListen.localDescription
        });
    });
}

function handleICECandidateEventListen(event) {
    if (event.candidate) {
        sendMessage({
            user : "start",
            type: "candidate",
            candidate: event.candidate
        });
    }
}

function handleICEConnectionStateChangeEventListen(event) {
    console.log("*** ICE connection state changed to " + pcListen.iceConnectionState);

    switch(pcs[index].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
            break;
    }
}

function handleSignalingStateChangeEventListen(event) {
    console.log("*** WebRTC signaling state changed to: " + pcListen.signalingState);
    switch(pcs[index].signalingState) {
        case "closed":
            break;
    }
}

function handleICEGatheringStateChangeEventListen(event) {
    console.log("*** ICE gathering state changed to: " + pcListen.iceGatheringState);
}

function handleTrackEventListen(event) {
    const video = document.getElementById('video');
    console.log("ashoidiasipdfsapfopapasfjasfpasfopaspasfoafjoaspfosajasajsfajsfopasjfodjapsdjopasjdpoj");
    errorMsg("ashoidiasipdfsapfopapasfjasfpasfopaspasfoafjoaspfosajasajsfajsfopasjfodjapsdjopasjdpoj");
    video.srcObject = event.streams[0];
    console.log(event.streams.length);
    console.log(document.getElementById("video").srcObject);
    errorMsg(document.getElementById("video").srcObject.id);
}

function handleRemoveTrackEventListen(event) {
    var stream = document.getElementById("videoDest").srcObject;
    var trackList = stream.getTracks();

    if (trackList.length === 0) {
        closeVideoCall();
    }
}


