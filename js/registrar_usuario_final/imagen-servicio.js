'use strict'

$(function() {
    let imageUrl = '';

    $.cloudinary.config({ cloud_name: 'dggwipktg', api_key: 278413573499377 });

    let uploadButton = $('#btn-guardarImagen');


    uploadButton.on('click', function(e) {

        cloudinary.openUploadWidget({
                cloud_name: 'dggwipktg',
                upload_preset: 'avatar',
                tags: ['cgal']
            },

            function(error, result) {
                if (error) console.log(error);

                let id = result[0].public_id;
                console.log(id);


                imagenUrl = processImage(id);
                console.log(imagenUrl);

                imagenUrl = imagenUrl.replace('file', 'http');
                document.querySelector('#imgAvatar').src = imagenUrl; //cambiar esto por el otro URL 
                return imagenUrl;

            });
    });
});

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return $.cloudinary.url(id, options);
}