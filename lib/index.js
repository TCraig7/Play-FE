const getArtistSongs = () => {
  var q = $(".search-nav-input").val()
  fetch(`https://api-play.herokuapp.com/api/v1/search`, {
    method: 'post',
    body: JSON.stringify({
      artist: q
    })
  })
    .then(response => console.log(response.json()))
    .then(parsedResponse => compileArtistSongs(parsedResponse))
    .catch(error => console.error({ error }));
}

const compileArtistSongs = (artistData) => {
  debugger
  artistData.forEach(song => {
    displayArtistSongs(song);
  });
}

const displayArtistSongs = (song) => {
  $('.songs-container').append(`
    <article class="index-songs">
      <p class="">${song.title}</p>
      <p class="">${song.artist}</p>
    </article>`)
}

$(".search-button").on("click", () => {
  getArtistSongs();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
})

$(".span-title").on("click", () => {
  $('.search-container').slideDown(900)
})
