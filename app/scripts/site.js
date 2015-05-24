$(document).ready(function() {
	
	var rootApi = 'http://us.battle.net/api/wow/';
	var thumbnailApi = 'http://us.battle.net/static-render/us/';
	var mountThumbnailApi = 'http://media.blizzard.com/wow/renders/npcs/grid/creature';
	
	var characterData = {
		
	};
	
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
	
	var qualities = {
		3: 'rare',
		4: 'epic',
		7: 'crafted'
	};
	
	$('#btn-get-started').click(function(e) {
		e.preventDefault();
		$('#character').focus();
	});
	
	var loadCharacter = function(container, data) {
		var collected = data.mounts.numCollected;
		var total = data.mounts.numCollected + data.mounts.numNotCollected;
		var left = total - collected;
		var mounts = data.mounts.collected;
		var characterThumbnail = thumbnailApi + data.thumbnail;
		
		$('#results .character-name').html(data.name);
		$('#results .character-class').html(classes[data.class]);
		$('#results .character-mounts-collected').html(collected);
		$('#results .total-mounts').html(total);
		$('#results .mounts-left').html('(' + left + ' remaining)');
		$('#character-thumbnail').attr('src', characterThumbnail);
		
		var i = 0;
		$.each(mounts, function(k,v) {
			i++;
			var mountToAdd = $('<div hidden style="background-image: url(' + mountThumbnailApi + mounts[k].creatureId +'.jpg)" class="mount ' + qualities[mounts[k].qualityId] + '"><div class="mount-header"><h3 class="mount-name">' + mounts[k].name + '</h3></div><div class="mount-body"></div></div>');					
		 	mountToAdd.appendTo(container).delay(50*i).fadeIn();
		});		

		$('#results .container').fadeIn();
		
	 	$('html, body').animate({
			scrollTop: $("#character").offset().top - 40
		}, 1000);
	};
	
	$('#search form').submit(function(e) {
		e.preventDefault();
		$('#character-not-found').hide();
		$('#character').select();
		$('#results .container').fadeOut();
		var container = $('#mounts-row > .mounts-container');
		container.empty();
		
		$('#search form').css('opacity', '0.5');
		
		var form = $(this);
		var character = form.find('#character').val();
		var server = form.find('#server').find(':selected').text();			
		
		var characterLoadString = character + '_' + server;
		
		if(!(characterLoadString in characterData)) {
			
			// Example: http://us.battle.net/api/wow/character/stormrage/vesie?locale=en_US&fields=mounts
			var mountsApi = rootApi + 'character/' + server + '/' + character + '?locale=en_US&fields=mounts';	
			
			$.ajax({
				url: mountsApi,
				type: 'GET',
				crossDomain: true,
			 	jsonpCallback: 'callback',
	            dataType: 'jsonp', 
				jsonp: 'jsonp',
				success: function(data) {
					characterData[characterLoadString] = data;
					loadCharacter(container, data);
				},
				error: function(xhr, status, err) {
					if(xhr.status === 404) {
						$('#character-not-found').css('display', 'inline-block').fadeIn();
					}
				},
				complete: function(data) {
					$('#search form').css('opacity', '1');
				}
			});
		} else {
			loadCharacter(container, characterData[characterLoadString]);
		}
	});
});