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
				/*
					<div class="mount">
						<div class="mount-header">
							<h3 class="mount-name">Steed</h3>
						</div>
						<div class="mount-body">
							<p>Placeholder</p>
						</div>
					</div>
				*/		
				
				var collected = data.mounts.numCollected;
				var total = data.mounts.numCollected + data.mounts.numNotCollected;
				var mounts = data.mounts.collected;
				
				console.log('collected: ' + collected);
				console.log('total: ' + total);
				
				var container = $('#mounts-row > .mounts-container');
				
				$.each(mounts, function(k,v) {
					console.log(mounts[k]);
					
					var mountToAdd = $('<div class="mount"><div class="mount-header"><h3 class="mount-name">' + mounts[k]['name'] + '</h3></div><div class="mount-body"><p>Placeholder</p></div></div>');
					mountToAdd.appendTo(container);
				});

				$('#search form').css('opacity', '1');
			}
		});
		
		
	});
});