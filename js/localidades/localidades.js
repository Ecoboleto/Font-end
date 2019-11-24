$(document).ready(function () {
    getData(
        "https://ubicaciones.paginasweb.cr/provincias.json", 
        function (data){
            $("#provincias").html(arrayToOptions(data));
        }
    );
});

var map;
var geocoder;
var crLat = 9.6301892;
var crLng = -84.2541843;

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: crLat, lng: crLng},
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: crLat, lng: crLng}
    });
    google.maps.event.addListener(marker, 'dragend', function () {
        onMakerMove(marker);
    });
}

// function codeAddress(address) {
//     geocoder.geocode( { 'address': address}, function(results, status) {

//         if (status == google.maps.GeocoderStatus.OK) {
//             map.setCenter(results[0].geometry.location);
//             marker.setPosition(results[0].geometry.location);
//             onMakerMove(marker);
//         } else {
//             console.debug('No pudimos obtener la dirección porque: ' + status);
//         }
//     });
// }

function onMakerMove(marker) {
    $("#coordenadas").val(marker.getPosition().toString().replace('(', '').replace(')', ''));
}

function getCantones(idProvincia){
    // map.setZoom(9);
    // codeAddress("Costa Rica, "+$('#provincias option:selected').text());
    getData(
        "https://ubicaciones.paginasweb.cr/provincia/"+idProvincia+"/cantones.json", 
        function (data){
            $("#cantones").html(arrayToOptions(data));
            $(".canton").show();
            $(".distrito").hide();
            $(".send").hide();
        }
    );
}

function getDistritos(idCanton){
    var query = "Costa Rica, "+$('#provincias option:selected').text()+', '+$('#cantones option:selected').text();
    // console.log(query);
    // map.setZoom(12);
    // codeAddress(query);
    var idProvincia = $("#provincias").val();
    getData(
        "https://ubicaciones.paginasweb.cr/provincia/"+idProvincia+"/canton/"+idCanton+"/distritos.json", 
        function (data){
            $("#distritos").html(arrayToOptions(data));
            $(".distrito").show();
            $(".send").hide();
        }
    );
}

function distritoSelected() {
    var query = "Costa Rica, "+jQuery('#provincias option:selected').text()+","+jQuery('#cantones option:selected').text()+","+jQuery('#distritos option:selected').text();
    // map.setZoom(15);
    // codeAddress(query);
    $('.send').show()
}

function arrayToOptions(array) {
    var html = '<option value="0">Seleccione una opción</option>';
    for(key in array) {
        html += "<option value='"+key+"'>"+array[key]+"</option>";
    }
    return html;
}

function getData(url, callback) {
    $.ajax({
        dataType: "json",
        url: url,
        success: function (data) {
            callback(data);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function sendData() {
    var data = $("#ubicationForm").serialize();
    alert(data);
    // send data to server via ajax
    return false;
}