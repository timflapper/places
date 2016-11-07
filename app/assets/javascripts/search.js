$(function() {

  function initVenueSearch(loc) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);

    var sVer = 0;

    $('#search').on('keyup', function(e) {
      var newVer = sVer + 1;

      sVer = newVer + 0;

      $('#results').html('');

      if ($(this).val().length < 3) {
        return true;
      }

      var request = {
        location: loc,
        name: $(this).val(),
        types: ['bar', 'restaurant'],
        rankBy: google.maps.places.RankBy.DISTANCE
      };

      service.nearbySearch(request, function(results, status) {
        if (sVer != newVer) return;

        var rl = results.length;

        var resHtml = '';

        for (var i = 0; i < rl; i++) {
          name = results[i].name;

          var to = results[i].geometry.location;
          var dist = google.maps.geometry.spherical.computeDistanceBetween(loc, to);

          resHtml += '<p>' + name;
          resHtml += '<span class="distance">' + Math.round(dist) + ' meters away</span>';
          resHtml += '<span class="address">' + results[i].vicinity + '</span>';
          resHtml += '</p>';
        }

        $('#results').html(resHtml);
      });

      return true;
    });
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    initVenueSearch(loc);
  });
});
