/* eslint-disable no-undef */
/* eslint-disable no-new */
/* eslint-disable quotes */
/* eslint-disable quote-props */
function myMap () {
  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "labels",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#ECF0F1"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off",
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off",
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off",
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

  var directionsService = new google.maps.DirectionsService()
  var directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: "#5DADE2",
      strokeOpacity: 1,
      strokeWeight: 5
    }
  })

  var mapProp = {
    center: new google.maps.LatLng(-1.2691296, 36.807659),
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: true,
    styles: mapStyle,
    zoom: 15
  }

  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp)

  directionsRenderer.setMap(map)

  var leftBtn = document.getElementById("leftBtn")
  var rightBtn = document.getElementById("rightBtn")
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(leftBtn);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(rightBtn);

  const onlinelocations = []
  const offlineLocations = []

  setTimeout(() => {
    const onlineRiders = document.getElementById("onlineRiders").value
    const onlineRider = JSON.parse(onlineRiders)

    const offlineRiders = document.getElementById("offlineRiders").value
    const offlineRider = JSON.parse(offlineRiders)

    for (let i = 0; i < onlineRider.length; i++) {
      const lat = onlineRider[i].latitude
      const long = onlineRider[i].longitude
      const id = onlineRider[i].id
      const Name = onlineRider[i].Name
      const Phone = onlineRider[i].phoneNo
      const Status = 'Online'

      onlinelocations.push({ lat: lat, long: long, id: id, Name: Name, Phone: Phone, Status: Status })
    }

    for (let i = 0; i < offlineRider.length; i++) {
      const lat = offlineRider[i].latitude
      const long = offlineRider[i].longitude
      const id = offlineRider[i].id
      const Name = offlineRider[i].Name
      const Phone = offlineRider[i].phoneNo
      const Status = 'Offline'

      offlineLocations.push({ lat: lat, long: long, id: id, Name: Name, Phone: Phone, Status: Status })
    }

    const circleCenter = {
    path:
      "M -25, 0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0",
    fillColor: "#54F48C",
    fillOpacity: 3,
    scale: 0.7,
    strokeColor: "#21C55A",
    strokeOpacity: 0.5,
    strokeWeight: 8
  }

  const circleCenter2 = {
    path:
      "M -25, 0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0",
    fillColor: "#5DADE2",
    fillOpacity: 3,
    scale: 0.7,
    strokeColor: "#AED6F1",
    strokeOpacity: 0.5,
    strokeWeight: 8
  }

  for (let i = 0; i < onlinelocations.length; i++) {
    const location = onlinelocations[i]
    location.marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat, location.long),
      icon: circleCenter,
      map: map,
      label: {
        text: location.id.toString(),
        color: '#000000'
      }
    })

    location.contentString = '<div id="infowindow-content-rider">' +
    '<span> Associate Name: ' + location.Name + '</span><br>' +
    '<span> Associate Phone: ' + location.Phone + '</span><br>' +
    '</div>'

    location.infowindowRider = new google.maps.InfoWindow({
      content: location.contentString
    })
    location.marker.addListener('click', function () {
      location.infowindowRider.open(map, location.marker)
    })
  }

  for (let i = 0; i < offlineLocations.length; i++) {
    const location = offlineLocations[i]
    location.marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat, location.long),
      icon: circleCenter2,
      map: map,
      label: {
        text: location.id.toString(),
        color: '#000000'
      }
    })

    location.contentString = '<div id="infowindow-content-rider">' +
    '<span> Associate Name: ' + location.Name + '</span><br>' +
    '<span> Associate Phone: ' + location.Phone + '</span><br>' +
    '</div>'

    location.infowindowRider = new google.maps.InfoWindow({
      content: location.contentString
    })
    location.marker.addListener('click', function () {
      location.infowindowRider.open(map, location.marker)
    })
  }


  }, 5000)

  const originMarker = {
    path:
      "M -16, 0 a 15,15 0 1,1 30,0 a 15,15 0 1,1 -30,0",
    fillColor: "#5DADE2",
    fillOpacity: 3,
    scale: 0.7,
    strokeColor: "#AED6F1",
    strokeOpacity: 0.5,
    strokeWeight: 8
  }

  const destinationMarker = {
    path:
      "M -25, 0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0",
    fillColor: "#5DADE2",
    fillOpacity: 3,
    scale: 0.7,
    strokeColor: "#AED6F1",
    strokeOpacity: 0.5,
    strokeWeight: 8
  }

  const newMarker = new google.maps.Marker({
    icon: originMarker,
    map: map,
    label: {
      text: 'p',
      color: '#FBFCFC'
    }
  })

  const newMarker2 = new google.maps.Marker({
    icon: destinationMarker,
    map: map,
    label: {
      text: 'D',
      color: '#FBFCFC'
    }
  })

  const infowindow = new google.maps.InfoWindow()
  const infowindow2 = new google.maps.InfoWindow()
  const infowindow3 = new google.maps.InfoWindow()
  const infowindowContentOrigin = document.getElementById('infowindow-content-origin')
  const infowindowContentDestination = document.getElementById('infowindow-content-destination')
  const infowindowContentStop = document.getElementById('infowindow-content-stop')
  infowindow.setContent(infowindowContentOrigin)
  infowindow2.setContent(infowindowContentDestination)
  infowindow3.setContent(infowindowContentStop)

  $("#locations").change(() => {
    calculateAndDisplayRoute(directionsService, directionsRenderer, map, newMarker, newMarker2,
      originMarker, infowindowContentOrigin, infowindowContentDestination, infowindowContentStop
      , infowindow, infowindow2, infowindow3)
  })
}

