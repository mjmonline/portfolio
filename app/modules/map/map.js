import markerIcon from './marker.png';
import mapStyle from './map-style.json';

class GoogleMap {
    constructor() {
    };

    listener() {
        window.addEventListener('mapsApiLoaded', this.init);
    };

    init() {
        const stockholm = new google.maps.LatLng(59.3293125, 18.0685816);
        let mapOptions = {
            center: stockholm,
            zoom: 13,
            scrollwheel: false,
            disableDefaultUI: true,
            styles: mapStyle
        };

        let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // To add the marker to the map, use the 'map' property
        let marker = new google.maps.Marker({
            position: stockholm,
            map: map,
            icon: markerIcon,
            title: "View on Google Maps",
            url: "https://www.google.se/maps/place/Stockholm/@59.3261419,17.9875456,11z/data=!3m1!4b1!4m2!3m1!1s0x465f763119640bcb:0xa80d27d3679d7766?hl=sv"
        });

        marker.setMap(map);

        google.maps.event.addListener(marker, 'click', function() {
            window.location.href = marker.url;
        });

        google.maps.event.addDomListener(window, 'resize', function() {
            map.setCenter(mapOptions.center);
        });
    };
};

export default GoogleMap;
