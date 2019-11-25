var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dyssoftware',
    clientAllowedFormats: [
        "png",
        "gif",
        "jpeg"
    ],
    uploadPreset: 'eventos'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        document.querySelector('#imgEvento').src = result.info.secure_url;
    }
})

document.getElementById("btn_foto").addEventListener("click", function() {
    myWidget.open();
}, false);