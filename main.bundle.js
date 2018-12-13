/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var getArtistSongs = function getArtistSongs(q) {
  fetch("https://api-play.herokuapp.com/api/v1/search", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'artist': q
    })
  }).then(function (response) {
    return response.json();
  }).then(function (parsedResponse) {
    return compileArtistSongs(parsedResponse);
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var compileArtistSongs = function compileArtistSongs(artistData) {
  artistData.forEach(function (song) {
    displayArtistSongs(song);
  });
};

var displayArtistSongs = function displayArtistSongs(song) {
  $('.songs-index-table').append("\n    <tr class=\"song-table-row\">\n      <td class=\"song-cell\"><button class=\"song-row song-fav-btn\" type=\"button\">Favorite</button></td>\n      <td class=\"song-cell\" id=\"song-cell-title-\">".concat(song.title, "</td>\n      <td class=\"song-cell\" id=\"song-cell-artist\">").concat(song.artist, "</td>\n      <td class=\"song-cell\" id=\"song-cell-genre\">").concat(song.genre, "</td>\n      <td class=\"song-cell\" id=\"song-cell-rating\">").concat(song.rating, "</td>\n    </tr>"));
};

var postFavorite = function postFavorite(songData) {
  fetch('https://api-play.herokuapp.com/api/v1/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: songData[3].innerText,
      artist: songData[5].innerText,
      genre: songData[7].innerText,
      rating: songData[9].innerText
    })
  });
};

var postPlaylist = function postPlaylist(playlistData) {
  fetch('https://api-play.herokuapp.com/api/v1/playlists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: playlistData
    })
  });
};

