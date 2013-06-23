var version;
var oldVersion = localStorage.version || '1.1.3';

var notify = function(html){
	$('#notification').html(html+'<div class="closebutton"><i class="icon-remove-sign"></i></div>')
		.show()
		.find('.closebutton').on('click', function(){
			$('#notification').hide();
		});
};

var upgradeCallbacks = {
	'1.1.3 1.2': function(){
		notify('<p>Welcome to version '+version+'! You can now rearrange cards by dragging them.</p><p>You can reset your cards with the <i class="icon-refresh"></i> button.</p><p>You can view the default new tab page with the <i class="icon-th"></i> button.</p>');
	}
};

$.getJSON('manifest.json', function(data){
	version = data.version;
	localStorage.version = version;
	
	if (oldVersion != version) {
		var cb = oldVersion+' '+version;
		upgradeCallbacks[cb] && upgradeCallbacks[cb]();
	}
});