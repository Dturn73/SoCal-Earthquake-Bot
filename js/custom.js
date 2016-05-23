var currentEarthQuake, time;

var getData = function(){
	var time = new Date($.now()).toLocaleString();
	$.get('http://earthquake.usgs.gov/fdsnws/event/1/query?',
		{//build a query string based on USGS's API
			format: 'geojson',
			starttime: time,
			catalog: 'ci',
			contributor: 'ci',
			minmagnitude: .5
		},function(earthquakes){
			//process response
			var featuresArr = earthquakes.features;
			//console.log(featuresArr);
			var currentEarthQuake = featuresArr[0];
			console.log(featuresArr);
			postMostRecentEarthQuake(currentEarthQuake);
	});
}

var postMostRecentEarthQuake = function(currentEarthQuake){
	$("#most-recent-earthquake").empty();
	document.getElementById('most-recent-earthquake').innerHTML = '<p>'+'A ' + currentEarthQuake.properties.mag + ' magnitude earthquake occured' + 
	'<br>' + currentEarthQuake.properties.place + '<br>' + 'on ' + new Date (currentEarthQuake.properties.time).toLocaleString() +'</p>';
	document.getElementById('update').innerHTML = 'Last updated at ' + new Date($.now()).toLocaleString();
}
getData();
setInterval(getData, 30000);
