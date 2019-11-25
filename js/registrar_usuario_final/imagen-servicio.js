var myWidget1 = cloudinary.createUploadWidget({
    cloudName: 'dyssoftware',
    uploadPreset: 'avatarUsuario'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        document.querySelector('#imgAvatar').src = result.info.secure_url;
    }
})

document.getElementById("btn-guardarImagen").addEventListener("click", function() {
    myWidget1.open();
}, false)