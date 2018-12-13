const getArtistSongs = (q) => {
  fetch(`https://api-play.herokuapp.com/api/v1/search`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'artist': q
    })
  })
    .then(response => response.json())
    .then(parsedResponse => compileArtistSongs(parsedResponse))
    .catch(error => console.error({ error }));
}

const compileArtistSongs = (artistData) => {
  artistData.forEach(song => {
    displayArtistSongs(song);
  });
}

const displayArtistSongs = (song) => {
  $('.songs-index-table').append(`
    <tr class="song-table-row">
      <td class="song-cell"><button class="song-row song-fav-btn" type="button">Favorite</button></td>
      <td class="song-cell" id="song-cell-title-">${song.title}</td>
      <td class="song-cell" id="song-cell-artist">${song.artist}</td>
      <td class="song-cell" id="song-cell-genre">${song.genre}</td>
      <td class="song-cell" id="song-cell-rating">${song.rating}</td>
    </tr>`)
}

const postFavorite = (songData) => {
  fetch('https://api-play.herokuapp.com/api/v1/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: songData[3].innerText,
      artist: songData[5].innerText,
      genre: songData[7].innerText,
      rating: songData[9].innerText
    })
  });
}

const postPlaylist = (playlistData) => {
  fetch('https://api-play.herokuapp.com/api/v1/playlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: playlistData
    })
  });
}

const getFavoriteSongs = () => {
  fetch('https://api-play.herokuapp.com/api/v1/favorites')
  .then((response) => response.json())
  .then((songsData) => compileFavoriteSongs(songsData))
  .catch((error) => console.error({ error }));
}

const compileFavoriteSongs = (songsData) => {
  songsData.forEach(song => {
    displayFavoriteSongs(song);
  });
}

const displayFavoriteSongs = (song) => {
  $('.favorites-index-table').append(`
    <tr class="favorites-table-row">
      <td class="song-cell"><button class="song-row song-fav-btn" type="button">Add To Playlist</button></td>
      <td class="song-cell" id="song-cell-id" style="display:none">${song.id}</td>
      <td class="song-cell" id="song-cell-title-">${song.title}</td>
      <td class="song-cell" id="song-cell-artist">${song.artist}</td>
      <td class="song-cell" id="song-cell-genre">${song.genre}</td>
      <td class="song-cell" id="song-cell-rating">${song.rating}</td>
    </tr>`)
}

$(".search-button").on("click", () => {
  var q = $(".search-nav-input").val()
  getArtistSongs(q);
  $(".search-nav-input").val("")
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.favorites-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$('.search-nav-input').keypress(function (e) {
 var key = e.which;
 if(key == 13)
  {
    $('#search-nav-button').click();
    return false;
  }
});

$("#search-container-button").on("click", () => {
  var q = $(".search-container-input").val();
  getArtistSongs(q);
  $(".search-container-input").val("")
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.favorites-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$('.search-container-input').keypress(function (e) {
 var key = e.which;
 if(key == 13)
  {
    $('#search-container-button').click();
    return false;
  }
});

$(".span-title").on("click", () => {
  $(".search-container-input").val("")
  $(".search-nav-input").val("")
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
  $(".favorites-table-row").remove();
  $('.favorites-container').hide(500);
})

$(".fas-nav").on("click", () => {
  $(".search-container-input").val("")
  $(".search-nav-input").val("")
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
})

$(".songs-container").on("click", ".song-fav-btn", function() {
  var songData = this.parentElement.parentElement.childNodes
  postFavorite(songData);
})

$("#nav-fav-btn").on("click", () => {
  $(".favorites-table-row").remove();
  getFavoriteSongs();
  $(".search-container-input").val("")
  $(".search-nav-input").val("")
  $('.search-container').hide(500);
  $('.songs-container').hide(500);
  $('.favorites-container').slideDown(900)
})

$("#create-new-playlist").on("click", () => {
  $("#create-new-playlist").slideUp(900);
  $(".playlist-name-input").slideDown(500);
  $("#create-button").slideDown(500);
  $("#cancel-button").slideDown(500);
})

$("#create-button").on("click", () => {
  var name = $(".playlist-name-input").val()
  postPlaylist(name);
  $(".playlist-name-input").val("");
})

$("#cancel-button").on("click", () => {
  $("#create-new-playlist").slideDown(900);
  $(".playlist-name-input").hide(500);
  $(".playlist-name-input").val("");
  $("#create-button").hide(500);
  $("#cancel-button").hide(500);
})
