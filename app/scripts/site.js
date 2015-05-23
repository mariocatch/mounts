$(document).ready(function() {
	
	var classes = {
		0: 'N/A',
		1: 'Warrior',
		2: 'Paladin',
		3: 'Hunter',
		4: 'Rogue',
		5: 'Priest',
		6: 'DeathKnight',
		7: 'Shaman',
		8: 'Mage',
		9: 'Warlock',
		10: 'Monk',
		11: 'Druid'
	};
	
	$('#btn-get-started').click(function(e) {
		e.preventDefault();
		$('#character').focus();
	});
	
	$('#search form').submit(function(e) {
		e.preventDefault();
		$('#results .container').fadeOut();
		var container = $('#mounts-row > .mounts-container');
		container.empty();
		
		$('#search form').css('opacity', '0.5');
		
		var form = $(this);
		var character = form.find('#character').val();
		var server = form.find('#server').find(':selected').text();
		
		var rootApi = 'http://us.battle.net/api/wow/';
		var mountsApi = rootApi + 'character/' + server + '/' + character + '?locale=en_US&fields=mounts';
		var thumbnailApi = 'http://us.battle.net/static-render/us/';
		
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
				thumbnailApi = thumbnailApi + data.thumbnail;
				
				$('#results .character-name').html(data.name);
				$('#results .character-class').html(classes[data.class]);
				$('#results .character-mounts-collected').html(collected);
				$('#results .total-mounts').html(total);				
				$('#character-thumbnail').attr('src', thumbnailApi);
				
				$.each(mounts, function(k,v) {					
					var mountToAdd = $('<div class="mount"><div class="mount-header"><h3 class="mount-name">' + mounts[k]['name'] + '</h3></div><div class="mount-body"><p>Placeholder</p></div></div>');
					mountToAdd.appendTo(container);
				});

				$('#search form').css('opacity', '1');
				$('#results .container').fadeIn();
			}
		});
		
		
	});
});