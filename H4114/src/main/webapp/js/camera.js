/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const constraints = window.constraints = {
  audio: false,
  video: true
};


function start(){
    const video = document.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            /* handle the error */
            if (error.name === 'ConstraintNotSatisfiedError') {
                let v = constraints.video;
                errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
            } else if (error.name === 'PermissionDeniedError') {
                errorMsg('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
            }
            errorMsg(`getUserMedia error: ${error.name}`, error);
        });
    }
}

function stream() {
    const video = document.getElementById('video');
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML = `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
}
