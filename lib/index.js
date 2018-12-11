const getArtistSongs = () => {
  var q = $(".search-nav-input").val()
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
      <td class="song-cell">${song.title}</td>
      <td class="song-cell">${song.artist}</td>
      <td class="song-cell">${song.genre}</td>
      <td class="song-cell">${song.rating}</td>
    </tr>`)
}

$(".search-button").on("click", () => {
  getArtistSongs();
  $(".search-nav-input").val("")
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$(".span-title").on("click", () => {
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
})
