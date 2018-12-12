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
  console.log(songData)
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

$(".search-button").on("click", () => {
  var q = $(".search-nav-input").val()
  getArtistSongs(q);
  $(".search-nav-input").val("")
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$("#search-container-button").on("click", () => {
  var q = $(".search-container-input").val();
  getArtistSongs(q);
  $(".search-container-input").val("")
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$(".span-title").on("click", () => {
  $(".search-container-input").val("")
  $(".search-nav-input").val("")
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
  $('.favorites-container').hide(500)
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
  // getFavoriteSongs()
  $(".search-container-input").val("")
  $(".search-nav-input").val("")
  $('.search-container').hide(500);
  $('.songs-container').hide(500);
  $('.favorites-container').slideDown(900)
})
