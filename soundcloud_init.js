// Initialize user client with the correct app credentials
SC.initialize({
  client_id: '7e62ef3c48af74f54421eadd6e2a934b',
  redirect_uri: 'https://dl.dropboxusercontent.com/u/1289699/Better%20soundcloud%20list/soundcloud_callback.html'
});

// gets oEmbed object for soundcloud wave player
function fetchWidget(url, elem) {
  SC.oEmbed(url, { auto_play: true, show_comments: false }, function(oEmbed) {
    // I should just add a class to this and then use CSS to color it
    elem.style.height = (50 + oEmbed.height) + 'px';
    elem.innerHTML += oEmbed.html;
  });
}

window.onload = function () {
  document.getElementById('connect-button').addEventListener('click', function(e) {
    SC.connect(function() {
      SC.get('/me/favorites.json', {limit: 200}, function(my_favorites) {
        var track_list = document.getElementById('tracks-list');
        track_list.className = 'active';
        my_favorites.forEach(function(fav) {
          var track_list_item = document.createElement('li');
          var cover_image = document.createElement('img');
          cover_image.src = fav.artwork_url;
          track_list_item.appendChild(cover_image);
          
          var title_text = document.createElement('h3');
          title_text.innerHTML = fav.title;
          track_list_item.appendChild(title_text);
          
          track_list_item.addEventListener('click', function(e) {
            e.preventDefault();
            // Put the classname here so we can style without having to wait for the request
            track_list_item.className += 'with-sc-player';
			fetchWidget(fav.permalink_url, track_list_item);
          });
          track_list.appendChild(track_list_item);
        });
      });
    });
  
  // Hide after authentication
  this.style.display = 'none';
  });
};