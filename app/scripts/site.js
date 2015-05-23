$(document).ready(function() {
	$('#search form').submit(function(e) {
		e.preventDefault();
		
		$('#search form').css('opacity', '0.5');
		
		var form = $(this);
		var character = form.find('#character').val();
		var server = form.find('#server').find(':selected').text();
		
		var rootApi = 'http://us.battle.net/api/wow/';
		var mountsApi = rootApi + 'character/' + server + '/' + character + '?locale=en_US&fields=mounts';
		
		// Example: http://us.battle.net/api/wow/character/stormrage/vesie?locale=en_US&fields=mounts
		
		// Query WoW API for character and server.
		$.ajax({
			url: mountsApi,
			type: 'GET',
			crossDomain: true,
		 	jsonpCallback: 'callback',
            dataType: 'jsonp', 
			jsonp: 'jsonp',
			success: function(data) {
				$('#results div').html(JSON.stringify(data));
				$('#search form').css('opacity', '1');
			}
		});
		
		
	});
});