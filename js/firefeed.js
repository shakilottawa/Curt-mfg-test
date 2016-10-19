var ref = new Firebase("http://hacker-news.firebaseio.com/v0/");
	var itemRef = ref.child('item');

	var topStories = [];

	var storyCallback = function(snapshot) {
		var story = snapshot.val();
		var html = '';
        
        if(story.score) {
            html = '<img src="images/article.png">'+'<a href="'+story.url+'" id="article_a">'+story.title+'</a><hr>'		
        }
            
	    document.getElementById(topStories.indexOf(story.id)).innerHTML = html;    
	}

	ref.child('topstories').once('value', function(snapshot) {
		topStories = snapshot.val();
		
		for(var i = 0; i < topStories.length; i++) {
			var element = document.createElement("P");			
			element.id = i;
			document.getElementById('items').appendChild(element);

			itemRef.child(topStories[i]).on('value', storyCallback);
		}
	});

	ref.child('topstories').on('child_changed', function(snapshot, prevChildName) {
		var ref = snapshot.ref()
		var index = ref.name();

		var oldItemId = topStories[index];
		itemRef.child(oldItemId).off();

		var newItemId = snapshot.val();	

		topStories[index] = newItemId
		itemRef.child(newItemId).on('value', storyCallback);
	});