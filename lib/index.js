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
  $('.songs-container').append(`
    <article class="songs-index">
      <td class="song-fav-btn" type="button">Favorite</td>
      <td class="">${song.title}</td>
      <td class="">${song.artist}</td>
      <td class="">${song.genre}</td>
      <td class="">${song.rating}</td>
    </article>`)
}

$(".search-button").on("click", () => {
  getArtistSongs();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$(".span-title").on("click", () => {
  $('.search-container').slideDown(900);
  // $('.songs-container').hide(500);
  // $('.songs-index').remove();
})
