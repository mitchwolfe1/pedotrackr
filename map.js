var mydata = JSON.parse(data);

//console.log(mydata.markers[4].lt)

var image = "https://awsphoto.familywatchdog.us/OffenderPhoto/OffenderPhoto.aspx?id=COXX10073048&width=200";
var contentString = '<h1>test</h1>'


var map;

function initMap() {
	var center = {lat: 37.299536, lng: -121.907593};

	var nameList = JSON.parse(names);
	console.log(nameList.names[0].firstname + nameList.names[0].lastname);


	map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 6,
		minZoom: 4,
		maxZoom: 18,
		// styles: darkStyle
	});

	var lotsofmarkers = [];

	for(var i = 0; i < Object.keys(mydata.markers).length; i++) {
		//console.log(mydata.markers[i].lt + "," + mydata.markers[i].ln)

		var oid = String(mydata.markers[i].oid);



		if (oid.includes("A") || oid.includes("B") || oid.includes("C") || oid.includes("D") || oid.includes("E") || oid.includes("F") || oid.includes("G") || oid.includes("H") || oid.includes("I") || oid.includes("J") || oid.includes("K") || oid.includes("L") || oid.includes("M") || oid.includes("N") || oid.includes("O") || oid.includes("P") || oid.includes("Q") || oid.includes("R") || oid.includes("S") || oid.includes("T") || oid.includes("U") || oid.includes("V") || oid.includes("W") || oid.includes("X") || oid.includes("Y") || oid.includes("Z")){

			//getReverseGeocodingData(36.3003829, -115.2812187);

			//console.log(oid);
			//ADDS MARKER
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(mydata.markers[i].lt), lng: parseFloat(mydata.markers[i].ln)},
				icon: 'images/imagepin.png'
				//map: map
			});

			var rand = Math.floor((Math.random() * Object.keys(nameList.names).length-1) + 1);
			var fullName = nameList.names[rand].firstname + ' ' + nameList.names[rand].lastname;

			addInfoWindow(marker,'<h1>'+ fullName +'</h1><br>' + mydata.markers[i].lt + "," + mydata.markers[i].ln + '<br><img src="https://awsphoto.familywatchdog.us/OffenderPhoto/OffenderPhoto.aspx?id='+oid+'&width=200">');

			//PUSHES MARKER
			lotsofmarkers.push(marker);
		} else {
			//ADDS MARKER
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(mydata.markers[i].lt), lng: parseFloat(mydata.markers[i].ln)},
				icon: 'images/noimagepin.png'
				//map: map
			});

			var rand = Math.floor((Math.random() * Object.keys(nameList.names).length-1) + 1);
			var fullName = nameList.names[rand].firstname + ' ' + nameList.names[rand].lastname;

			addInfoWindow(marker,'<h1>'+ fullName +'</h1><br>' + mydata.markers[i].lt + "," + mydata.markers[i].ln);

			//PUSHES MARKER
			lotsofmarkers.push(marker);
		};
	}
	var markerCluster = new MarkerClusterer(map, lotsofmarkers, {imagePath: 'images/m', maxZoom: 13});
	//getReverseGeocodingData(45.296047, -106.492477);
}
function addInfoWindow(marker, message) {
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});

	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open(map, marker);
		console.log("CLICK")
	});
}


function getReverseGeocodingData(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	// This is making the Geocode request
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latlng }, function (results, status) {
		if (status !== google.maps.GeocoderStatus.OK) {
			alert(status);
		}
		// This is checking to see if the Geoeode Status is OK before proceeding
		if (status == google.maps.GeocoderStatus.OK) {
			console.log(results);
			var address = (results[0].formatted_address);
		}
	});
}