function calculateAndDisplayRoute (directionsService, directionsRenderer, map, newMarker,
  newMarker2, originMarker, infowindowContentOrigin, infowindowContentDestination, infowindowContentStop
  , infowindow, infowindow2, infowindow3) {
  var locations = $("#locations").val()
  var points = JSON.parse(locations)

  var waypts = []
  const origin = []
  const destination = []
  let originName = ''
  let destinationName = ''
  // var array = point;
  var checkboxArray = points
  // console.log(checkboxArray);
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i].is_stopover === 1) {
      waypts.push({
        location: checkboxArray[i].name,
        stopover: true
      })
      const locations = { lat: checkboxArray[i].latitude, lng: checkboxArray[i].longitude }
      createMarker(locations, checkboxArray[i].name, map, originMarker, infowindowContentStop, infowindow3)
    }

    if (checkboxArray[i].is_stopover === 0 && checkboxArray[i].is_destination === 0) {
      origin.push({ lat: checkboxArray[i].latitude, lng: checkboxArray[i].longitude })
      originName = checkboxArray[i].name
    }

    if (checkboxArray[i].is_stopover === 0 && checkboxArray[i].is_destination === 1) {
      destination.push({ lat: checkboxArray[i].latitude, lng: checkboxArray[i].longitude })
      destinationName = checkboxArray[i].name
    }
  }

  newMarker.setPosition(origin[0])
  newMarker.setVisible(true)

  newMarker2.setPosition(destination[0])
  newMarker2.setVisible(true)

  newMarker.addListener('click', function () {
    infowindowContentOrigin.children['place-name'].textContent = originName
    infowindow.open(map, newMarker)
  })

  newMarker2.addListener('click', function () {
    infowindowContentDestination.children['place-name2'].textContent = destinationName
    infowindow2.open(map, newMarker2)
  })

  var request = {
    origin: newMarker.position,
    destination: newMarker2.position,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }

  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response)
      directionsRenderer.setMap(map)
    } else {
      alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status)
    }
  })
}

function createMarker (latlng, name, map, originMarker, infowindowContentOrigin, infowindow3) {
  const marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(latlng),
    icon: originMarker,
    map: map,
    label: {
      text: 'p',
      color: '#FBFCFC'
    }
  })

  marker3.addListener('click', function () {
    infowindowContentOrigin.children['place-name3'].textContent = name
    infowindow3.open(map, marker3)
  })
}