var postPlaylistSong = function postPlaylistSong(playlist, song) {
  fetch("https://api-play.herokuapp.com/api/v1/playlists/".concat(playlist, "/songs/").concat(song), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

var getFavoriteSongs = function getFavoriteSongs() {
  fetch('https://api-play.herokuapp.com/api/v1/favorites').then(function (response) {
    return response.json();
  }).then(function (songsData) {
    return compileFavoriteSongs(songsData);
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var compileFavoriteSongs = function compileFavoriteSongs(songsData) {
  songsData.forEach(function (song) {
    displayFavoriteSongs(song);
  });
  getPlaylistsDropdown();
  $(".add-song-button").on("click", function (event) {
    var playlist = event.currentTarget.parentElement.parentElement.children[0].children[0].value;
    var songId = event.currentTarget.parentElement.parentElement.children[2].innerText;
    postPlaylistSong(playlist, songId);
  });
};

var displayFavoriteSongs = function displayFavoriteSongs(song) {
  $('.favorites-index-table').append("\n    <tr class=\"favorites-table-row\">\n      <td class=\"song-cell\"><select class=\"fav-dropdown\"><select></td>\n      <td class=\"song-cell\"><button class=\"song-row song-fav-btn add-song-button\" type=\"button\">Add To Playlist</button></td>\n      <td class=\"song-cell\" id=\"song-cell-id\" style=\"display:none\">".concat(song.id, "</td>\n      <td class=\"song-cell\" id=\"song-cell-title-\">").concat(song.title, "</td>\n      <td class=\"song-cell\" id=\"song-cell-artist\">").concat(song.artist, "</td>\n      <td class=\"song-cell\" id=\"song-cell-genre\">").concat(song.genre, "</td>\n      <td class=\"song-cell\" id=\"song-cell-rating\">").concat(song.rating, "</td>\n    </tr>"));
};

var getPlaylistsDropdown = function getPlaylistsDropdown() {
  fetch('https://api-play.herokuapp.com/api/v1/playlists').then(function (response) {
    return response.json();
  }).then(function (playlistsData) {
    return compilePlaylistsDropdown(playlistsData);
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var compilePlaylistsDropdown = function compilePlaylistsDropdown(playlistsData) {
  playlistsData.forEach(function (playlist) {
    fillPlaylistDropdown(playlist);
  });
};

var fillPlaylistDropdown = function fillPlaylistDropdown(playlist) {
  $(".fav-dropdown").append("\n    <option id=\"".concat(playlist.id, "\" value='").concat(playlist.id, "'>").concat(playlist.playlist_name, "</option>\n    "));
};

var getPlaylists = function getPlaylists() {
  fetch('https://api-play.herokuapp.com/api/v1/playlists').then(function (response) {
    return response.json();
  }).then(function (playlistsData) {
    return compilePlaylists(playlistsData);
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var compilePlaylists = function compilePlaylists(playlistsData) {
  playlistsData.forEach(function (playlist) {
    displayPlaylists(playlist);
  });
  $(".playlist-title-link").on("click", function (event) {
    getSinglePlaylist(event.currentTarget.parentElement.parentElement.children[0].innerText);
    $(".single-playlist-container").slideDown(500);
  });
};

var displayPlaylists = function displayPlaylists(playlist) {
  $('.playlists-index-table').append("\n    <tr class=\"playlists-table-row\">\n      <td class=\"song-cell\" id=\"song-cell-id\">".concat(playlist.id, "</td>\n      <td class=\"song-cell\" id=\"song-cell-title\"><button class=\"playlist-title-link\">").concat(playlist.playlist_name, "</button></td>\n    </tr>"));
};

var getSinglePlaylist = function getSinglePlaylist(id) {
  fetch("https://api-play.herokuapp.com/api/v1/playlists/".concat(id, "/songs")).then(function (response) {
    return response.json();
  }).then(function (songsData) {
    return compileSinglePlaylist(songsData);
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var compileSinglePlaylist = function compileSinglePlaylist(playlistsData) {
  playlistsData['songs'].forEach(function (song) {
    displaySinglePlaylistSongs(song);
  });
  $(".single-playlist-container").slideDown(500);
};

var displaySinglePlaylistSongs = function displaySinglePlaylistSongs(song) {
  $('.playlist-show-table').append("\n    <tr class=\"playlist-table-row\">\n      <td class=\"song-cell\" id=\"song-cell-id\" style=\"display:none\">".concat(song.id, "</td>\n      <td class=\"song-cell\" id=\"song-cell-title-\">").concat(song.title, "</td>\n      <td class=\"song-cell\" id=\"song-cell-artist\">").concat(song.artist, "</td>\n      <td class=\"song-cell\" id=\"song-cell-genre\">").concat(song.genre, "</td>\n      <td class=\"song-cell\" id=\"song-cell-rating\">").concat(song.rating, "</td>\n    </tr>"));
};

var getPlaylistSongs = function getPlaylistSongs(playlistData) {
  fetch("https://api-play.herokuapp.com/api/v1/playlists/".concat(playlistData.id, "/songs")).then(function (response) {
    return response.json();
  }).then(function (playlistData) {
    return compilePlaylistSongs(playlistData.songs);
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var compilePlaylistSongs = function compilePlaylistSongs(songs) {
  songs.forEach(function (song) {
    displayPlaylistSongs(song);
  });
};

var displayPlaylistSongs = function displayPlaylistSongs(song) {
  $('.playlist-show-table').append("\n    <tr class=\"playlists-table-row\">\n      <td class=\"song-cell\" id=\"song-cell-title-\">".concat(song.title, "</td>\n      <td class=\"song-cell\" id=\"song-cell-artist\">").concat(song.artist, "</td>\n      <td class=\"song-cell\" id=\"song-cell-genre\">").concat(song.genre, "</td>\n      <td class=\"song-cell\" id=\"song-cell-rating\">").concat(song.rating, "</td>\n    </tr>"));
};

$(".search-button").on("click", function () {
  var q = $(".search-nav-input").val();
  getArtistSongs(q);
  $(".search-nav-input").val("");
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.favorites-container').slideUp(900);
  $('.songs-container').slideDown(600);
  $(".playlists-container").hide(500);
});
$('.search-nav-input').keypress(function (e) {
  var key = e.which;

  if (key == 13) {
    $('#search-nav-button').click();
    return false;
  }
});
$("#search-container-button").on("click", function () {
  var q = $(".search-container-input").val();
  getArtistSongs(q);
  $(".search-container-input").val("");
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.favorites-container').slideUp(900);
  $('.songs-container').slideDown(600);
  $(".playlists-container").hide(500);
});
$('.search-container-input').keypress(function (e) {
  var key = e.which;

  if (key == 13) {
    $('#search-container-button').click();
    return false;
  }
});
$(".span-title").on("click", function () {
  $(".search-container-input").val("");
  $(".search-nav-input").val("");
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
  $(".favorites-table-row").remove();
  $('.favorites-container').hide(500);
  $(".playlists-container").hide(500);
});
$(".fas-nav").on("click", function () {
  $(".search-container-input").val("");
  $(".search-nav-input").val("");
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
  $(".playlists-container").hide(500);
});
$(".songs-container").on("click", ".song-fav-btn", function () {
  var songData = this.parentElement.parentElement.childNodes;
  postFavorite(songData);
});
$("#nav-fav-btn").on("click", function () {
  $(".favorites-table-row").remove();
  getFavoriteSongs();
  $(".search-container-input").val("");
  $(".search-nav-input").val("");
  $(".search-container").hide(500);
  $(".songs-container").hide(500);
  $(".favorites-container").slideDown(900);
  $(".playlists-container").hide();
});
$("#nav-playlist-btn").on("click", function () {
  getPlaylists();
  $(".search-container-input").val("");
  $(".search-nav-input").val("");
  $(".search-container").hide(500);
  $(".songs-container").hide(500);
  $(".favorites-container").hide(900);
  $(".playlists-container").slideDown(500);
});
$("#create-new-playlist").on("click", function () {
  $("#create-new-playlist").slideUp(900);
  $(".playlist-name-input").slideDown(500);
  $("#create-button").slideDown(500);
  $("#cancel-button").slideDown(500);
});
$("#create-button").on("click", function () {
  var name = $(".playlist-name-input").val();
  postPlaylist(name);
  $(".playlist-name-input").val("");
});
$("#cancel-button").on("click", function () {
  $("#create-new-playlist").slideDown(900);
  $(".playlist-name-input").hide(500);
  $(".playlist-name-input").val("");
  $("#create-button").hide(500);
  $("#cancel-button").hide(500);
});
$("#playlist-back").on("click", function () {
  $(".single-playlist-container").hide();
  $(".playlists-container").slideDown(500);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGlzdFNvbmdzIiwicSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcnNlZFJlc3BvbnNlIiwiY29tcGlsZUFydGlzdFNvbmdzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJhcnRpc3REYXRhIiwiZm9yRWFjaCIsInNvbmciLCJkaXNwbGF5QXJ0aXN0U29uZ3MiLCIkIiwiYXBwZW5kIiwidGl0bGUiLCJhcnRpc3QiLCJnZW5yZSIsInJhdGluZyIsInBvc3RGYXZvcml0ZSIsInNvbmdEYXRhIiwiaW5uZXJUZXh0IiwicG9zdFBsYXlsaXN0IiwicGxheWxpc3REYXRhIiwibmFtZSIsInBvc3RQbGF5bGlzdFNvbmciLCJwbGF5bGlzdCIsImdldEZhdm9yaXRlU29uZ3MiLCJzb25nc0RhdGEiLCJjb21waWxlRmF2b3JpdGVTb25ncyIsImRpc3BsYXlGYXZvcml0ZVNvbmdzIiwiZ2V0UGxheWxpc3RzRHJvcGRvd24iLCJvbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJjaGlsZHJlbiIsInZhbHVlIiwic29uZ0lkIiwiaWQiLCJwbGF5bGlzdHNEYXRhIiwiY29tcGlsZVBsYXlsaXN0c0Ryb3Bkb3duIiwiZmlsbFBsYXlsaXN0RHJvcGRvd24iLCJwbGF5bGlzdF9uYW1lIiwiZ2V0UGxheWxpc3RzIiwiY29tcGlsZVBsYXlsaXN0cyIsImRpc3BsYXlQbGF5bGlzdHMiLCJnZXRTaW5nbGVQbGF5bGlzdCIsInNsaWRlRG93biIsImNvbXBpbGVTaW5nbGVQbGF5bGlzdCIsImRpc3BsYXlTaW5nbGVQbGF5bGlzdFNvbmdzIiwiZ2V0UGxheWxpc3RTb25ncyIsImNvbXBpbGVQbGF5bGlzdFNvbmdzIiwic29uZ3MiLCJkaXNwbGF5UGxheWxpc3RTb25ncyIsInZhbCIsInJlbW92ZSIsInNsaWRlVXAiLCJoaWRlIiwia2V5cHJlc3MiLCJlIiwia2V5Iiwid2hpY2giLCJjbGljayIsImNoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLENBQUQsRUFBTztBQUM1QkMsT0FBSyxpREFBaUQ7QUFDcERDLFVBQU0sRUFBRSxNQUQ0QztBQUVwREMsV0FBTyxFQUFFO0FBQ1Asc0JBQWdCO0FBRFQsS0FGMkM7QUFLcERDLFFBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbkIsZ0JBQVVOO0FBRFMsS0FBZjtBQUw4QyxHQUFqRCxDQUFMLENBU0dPLElBVEgsQ0FTUSxVQUFBQyxRQUFRO0FBQUEsV0FBSUEsUUFBUSxDQUFDQyxJQUFULEVBQUo7QUFBQSxHQVRoQixFQVVH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bnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9saWIvaW5kZXguanNcIik7XG4iLCJjb25zdCBnZXRBcnRpc3RTb25ncyA9IChxKSA9PiB7XG4gIGZldGNoKGBodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3NlYXJjaGAsIHtcbiAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAnYXJ0aXN0JzogcVxuICAgIH0pXG4gIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKHBhcnNlZFJlc3BvbnNlID0+IGNvbXBpbGVBcnRpc3RTb25ncyhwYXJzZWRSZXNwb25zZSkpXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoeyBlcnJvciB9KSk7XG59XG5cbmNvbnN0IGNvbXBpbGVBcnRpc3RTb25ncyA9IChhcnRpc3REYXRhKSA9PiB7XG4gIGFydGlzdERhdGEuZm9yRWFjaChzb25nID0+IHtcbiAgICBkaXNwbGF5QXJ0aXN0U29uZ3Moc29uZyk7XG4gIH0pO1xufVxuXG5jb25zdCBkaXNwbGF5QXJ0aXN0U29uZ3MgPSAoc29uZykgPT4ge1xuICAkKCcuc29uZ3MtaW5kZXgtdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cInNvbmctdGFibGUtcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIj48YnV0dG9uIGNsYXNzPVwic29uZy1yb3cgc29uZy1mYXYtYnRuXCIgdHlwZT1cImJ1dHRvblwiPkZhdm9yaXRlPC9idXR0b24+PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXRpdGxlLVwiPiR7c29uZy50aXRsZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtYXJ0aXN0XCI+JHtzb25nLmFydGlzdH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtZ2VucmVcIj4ke3NvbmcuZ2VucmV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXJhdGluZ1wiPiR7c29uZy5yYXRpbmd9PC90ZD5cbiAgICA8L3RyPmApXG59XG5cbmNvbnN0IHBvc3RGYXZvcml0ZSA9IChzb25nRGF0YSkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9zb25ncycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB0aXRsZTogc29uZ0RhdGFbM10uaW5uZXJUZXh0LFxuICAgICAgYXJ0aXN0OiBzb25nRGF0YVs1XS5pbm5lclRleHQsXG4gICAgICBnZW5yZTogc29uZ0RhdGFbN10uaW5uZXJUZXh0LFxuICAgICAgcmF0aW5nOiBzb25nRGF0YVs5XS5pbm5lclRleHRcbiAgICB9KVxuICB9KTtcbn1cblxuY29uc3QgcG9zdFBsYXlsaXN0ID0gKHBsYXlsaXN0RGF0YSkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogcGxheWxpc3REYXRhXG4gICAgfSlcbiAgfSk7XG59XG5cbmNvbnN0IHBvc3RQbGF5bGlzdFNvbmcgPSAocGxheWxpc3QsIHNvbmcpID0+IHtcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGxheWxpc3RzLyR7cGxheWxpc3R9L3NvbmdzLyR7c29uZ31gLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbiAgfSk7XG59XG5cbmNvbnN0IGdldEZhdm9yaXRlU29uZ3MgPSAoKSA9PiB7XG4gIGZldGNoKCdodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL2Zhdm9yaXRlcycpXG4gIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAudGhlbigoc29uZ3NEYXRhKSA9PiBjb21waWxlRmF2b3JpdGVTb25ncyhzb25nc0RhdGEpKVxuICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkpO1xufVxuXG5jb25zdCBjb21waWxlRmF2b3JpdGVTb25ncyA9IChzb25nc0RhdGEpID0+IHtcbiAgc29uZ3NEYXRhLmZvckVhY2goc29uZyA9PiB7XG4gICAgZGlzcGxheUZhdm9yaXRlU29uZ3Moc29uZyk7XG4gIH0pO1xuICBnZXRQbGF5bGlzdHNEcm9wZG93bigpO1xuICAkKFwiLmFkZC1zb25nLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIHZhciBwbGF5bGlzdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnZhbHVlXG4gICAgdmFyIHNvbmdJZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmlubmVyVGV4dFxuICAgIHBvc3RQbGF5bGlzdFNvbmcocGxheWxpc3QsIHNvbmdJZCk7XG4gIH0pXG59XG5cbmNvbnN0IGRpc3BsYXlGYXZvcml0ZVNvbmdzID0gKHNvbmcpID0+IHtcbiAgJCgnLmZhdm9yaXRlcy1pbmRleC10YWJsZScpLmFwcGVuZChgXG4gICAgPHRyIGNsYXNzPVwiZmF2b3JpdGVzLXRhYmxlLXJvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCI+PHNlbGVjdCBjbGFzcz1cImZhdi1kcm9wZG93blwiPjxzZWxlY3Q+PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiPjxidXR0b24gY2xhc3M9XCJzb25nLXJvdyBzb25nLWZhdi1idG4gYWRkLXNvbmctYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPkFkZCBUbyBQbGF5bGlzdDwvYnV0dG9uPjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1pZFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JHtzb25nLmlkfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZS1cIj4ke3NvbmcudGl0bGV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWFydGlzdFwiPiR7c29uZy5hcnRpc3R9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWdlbnJlXCI+JHtzb25nLmdlbnJlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1yYXRpbmdcIj4ke3NvbmcucmF0aW5nfTwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG5jb25zdCBnZXRQbGF5bGlzdHNEcm9wZG93biA9ICgpID0+IHtcbiAgZmV0Y2goJ2h0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGxheWxpc3RzJylcbiAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKChwbGF5bGlzdHNEYXRhKSA9PiBjb21waWxlUGxheWxpc3RzRHJvcGRvd24ocGxheWxpc3RzRGF0YSkpXG4gIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoeyBlcnJvciB9KSk7XG59XG5cbmNvbnN0IGNvbXBpbGVQbGF5bGlzdHNEcm9wZG93biA9IChwbGF5bGlzdHNEYXRhKSA9PiB7XG4gIHBsYXlsaXN0c0RhdGEuZm9yRWFjaChwbGF5bGlzdCA9PiB7XG4gICAgZmlsbFBsYXlsaXN0RHJvcGRvd24ocGxheWxpc3QpO1xuICB9KTtcbn1cblxuY29uc3QgZmlsbFBsYXlsaXN0RHJvcGRvd24gPSAocGxheWxpc3QpID0+IHtcbiAgJChcIi5mYXYtZHJvcGRvd25cIikuYXBwZW5kKGBcbiAgICA8b3B0aW9uIGlkPVwiJHtwbGF5bGlzdC5pZH1cIiB2YWx1ZT0nJHtwbGF5bGlzdC5pZH0nPiR7cGxheWxpc3QucGxheWxpc3RfbmFtZX08L29wdGlvbj5cbiAgICBgKVxufVxuXG5jb25zdCBnZXRQbGF5bGlzdHMgPSAoKSA9PiB7XG4gIGZldGNoKCdodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cycpXG4gIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAudGhlbigocGxheWxpc3RzRGF0YSkgPT4ge1xuICAgIHJldHVybiBjb21waWxlUGxheWxpc3RzKHBsYXlsaXN0c0RhdGEpXG4gIH0pXG4gIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoeyBlcnJvciB9KSk7XG59XG5cbmNvbnN0IGNvbXBpbGVQbGF5bGlzdHMgPSAocGxheWxpc3RzRGF0YSkgPT4ge1xuICBwbGF5bGlzdHNEYXRhLmZvckVhY2gocGxheWxpc3QgPT4ge1xuICAgIGRpc3BsYXlQbGF5bGlzdHMocGxheWxpc3QpO1xuICB9KTtcbiAgJChcIi5wbGF5bGlzdC10aXRsZS1saW5rXCIpLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZ2V0U2luZ2xlUGxheWxpc3QoZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uaW5uZXJUZXh0KTtcbiAgICAkKFwiLnNpbmdsZS1wbGF5bGlzdC1jb250YWluZXJcIikuc2xpZGVEb3duKDUwMCk7XG4gIH0pXG59XG5cbmNvbnN0IGRpc3BsYXlQbGF5bGlzdHMgPSAocGxheWxpc3QpID0+IHtcbiAgJCgnLnBsYXlsaXN0cy1pbmRleC10YWJsZScpLmFwcGVuZChgXG4gICAgPHRyIGNsYXNzPVwicGxheWxpc3RzLXRhYmxlLXJvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtaWRcIj4ke3BsYXlsaXN0LmlkfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZVwiPjxidXR0b24gY2xhc3M9XCJwbGF5bGlzdC10aXRsZS1saW5rXCI+JHtwbGF5bGlzdC5wbGF5bGlzdF9uYW1lfTwvYnV0dG9uPjwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG5jb25zdCBnZXRTaW5nbGVQbGF5bGlzdCA9IChpZCkgPT4ge1xuICBmZXRjaChgaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHMvJHtpZH0vc29uZ3NgKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHNvbmdzRGF0YSkgPT4ge1xuICAgIHJldHVybiBjb21waWxlU2luZ2xlUGxheWxpc3Qoc29uZ3NEYXRhKVxuICB9KVxuICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkpO1xufVxuXG5jb25zdCBjb21waWxlU2luZ2xlUGxheWxpc3QgPSAocGxheWxpc3RzRGF0YSkgPT4ge1xuICBwbGF5bGlzdHNEYXRhWydzb25ncyddLmZvckVhY2goc29uZyA9PiB7XG4gICAgZGlzcGxheVNpbmdsZVBsYXlsaXN0U29uZ3Moc29uZylcbiAgfSlcbiAgICAkKFwiLnNpbmdsZS1wbGF5bGlzdC1jb250YWluZXJcIikuc2xpZGVEb3duKDUwMCk7XG59XG5cbmNvbnN0IGRpc3BsYXlTaW5nbGVQbGF5bGlzdFNvbmdzID0gKHNvbmcpID0+IHtcbiAgJCgnLnBsYXlsaXN0LXNob3ctdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cInBsYXlsaXN0LXRhYmxlLXJvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtaWRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPiR7c29uZy5pZH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtdGl0bGUtXCI+JHtzb25nLnRpdGxlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1hcnRpc3RcIj4ke3NvbmcuYXJ0aXN0fTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1nZW5yZVwiPiR7c29uZy5nZW5yZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtcmF0aW5nXCI+JHtzb25nLnJhdGluZ308L3RkPlxuICAgIDwvdHI+YClcbn1cblxuXG5jb25zdCBnZXRQbGF5bGlzdFNvbmdzID0gKHBsYXlsaXN0RGF0YSkgPT4ge1xuICBmZXRjaChgaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHMvJHtwbGF5bGlzdERhdGEuaWR9L3NvbmdzYClcbiAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKChwbGF5bGlzdERhdGEpID0+IGNvbXBpbGVQbGF5bGlzdFNvbmdzKHBsYXlsaXN0RGF0YS5zb25ncykpXG4gIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoeyBlcnJvciB9KSk7XG59XG5cbmNvbnN0IGNvbXBpbGVQbGF5bGlzdFNvbmdzID0gKHNvbmdzKSA9PiB7XG4gIHNvbmdzLmZvckVhY2goc29uZyA9PiB7XG4gICAgZGlzcGxheVBsYXlsaXN0U29uZ3Moc29uZyk7XG4gIH0pO1xufVxuXG5jb25zdCBkaXNwbGF5UGxheWxpc3RTb25ncyA9IChzb25nKSA9PiB7XG4gICQoJy5wbGF5bGlzdC1zaG93LXRhYmxlJykuYXBwZW5kKGBcbiAgICA8dHIgY2xhc3M9XCJwbGF5bGlzdHMtdGFibGUtcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZS1cIj4ke3NvbmcudGl0bGV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWFydGlzdFwiPiR7c29uZy5hcnRpc3R9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWdlbnJlXCI+JHtzb25nLmdlbnJlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1yYXRpbmdcIj4ke3NvbmcucmF0aW5nfTwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG4kKFwiLnNlYXJjaC1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gIHZhciBxID0gJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbCgpXG4gIGdldEFydGlzdFNvbmdzKHEpO1xuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zb25nLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLmZhdm9yaXRlcy1jb250YWluZXInKS5zbGlkZVVwKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5zbGlkZURvd24oNjAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoJy5zZWFyY2gtbmF2LWlucHV0Jykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiB2YXIga2V5ID0gZS53aGljaDtcbiBpZihrZXkgPT0gMTMpXG4gIHtcbiAgICAkKCcjc2VhcmNoLW5hdi1idXR0b24nKS5jbGljaygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSk7XG5cbiQoXCIjc2VhcmNoLWNvbnRhaW5lci1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gIHZhciBxID0gJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbCgpO1xuICBnZXRBcnRpc3RTb25ncyhxKTtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKCcuc29uZy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJCgnLnNlYXJjaC1jb250YWluZXInKS5zbGlkZVVwKDkwMCk7XG4gICQoJy5mYXZvcml0ZXMtY29udGFpbmVyJykuc2xpZGVVcCg5MDApO1xuICAkKCcuc29uZ3MtY29udGFpbmVyJykuc2xpZGVEb3duKDYwMCk7XG4gICQoXCIucGxheWxpc3RzLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG59KVxuXG4kKCcuc2VhcmNoLWNvbnRhaW5lci1pbnB1dCcpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XG4gdmFyIGtleSA9IGUud2hpY2g7XG4gaWYoa2V5ID09IDEzKVxuICB7XG4gICAgJCgnI3NlYXJjaC1jb250YWluZXItYnV0dG9uJykuY2xpY2soKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pO1xuXG4kKFwiLnNwYW4tdGl0bGVcIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lci1pbnB1dFwiKS52YWwoXCJcIilcbiAgJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbChcIlwiKVxuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlRG93big5MDApO1xuICAkKCcuc29uZ3MtY29udGFpbmVyJykuaGlkZSg1MDApO1xuICAkKCcuc29uZ3MtdGFibGUtcm93JykucmVtb3ZlKCk7XG4gICQoXCIuZmF2b3JpdGVzLXRhYmxlLXJvd1wiKS5yZW1vdmUoKTtcbiAgJCgnLmZhdm9yaXRlcy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoXCIucGxheWxpc3RzLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG59KVxuXG4kKFwiLmZhcy1uYXZcIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lci1pbnB1dFwiKS52YWwoXCJcIilcbiAgJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbChcIlwiKVxuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlRG93big5MDApO1xuICAkKCcuc29uZ3MtY29udGFpbmVyJykuaGlkZSg1MDApO1xuICAkKCcuc29uZ3MtdGFibGUtcm93JykucmVtb3ZlKCk7XG4gICQoXCIucGxheWxpc3RzLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG59KVxuXG4kKFwiLnNvbmdzLWNvbnRhaW5lclwiKS5vbihcImNsaWNrXCIsIFwiLnNvbmctZmF2LWJ0blwiLCBmdW5jdGlvbigpIHtcbiAgdmFyIHNvbmdEYXRhID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1xuICBwb3N0RmF2b3JpdGUoc29uZ0RhdGEpO1xufSlcblxuJChcIiNuYXYtZmF2LWJ0blwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5mYXZvcml0ZXMtdGFibGUtcm93XCIpLnJlbW92ZSgpO1xuICBnZXRGYXZvcml0ZVNvbmdzKCk7XG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lci1pbnB1dFwiKS52YWwoXCJcIilcbiAgJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1jb250YWluZXJcIikuaGlkZSg1MDApO1xuICAkKFwiLnNvbmdzLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG4gICQoXCIuZmF2b3JpdGVzLWNvbnRhaW5lclwiKS5zbGlkZURvd24oOTAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoKTtcbn0pXG5cbiQoXCIjbmF2LXBsYXlsaXN0LWJ0blwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgZ2V0UGxheWxpc3RzKCk7XG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lci1pbnB1dFwiKS52YWwoXCJcIilcbiAgJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1jb250YWluZXJcIikuaGlkZSg1MDApO1xuICAkKFwiLnNvbmdzLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG4gICQoXCIuZmF2b3JpdGVzLWNvbnRhaW5lclwiKS5oaWRlKDkwMCk7XG4gICQoXCIucGxheWxpc3RzLWNvbnRhaW5lclwiKS5zbGlkZURvd24oNTAwKTtcbn0pXG5cbiQoXCIjY3JlYXRlLW5ldy1wbGF5bGlzdFwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIiNjcmVhdGUtbmV3LXBsYXlsaXN0XCIpLnNsaWRlVXAoOTAwKTtcbiAgJChcIi5wbGF5bGlzdC1uYW1lLWlucHV0XCIpLnNsaWRlRG93big1MDApO1xuICAkKFwiI2NyZWF0ZS1idXR0b25cIikuc2xpZGVEb3duKDUwMCk7XG4gICQoXCIjY2FuY2VsLWJ1dHRvblwiKS5zbGlkZURvd24oNTAwKTtcbn0pXG5cbiQoXCIjY3JlYXRlLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgdmFyIG5hbWUgPSAkKFwiLnBsYXlsaXN0LW5hbWUtaW5wdXRcIikudmFsKClcbiAgcG9zdFBsYXlsaXN0KG5hbWUpO1xuICAkKFwiLnBsYXlsaXN0LW5hbWUtaW5wdXRcIikudmFsKFwiXCIpO1xufSlcblxuJChcIiNjYW5jZWwtYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiI2NyZWF0ZS1uZXctcGxheWxpc3RcIikuc2xpZGVEb3duKDkwMCk7XG4gICQoXCIucGxheWxpc3QtbmFtZS1pbnB1dFwiKS5oaWRlKDUwMCk7XG4gICQoXCIucGxheWxpc3QtbmFtZS1pbnB1dFwiKS52YWwoXCJcIik7XG4gICQoXCIjY3JlYXRlLWJ1dHRvblwiKS5oaWRlKDUwMCk7XG4gICQoXCIjY2FuY2VsLWJ1dHRvblwiKS5oaWRlKDUwMCk7XG59KVxuXG4kKFwiI3BsYXlsaXN0LWJhY2tcIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICQoXCIuc2luZ2xlLXBsYXlsaXN0LWNvbnRhaW5lclwiKS5oaWRlKCk7XG4gICQoXCIucGxheWxpc3RzLWNvbnRhaW5lclwiKS5zbGlkZURvd24oNTAwKTtcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9