//Map
	google.maps.event.addDomListener(window, 'load', init);

 	function init(){
 		var map = new google.maps.Map(document.getElementById('map'), {
	        center: {lat: 40.734730,  lng: -73.996491},
	        zoom: 10,
	        scrollwheel: false,
	    });

		var marker = new google.maps.Marker({
			position: {lat: 40.734730, lng: -73.996491},
		    map: map,
		    icon: 'assets/images/map-marker.png'
		});
 	}