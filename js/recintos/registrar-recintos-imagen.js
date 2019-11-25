'use strict';

var Widget = cloudinary.createUploadWidget({
    cloudName: 'dyssoftware',
    uploadPreset: 'recintos',
    clientAllowedFormats: [
        "png",
        "gif",
        "jpeg"
    ]
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        document.querySelector('.logo--img').src = result.info.secure_url;
    }
})

document.getElementById("btn-guardarImagen").addEventListener("click", function () {
    Widget.open();
}, false);