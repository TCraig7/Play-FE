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
  debugger;
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
  debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGlzdFNvbmdzIiwicSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcnNlZFJlc3BvbnNlIiwiY29tcGlsZUFydGlzdFNvbmdzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJhcnRpc3REYXRhIiwiZm9yRWFjaCIsInNvbmciLCJkaXNwbGF5QXJ0aXN0U29uZ3MiLCIkIiwiYXBwZW5kIiwidGl0bGUiLCJhcnRpc3QiLCJnZW5yZSIsInJhdGluZyIsInBvc3RGYXZvcml0ZSIsInNvbmdEYXRhIiwiaW5uZXJUZXh0IiwicG9zdFBsYXlsaXN0IiwicGxheWxpc3REYXRhIiwibmFtZSIsInBvc3RQbGF5bGlzdFNvbmciLCJwbGF5bGlzdCIsImdldEZhdm9yaXRlU29uZ3MiLCJzb25nc0RhdGEiLCJjb21waWxlRmF2b3JpdGVTb25ncyIsImRpc3BsYXlGYXZvcml0ZVNvbmdzIiwiZ2V0UGxheWxpc3RzRHJvcGRvd24iLCJvbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJjaGlsZHJlbiIsInZhbHVlIiwic29uZ0lkIiwiaWQiLCJwbGF5bGlzdHNEYXRhIiwiY29tcGlsZVBsYXlsaXN0c0Ryb3Bkb3duIiwiZmlsbFBsYXlsaXN0RHJvcGRvd24iLCJwbGF5bGlzdF9uYW1lIiwiZ2V0UGxheWxpc3RzIiwiY29tcGlsZVBsYXlsaXN0cyIsImRpc3BsYXlQbGF5bGlzdHMiLCJnZXRTaW5nbGVQbGF5bGlzdCIsInNsaWRlRG93biIsImNvbXBpbGVTaW5nbGVQbGF5bGlzdCIsImRpc3BsYXlTaW5nbGVQbGF5bGlzdFNvbmdzIiwiZ2V0UGxheWxpc3RTb25ncyIsImNvbXBpbGVQbGF5bGlzdFNvbmdzIiwic29uZ3MiLCJkaXNwbGF5UGxheWxpc3RTb25ncyIsInZhbCIsInJlbW92ZSIsInNsaWRlVXAiLCJoaWRlIiwia2V5cHJlc3MiLCJlIiwia2V5Iiwid2hpY2giLCJjbGljayIsImNoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLENBQUQsRUFBTztBQUM1QkMsT0FBSyxpREFBaUQ7QUFDcERDLFVBQU0sRUFBRSxNQUQ0QztBQUVwREMsV0FBTyxFQUFFO0FBQ1Asc0JBQWdCO0FBRFQsS0FGMkM7QUFLcERDLFFBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbkIsZ0JBQVVOO0FBRFMsS0FBZjtBQUw4QyxHQUFqRCxDQUFMLENBU0dPLElBVEgsQ0FTUSxVQUFBQyxRQUFRO0FBQUEsV0FBSUEsUUFBUSxDQUFDQyxJQUFULEVBQUo7QUFBQSxHQVRoQixFQVVH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dXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbGliL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgZ2V0QXJ0aXN0U29uZ3MgPSAocSkgPT4ge1xuICBmZXRjaChgaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9zZWFyY2hgLCB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgJ2FydGlzdCc6IHFcbiAgICB9KVxuICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiBjb21waWxlQXJ0aXN0U29uZ3MocGFyc2VkUmVzcG9uc2UpKVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkpO1xufVxuXG5jb25zdCBjb21waWxlQXJ0aXN0U29uZ3MgPSAoYXJ0aXN0RGF0YSkgPT4ge1xuICBhcnRpc3REYXRhLmZvckVhY2goc29uZyA9PiB7XG4gICAgZGlzcGxheUFydGlzdFNvbmdzKHNvbmcpO1xuICB9KTtcbn1cblxuY29uc3QgZGlzcGxheUFydGlzdFNvbmdzID0gKHNvbmcpID0+IHtcbiAgJCgnLnNvbmdzLWluZGV4LXRhYmxlJykuYXBwZW5kKGBcbiAgICA8dHIgY2xhc3M9XCJzb25nLXRhYmxlLXJvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCI+PGJ1dHRvbiBjbGFzcz1cInNvbmctcm93IHNvbmctZmF2LWJ0blwiIHR5cGU9XCJidXR0b25cIj5GYXZvcml0ZTwvYnV0dG9uPjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZS1cIj4ke3NvbmcudGl0bGV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWFydGlzdFwiPiR7c29uZy5hcnRpc3R9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWdlbnJlXCI+JHtzb25nLmdlbnJlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1yYXRpbmdcIj4ke3NvbmcucmF0aW5nfTwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG5jb25zdCBwb3N0RmF2b3JpdGUgPSAoc29uZ0RhdGEpID0+IHtcbiAgZmV0Y2goJ2h0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvc29uZ3MnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgdGl0bGU6IHNvbmdEYXRhWzNdLmlubmVyVGV4dCxcbiAgICAgIGFydGlzdDogc29uZ0RhdGFbNV0uaW5uZXJUZXh0LFxuICAgICAgZ2VucmU6IHNvbmdEYXRhWzddLmlubmVyVGV4dCxcbiAgICAgIHJhdGluZzogc29uZ0RhdGFbOV0uaW5uZXJUZXh0XG4gICAgfSlcbiAgfSk7XG59XG5cbmNvbnN0IHBvc3RQbGF5bGlzdCA9IChwbGF5bGlzdERhdGEpID0+IHtcbiAgZmV0Y2goJ2h0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGxheWxpc3RzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IHBsYXlsaXN0RGF0YVxuICAgIH0pXG4gIH0pO1xufVxuXG5jb25zdCBwb3N0UGxheWxpc3RTb25nID0gKHBsYXlsaXN0LCBzb25nKSA9PiB7XG4gIGRlYnVnZ2VyXG4gIGZldGNoKGBodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cy8ke3BsYXlsaXN0fS9zb25ncy8ke3Nvbmd9YCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG4gIH0pO1xufVxuXG5jb25zdCBnZXRGYXZvcml0ZVNvbmdzID0gKCkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9mYXZvcml0ZXMnKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHNvbmdzRGF0YSkgPT4gY29tcGlsZUZhdm9yaXRlU29uZ3Moc29uZ3NEYXRhKSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZUZhdm9yaXRlU29uZ3MgPSAoc29uZ3NEYXRhKSA9PiB7XG4gIHNvbmdzRGF0YS5mb3JFYWNoKHNvbmcgPT4ge1xuICAgIGRpc3BsYXlGYXZvcml0ZVNvbmdzKHNvbmcpO1xuICB9KTtcbiAgZ2V0UGxheWxpc3RzRHJvcGRvd24oKTtcbiAgJChcIi5hZGQtc29uZy1idXR0b25cIikub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICB2YXIgcGxheWxpc3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS52YWx1ZVxuICAgIHZhciBzb25nSWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5pbm5lclRleHRcbiAgICBwb3N0UGxheWxpc3RTb25nKHBsYXlsaXN0LCBzb25nSWQpO1xuICB9KVxufVxuXG5jb25zdCBkaXNwbGF5RmF2b3JpdGVTb25ncyA9IChzb25nKSA9PiB7XG4gICQoJy5mYXZvcml0ZXMtaW5kZXgtdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cImZhdm9yaXRlcy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiPjxzZWxlY3QgY2xhc3M9XCJmYXYtZHJvcGRvd25cIj48c2VsZWN0PjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIj48YnV0dG9uIGNsYXNzPVwic29uZy1yb3cgc29uZy1mYXYtYnRuIGFkZC1zb25nLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj5BZGQgVG8gUGxheWxpc3Q8L2J1dHRvbj48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtaWRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPiR7c29uZy5pZH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtdGl0bGUtXCI+JHtzb25nLnRpdGxlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1hcnRpc3RcIj4ke3NvbmcuYXJ0aXN0fTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1nZW5yZVwiPiR7c29uZy5nZW5yZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtcmF0aW5nXCI+JHtzb25nLnJhdGluZ308L3RkPlxuICAgIDwvdHI+YClcbn1cblxuY29uc3QgZ2V0UGxheWxpc3RzRHJvcGRvd24gPSAoKSA9PiB7XG4gIGZldGNoKCdodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cycpXG4gIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAudGhlbigocGxheWxpc3RzRGF0YSkgPT4gY29tcGlsZVBsYXlsaXN0c0Ryb3Bkb3duKHBsYXlsaXN0c0RhdGEpKVxuICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkpO1xufVxuXG5jb25zdCBjb21waWxlUGxheWxpc3RzRHJvcGRvd24gPSAocGxheWxpc3RzRGF0YSkgPT4ge1xuICBwbGF5bGlzdHNEYXRhLmZvckVhY2gocGxheWxpc3QgPT4ge1xuICAgIGZpbGxQbGF5bGlzdERyb3Bkb3duKHBsYXlsaXN0KTtcbiAgfSk7XG59XG5cbmNvbnN0IGZpbGxQbGF5bGlzdERyb3Bkb3duID0gKHBsYXlsaXN0KSA9PiB7XG4gICQoXCIuZmF2LWRyb3Bkb3duXCIpLmFwcGVuZChgXG4gICAgPG9wdGlvbiBpZD1cIiR7cGxheWxpc3QuaWR9XCIgdmFsdWU9JyR7cGxheWxpc3QuaWR9Jz4ke3BsYXlsaXN0LnBsYXlsaXN0X25hbWV9PC9vcHRpb24+XG4gICAgYClcbn1cblxuY29uc3QgZ2V0UGxheWxpc3RzID0gKCkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHMnKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHBsYXlsaXN0c0RhdGEpID0+IHtcbiAgICByZXR1cm4gY29tcGlsZVBsYXlsaXN0cyhwbGF5bGlzdHNEYXRhKVxuICB9KVxuICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkpO1xufVxuXG5jb25zdCBjb21waWxlUGxheWxpc3RzID0gKHBsYXlsaXN0c0RhdGEpID0+IHtcbiAgcGxheWxpc3RzRGF0YS5mb3JFYWNoKHBsYXlsaXN0ID0+IHtcbiAgICBkaXNwbGF5UGxheWxpc3RzKHBsYXlsaXN0KTtcbiAgfSk7XG4gICQoXCIucGxheWxpc3QtdGl0bGUtbGlua1wiKS5vbihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGdldFNpbmdsZVBsYXlsaXN0KGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmlubmVyVGV4dCk7XG4gICAgJChcIi5zaW5nbGUtcGxheWxpc3QtY29udGFpbmVyXCIpLnNsaWRlRG93big1MDApO1xuICB9KVxufVxuXG5jb25zdCBkaXNwbGF5UGxheWxpc3RzID0gKHBsYXlsaXN0KSA9PiB7XG4gICQoJy5wbGF5bGlzdHMtaW5kZXgtdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cInBsYXlsaXN0cy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWlkXCI+JHtwbGF5bGlzdC5pZH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtdGl0bGVcIj48YnV0dG9uIGNsYXNzPVwicGxheWxpc3QtdGl0bGUtbGlua1wiPiR7cGxheWxpc3QucGxheWxpc3RfbmFtZX08L2J1dHRvbj48L3RkPlxuICAgIDwvdHI+YClcbn1cblxuY29uc3QgZ2V0U2luZ2xlUGxheWxpc3QgPSAoaWQpID0+IHtcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGxheWxpc3RzLyR7aWR9L3NvbmdzYClcbiAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKChzb25nc0RhdGEpID0+IHtcbiAgICByZXR1cm4gY29tcGlsZVNpbmdsZVBsYXlsaXN0KHNvbmdzRGF0YSlcbiAgfSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZVNpbmdsZVBsYXlsaXN0ID0gKHBsYXlsaXN0c0RhdGEpID0+IHtcbiAgZGVidWdnZXI7XG4gIHBsYXlsaXN0c0RhdGFbJ3NvbmdzJ10uZm9yRWFjaChzb25nID0+IHtcbiAgICBkaXNwbGF5U2luZ2xlUGxheWxpc3RTb25ncyhzb25nKVxuICB9KVxuICAgICQoXCIuc2luZ2xlLXBsYXlsaXN0LWNvbnRhaW5lclwiKS5zbGlkZURvd24oNTAwKTtcbn1cblxuY29uc3QgZGlzcGxheVNpbmdsZVBsYXlsaXN0U29uZ3MgPSAoc29uZykgPT4ge1xuICAkKCcucGxheWxpc3Qtc2hvdy10YWJsZScpLmFwcGVuZChgXG4gICAgPHRyIGNsYXNzPVwicGxheWxpc3QtdGFibGUtcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1pZFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JHtzb25nLmlkfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZS1cIj4ke3NvbmcudGl0bGV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWFydGlzdFwiPiR7c29uZy5hcnRpc3R9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWdlbnJlXCI+JHtzb25nLmdlbnJlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1yYXRpbmdcIj4ke3NvbmcucmF0aW5nfTwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG5cbmNvbnN0IGdldFBsYXlsaXN0U29uZ3MgPSAocGxheWxpc3REYXRhKSA9PiB7XG4gIGZldGNoKGBodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cy8ke3BsYXlsaXN0RGF0YS5pZH0vc29uZ3NgKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHBsYXlsaXN0RGF0YSkgPT4gY29tcGlsZVBsYXlsaXN0U29uZ3MocGxheWxpc3REYXRhLnNvbmdzKSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZVBsYXlsaXN0U29uZ3MgPSAoc29uZ3MpID0+IHtcbiAgc29uZ3MuZm9yRWFjaChzb25nID0+IHtcbiAgICBkaXNwbGF5UGxheWxpc3RTb25ncyhzb25nKTtcbiAgfSk7XG59XG5cbmNvbnN0IGRpc3BsYXlQbGF5bGlzdFNvbmdzID0gKHNvbmcpID0+IHtcbiAgJCgnLnBsYXlsaXN0LXNob3ctdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cInBsYXlsaXN0cy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXRpdGxlLVwiPiR7c29uZy50aXRsZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtYXJ0aXN0XCI+JHtzb25nLmFydGlzdH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtZ2VucmVcIj4ke3NvbmcuZ2VucmV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXJhdGluZ1wiPiR7c29uZy5yYXRpbmd9PC90ZD5cbiAgICA8L3RyPmApXG59XG5cbiQoXCIuc2VhcmNoLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgdmFyIHEgPSAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKClcbiAgZ2V0QXJ0aXN0U29uZ3MocSk7XG4gICQoXCIuc2VhcmNoLW5hdi1pbnB1dFwiKS52YWwoXCJcIilcbiAgJCgnLnNvbmctdGFibGUtcm93JykucmVtb3ZlKCk7XG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVVcCg5MDApO1xuICAkKCcuZmF2b3JpdGVzLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLnNvbmdzLWNvbnRhaW5lcicpLnNsaWRlRG93big2MDApO1xuICAkKFwiLnBsYXlsaXN0cy1jb250YWluZXJcIikuaGlkZSg1MDApO1xufSlcblxuJCgnLnNlYXJjaC1uYXYtaW5wdXQnKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuIHZhciBrZXkgPSBlLndoaWNoO1xuIGlmKGtleSA9PSAxMylcbiAge1xuICAgICQoJyNzZWFyY2gtbmF2LWJ1dHRvbicpLmNsaWNrKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KTtcblxuJChcIiNzZWFyY2gtY29udGFpbmVyLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgdmFyIHEgPSAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKCk7XG4gIGdldEFydGlzdFNvbmdzKHEpO1xuICAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zb25nLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLmZhdm9yaXRlcy1jb250YWluZXInKS5zbGlkZVVwKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5zbGlkZURvd24oNjAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoJy5zZWFyY2gtY29udGFpbmVyLWlucHV0Jykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiB2YXIga2V5ID0gZS53aGljaDtcbiBpZihrZXkgPT0gMTMpXG4gIHtcbiAgICAkKCcjc2VhcmNoLWNvbnRhaW5lci1idXR0b24nKS5jbGljaygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSk7XG5cbiQoXCIuc3Bhbi10aXRsZVwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJChcIi5mYXZvcml0ZXMtdGFibGUtcm93XCIpLnJlbW92ZSgpO1xuICAkKCcuZmF2b3JpdGVzLWNvbnRhaW5lcicpLmhpZGUoNTAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoXCIuZmFzLW5hdlwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoXCIuc29uZ3MtY29udGFpbmVyXCIpLm9uKFwiY2xpY2tcIiwgXCIuc29uZy1mYXYtYnRuXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgc29uZ0RhdGEgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzXG4gIHBvc3RGYXZvcml0ZShzb25nRGF0YSk7XG59KVxuXG4kKFwiI25hdi1mYXYtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiLmZhdm9yaXRlcy10YWJsZS1yb3dcIikucmVtb3ZlKCk7XG4gIGdldEZhdm9yaXRlU29uZ3MoKTtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG4gICQoXCIuc29uZ3MtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbiAgJChcIi5mYXZvcml0ZXMtY29udGFpbmVyXCIpLnNsaWRlRG93big5MDApO1xuICAkKFwiLnBsYXlsaXN0cy1jb250YWluZXJcIikuaGlkZSgpO1xufSlcblxuJChcIiNuYXYtcGxheWxpc3QtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBnZXRQbGF5bGlzdHMoKTtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG4gICQoXCIuc29uZ3MtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbiAgJChcIi5mYXZvcml0ZXMtY29udGFpbmVyXCIpLmhpZGUoOTAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLnNsaWRlRG93big1MDApO1xufSlcblxuJChcIiNjcmVhdGUtbmV3LXBsYXlsaXN0XCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiI2NyZWF0ZS1uZXctcGxheWxpc3RcIikuc2xpZGVVcCg5MDApO1xuICAkKFwiLnBsYXlsaXN0LW5hbWUtaW5wdXRcIikuc2xpZGVEb3duKDUwMCk7XG4gICQoXCIjY3JlYXRlLWJ1dHRvblwiKS5zbGlkZURvd24oNTAwKTtcbiAgJChcIiNjYW5jZWwtYnV0dG9uXCIpLnNsaWRlRG93big1MDApO1xufSlcblxuJChcIiNjcmVhdGUtYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB2YXIgbmFtZSA9ICQoXCIucGxheWxpc3QtbmFtZS1pbnB1dFwiKS52YWwoKVxuICBwb3N0UGxheWxpc3QobmFtZSk7XG4gICQoXCIucGxheWxpc3QtbmFtZS1pbnB1dFwiKS52YWwoXCJcIik7XG59KVxuXG4kKFwiI2NhbmNlbC1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICQoXCIjY3JlYXRlLW5ldy1wbGF5bGlzdFwiKS5zbGlkZURvd24oOTAwKTtcbiAgJChcIi5wbGF5bGlzdC1uYW1lLWlucHV0XCIpLmhpZGUoNTAwKTtcbiAgJChcIi5wbGF5bGlzdC1uYW1lLWlucHV0XCIpLnZhbChcIlwiKTtcbiAgJChcIiNjcmVhdGUtYnV0dG9uXCIpLmhpZGUoNTAwKTtcbiAgJChcIiNjYW5jZWwtYnV0dG9uXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoXCIjcGxheWxpc3QtYmFja1wiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zaW5nbGUtcGxheWxpc3QtY29udGFpbmVyXCIpLmhpZGUoKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLnNsaWRlRG93big1MDApO1xufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=