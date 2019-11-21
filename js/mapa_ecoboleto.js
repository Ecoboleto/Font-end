'use strict';

navigator.geolocation.getCurrentPosition(mostrarDatos,mostrarError);

function mostrarDatos(pPosicion){
// let latitud = pPosicion.coords.latitude;
// let longitud = pPosicion.coords.longitude;
let latitud = 9.9110666;
let longitud = -84.0174776;

    // document.querySelector('#txtLatitud').value = latitud;
    // document.querySelector('#txtLongitud').value = longitud;

  let coords = new google.maps.LatLng(latitud,longitud);

  let mapOptions = {
    zoom: 16,
    center: coords,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  let mapita = new google.maps.Map(
    document.querySelector('#mapa'), mapOptions
  );

  let marker = new google.maps.Marker({
    position: coords,
    map: mapita,
    title: 'Posición actual'
  });

  let trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(mapita);
}

function mostrarError(pError){
  let sMsjError = '';

  switch(pError){
    case pError.PERMISSION_DENIED:
      sMsjError = 'El usuario denego el acceso a la ubicación';
    break;
    case pError.POSITION_UNAVAILABLE:
      sMsjError = 'No se pudo acceder a la posición';
    break;
    case pError.TIMEOUT:
      sMsjError = 'EL tiempo de espera excedió el límite';
    break;
    case pError.UNKNOWN_ERROR:
      sMsjError = 'Sucedió un error inesperado';
    break;
    default:
      sMsjError = 'Sucedió un error inesperado';
    break;
  }
  document.querySelector('#mapa').innerHTML = sMsjError;
};