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
  $(".fav-dropdown").append("\n    <option id=\"".concat(playist.id, "\">").concat(playlist.name, "</option>\n    "));
};

var getPlaylists = function getPlaylists() {
  fetch('https://api-play.herokuapp.com/api/v1/playlists').then(function (response) {
    return response.json();
  }).then(function (playlistsData) {
    console.log(playlistsData);
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
};

var displayPlaylists = function displayPlaylists(playlist) {
  console.log("PLAYLIST: ", playlist);
  $('.playlists-index-table').append("\n    <tr class=\"playlists-table-row\">\n      <td class=\"song-cell\" id=\"song-cell-id\">".concat(playlist.id, "</td>\n      <td class=\"song-cell\" id=\"song-cell-title-\"><button class=\"playlist-title-link\">").concat(playlist.playlist_name, "</button></td>\n    </tr>"));
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
$(".add-song-button").on("click", function (event) {
  var playlist = event.currentTarget.parentElement.parentElement.children[0].children[0].value;
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGlzdFNvbmdzIiwicSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcnNlZFJlc3BvbnNlIiwiY29tcGlsZUFydGlzdFNvbmdzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJhcnRpc3REYXRhIiwiZm9yRWFjaCIsInNvbmciLCJkaXNwbGF5QXJ0aXN0U29uZ3MiLCIkIiwiYXBwZW5kIiwidGl0bGUiLCJhcnRpc3QiLCJnZW5yZSIsInJhdGluZyIsInBvc3RGYXZvcml0ZSIsInNvbmdEYXRhIiwiaW5uZXJUZXh0IiwicG9zdFBsYXlsaXN0IiwicGxheWxpc3REYXRhIiwibmFtZSIsImdldEZhdm9yaXRlU29uZ3MiLCJzb25nc0RhdGEiLCJjb21waWxlRmF2b3JpdGVTb25ncyIsImRpc3BsYXlGYXZvcml0ZVNvbmdzIiwiaWQiLCJnZXRQbGF5bGlzdHNEcm9wZG93biIsInBsYXlsaXN0c0RhdGEiLCJjb21waWxlUGxheWxpc3RzRHJvcGRvd24iLCJwbGF5bGlzdCIsImZpbGxQbGF5bGlzdERyb3Bkb3duIiwicGxheWlzdCIsImdldFBsYXlsaXN0cyIsImxvZyIsImNvbXBpbGVQbGF5bGlzdHMiLCJkaXNwbGF5UGxheWxpc3RzIiwicGxheWxpc3RfbmFtZSIsImdldFBsYXlsaXN0U29uZ3MiLCJjb21waWxlUGxheWxpc3RTb25ncyIsInNvbmdzIiwiZGlzcGxheVBsYXlsaXN0U29uZ3MiLCJvbiIsInZhbCIsInJlbW92ZSIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJoaWRlIiwia2V5cHJlc3MiLCJlIiwia2V5Iiwid2hpY2giLCJjbGljayIsInBhcmVudEVsZW1lbnQiLCJjaGlsZE5vZGVzIiwiZXZlbnQiLCJjdXJyZW50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Q3BDaEMsR0FBQyxDQUFDLDRCQUFELENBQUQsQ0FBZ0NxQyxJQUFoQztBQUNBckMsR0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJvQyxTQUExQixDQUFvQyxHQUFwQztBQUNELENBSEQ7QUFLQXBDLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCZ0MsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsVUFBQ2EsS0FBRCxFQUFXO0FBQzNDLE1BQUl6QixRQUFRLEdBQUd5QixLQUFLLENBQUNDLGFBQU4sQ0FBb0JILGFBQXBCLENBQWtDQSxhQUFsQyxDQUFnREksUUFBaEQsQ0FBeUQsQ0FBekQsRUFBNERBLFFBQTVELENBQXFFLENBQXJFLEVBQXdFQyxLQUF2RjtBQUNELENBRkQsRSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbGliL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgZ2V0QXJ0aXN0U29uZ3MgPSAocSkgPT4ge1xuICBmZXRjaChgaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9zZWFyY2hgLCB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgJ2FydGlzdCc6IHFcbiAgICB9KVxuICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiBjb21waWxlQXJ0aXN0U29uZ3MocGFyc2VkUmVzcG9uc2UpKVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkpO1xufVxuXG5jb25zdCBjb21waWxlQXJ0aXN0U29uZ3MgPSAoYXJ0aXN0RGF0YSkgPT4ge1xuICBhcnRpc3REYXRhLmZvckVhY2goc29uZyA9PiB7XG4gICAgZGlzcGxheUFydGlzdFNvbmdzKHNvbmcpO1xuICB9KTtcbn1cblxuY29uc3QgZGlzcGxheUFydGlzdFNvbmdzID0gKHNvbmcpID0+IHtcbiAgJCgnLnNvbmdzLWluZGV4LXRhYmxlJykuYXBwZW5kKGBcbiAgICA8dHIgY2xhc3M9XCJzb25nLXRhYmxlLXJvd1wiPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCI+PGJ1dHRvbiBjbGFzcz1cInNvbmctcm93IHNvbmctZmF2LWJ0blwiIHR5cGU9XCJidXR0b25cIj5GYXZvcml0ZTwvYnV0dG9uPjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZS1cIj4ke3NvbmcudGl0bGV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWFydGlzdFwiPiR7c29uZy5hcnRpc3R9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWdlbnJlXCI+JHtzb25nLmdlbnJlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1yYXRpbmdcIj4ke3NvbmcucmF0aW5nfTwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG5jb25zdCBwb3N0RmF2b3JpdGUgPSAoc29uZ0RhdGEpID0+IHtcbiAgZmV0Y2goJ2h0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvc29uZ3MnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgdGl0bGU6IHNvbmdEYXRhWzNdLmlubmVyVGV4dCxcbiAgICAgIGFydGlzdDogc29uZ0RhdGFbNV0uaW5uZXJUZXh0LFxuICAgICAgZ2VucmU6IHNvbmdEYXRhWzddLmlubmVyVGV4dCxcbiAgICAgIHJhdGluZzogc29uZ0RhdGFbOV0uaW5uZXJUZXh0XG4gICAgfSlcbiAgfSk7XG59XG5cbmNvbnN0IHBvc3RQbGF5bGlzdCA9IChwbGF5bGlzdERhdGEpID0+IHtcbiAgZmV0Y2goJ2h0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGxheWxpc3RzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IHBsYXlsaXN0RGF0YVxuICAgIH0pXG4gIH0pO1xufVxuXG5jb25zdCBnZXRGYXZvcml0ZVNvbmdzID0gKCkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9mYXZvcml0ZXMnKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHNvbmdzRGF0YSkgPT4gY29tcGlsZUZhdm9yaXRlU29uZ3Moc29uZ3NEYXRhKSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZUZhdm9yaXRlU29uZ3MgPSAoc29uZ3NEYXRhKSA9PiB7XG4gIHNvbmdzRGF0YS5mb3JFYWNoKHNvbmcgPT4ge1xuICAgIGRpc3BsYXlGYXZvcml0ZVNvbmdzKHNvbmcpO1xuICB9KTtcbn1cblxuY29uc3QgZGlzcGxheUZhdm9yaXRlU29uZ3MgPSAoc29uZykgPT4ge1xuICAkKCcuZmF2b3JpdGVzLWluZGV4LXRhYmxlJykuYXBwZW5kKGBcbiAgICA8dHIgY2xhc3M9XCJmYXZvcml0ZXMtdGFibGUtcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIj48c2VsZWN0IGNsYXNzPVwiZmF2LWRyb3Bkb3duXCI+PHNlbGVjdD48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCI+PGJ1dHRvbiBjbGFzcz1cInNvbmctcm93IHNvbmctZmF2LWJ0biBhZGQtc29uZy1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+QWRkIFRvIFBsYXlsaXN0PC9idXR0b24+PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWlkXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4ke3NvbmcuaWR9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXRpdGxlLVwiPiR7c29uZy50aXRsZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtYXJ0aXN0XCI+JHtzb25nLmFydGlzdH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtZ2VucmVcIj4ke3NvbmcuZ2VucmV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXJhdGluZ1wiPiR7c29uZy5yYXRpbmd9PC90ZD5cbiAgICA8L3RyPmApXG59XG5cbmNvbnN0IGdldFBsYXlsaXN0c0Ryb3Bkb3duID0gKCkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHMnKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHBsYXlsaXN0c0RhdGEpID0+IGNvbXBpbGVQbGF5bGlzdHNEcm9wZG93bihwbGF5bGlzdHNEYXRhKSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZVBsYXlsaXN0c0Ryb3Bkb3duID0gKHBsYXlsaXN0c0RhdGEpID0+IHtcbiAgcGxheWxpc3RzRGF0YS5mb3JFYWNoKHBsYXlsaXN0ID0+IHtcbiAgICBmaWxsUGxheWxpc3REcm9wZG93bihwbGF5bGlzdCk7XG4gIH0pO1xufVxuXG5jb25zdCBmaWxsUGxheWxpc3REcm9wZG93biA9IChwbGF5bGlzdCkgPT4ge1xuICAkKFwiLmZhdi1kcm9wZG93blwiKS5hcHBlbmQoYFxuICAgIDxvcHRpb24gaWQ9XCIke3BsYXlpc3QuaWR9XCI+JHtwbGF5bGlzdC5uYW1lfTwvb3B0aW9uPlxuICAgIGApXG59XG5cbmNvbnN0IGdldFBsYXlsaXN0cyA9ICgpID0+IHtcbiAgZmV0Y2goJ2h0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGxheWxpc3RzJylcbiAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKChwbGF5bGlzdHNEYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGxheWxpc3RzRGF0YSk7XG4gICAgcmV0dXJuIGNvbXBpbGVQbGF5bGlzdHMocGxheWxpc3RzRGF0YSlcbiAgfSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZVBsYXlsaXN0cyA9IChwbGF5bGlzdHNEYXRhKSA9PiB7XG4gIHBsYXlsaXN0c0RhdGEuZm9yRWFjaChwbGF5bGlzdCA9PiB7XG4gICAgZGlzcGxheVBsYXlsaXN0cyhwbGF5bGlzdCk7XG4gIH0pO1xufVxuXG5jb25zdCBkaXNwbGF5UGxheWxpc3RzID0gKHBsYXlsaXN0KSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiUExBWUxJU1Q6IFwiLCBwbGF5bGlzdCk7XG4gICQoJy5wbGF5bGlzdHMtaW5kZXgtdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cInBsYXlsaXN0cy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWlkXCI+JHtwbGF5bGlzdC5pZH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtdGl0bGUtXCI+PGJ1dHRvbiBjbGFzcz1cInBsYXlsaXN0LXRpdGxlLWxpbmtcIj4ke3BsYXlsaXN0LnBsYXlsaXN0X25hbWV9PC9idXR0b24+PC90ZD5cbiAgICA8L3RyPmApXG59XG5cbmNvbnN0IGdldFBsYXlsaXN0U29uZ3MgPSAocGxheWxpc3REYXRhKSA9PiB7XG4gIGZldGNoKGBodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cy8ke3BsYXlsaXN0RGF0YS5pZH0vc29uZ3NgKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHBsYXlsaXN0RGF0YSkgPT4gY29tcGlsZVBsYXlsaXN0U29uZ3MocGxheWxpc3REYXRhLnNvbmdzKSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZVBsYXlsaXN0U29uZ3MgPSAoc29uZ3MpID0+IHtcbiAgc29uZ3MuZm9yRWFjaChzb25nID0+IHtcbiAgICBkaXNwbGF5UGxheWxpc3RTb25ncyhzb25nKTtcbiAgfSk7XG59XG5cbmNvbnN0IGRpc3BsYXlQbGF5bGlzdFNvbmdzID0gKHNvbmcpID0+IHtcbiAgJCgnLnBsYXlsaXN0LXNob3ctdGFibGUnKS5hcHBlbmQoYFxuICAgIDx0ciBjbGFzcz1cInBsYXlsaXN0cy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXRpdGxlLVwiPiR7c29uZy50aXRsZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtYXJ0aXN0XCI+JHtzb25nLmFydGlzdH08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtZ2VucmVcIj4ke3NvbmcuZ2VucmV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLXJhdGluZ1wiPiR7c29uZy5yYXRpbmd9PC90ZD5cbiAgICA8L3RyPmApXG59XG5cbiQoXCIuc2VhcmNoLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgdmFyIHEgPSAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKClcbiAgZ2V0QXJ0aXN0U29uZ3MocSk7XG4gICQoXCIuc2VhcmNoLW5hdi1pbnB1dFwiKS52YWwoXCJcIilcbiAgJCgnLnNvbmctdGFibGUtcm93JykucmVtb3ZlKCk7XG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVVcCg5MDApO1xuICAkKCcuZmF2b3JpdGVzLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLnNvbmdzLWNvbnRhaW5lcicpLnNsaWRlRG93big2MDApO1xuICAkKFwiLnBsYXlsaXN0cy1jb250YWluZXJcIikuaGlkZSg1MDApO1xufSlcblxuJCgnLnNlYXJjaC1uYXYtaW5wdXQnKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuIHZhciBrZXkgPSBlLndoaWNoO1xuIGlmKGtleSA9PSAxMylcbiAge1xuICAgICQoJyNzZWFyY2gtbmF2LWJ1dHRvbicpLmNsaWNrKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KTtcblxuJChcIiNzZWFyY2gtY29udGFpbmVyLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgdmFyIHEgPSAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKCk7XG4gIGdldEFydGlzdFNvbmdzKHEpO1xuICAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zb25nLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLmZhdm9yaXRlcy1jb250YWluZXInKS5zbGlkZVVwKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5zbGlkZURvd24oNjAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoJy5zZWFyY2gtY29udGFpbmVyLWlucHV0Jykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiB2YXIga2V5ID0gZS53aGljaDtcbiBpZihrZXkgPT0gMTMpXG4gIHtcbiAgICAkKCcjc2VhcmNoLWNvbnRhaW5lci1idXR0b24nKS5jbGljaygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSk7XG5cbiQoXCIuc3Bhbi10aXRsZVwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJChcIi5mYXZvcml0ZXMtdGFibGUtcm93XCIpLnJlbW92ZSgpO1xuICAkKCcuZmF2b3JpdGVzLWNvbnRhaW5lcicpLmhpZGUoNTAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoXCIuZmFzLW5hdlwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoXCIuc29uZ3MtY29udGFpbmVyXCIpLm9uKFwiY2xpY2tcIiwgXCIuc29uZy1mYXYtYnRuXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgc29uZ0RhdGEgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzXG4gIHBvc3RGYXZvcml0ZShzb25nRGF0YSk7XG59KVxuXG4kKFwiI25hdi1mYXYtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiLmZhdm9yaXRlcy10YWJsZS1yb3dcIikucmVtb3ZlKCk7XG4gIGdldEZhdm9yaXRlU29uZ3MoKTtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG4gICQoXCIuc29uZ3MtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbiAgJChcIi5mYXZvcml0ZXMtY29udGFpbmVyXCIpLnNsaWRlRG93big5MDApO1xuICAkKFwiLnBsYXlsaXN0cy1jb250YWluZXJcIikuaGlkZSgpO1xufSlcblxuJChcIiNuYXYtcGxheWxpc3QtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBnZXRQbGF5bGlzdHMoKTtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLWNvbnRhaW5lclwiKS5oaWRlKDUwMCk7XG4gICQoXCIuc29uZ3MtY29udGFpbmVyXCIpLmhpZGUoNTAwKTtcbiAgJChcIi5mYXZvcml0ZXMtY29udGFpbmVyXCIpLmhpZGUoOTAwKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLnNsaWRlRG93big1MDApO1xufSlcblxuJChcIiNjcmVhdGUtbmV3LXBsYXlsaXN0XCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiI2NyZWF0ZS1uZXctcGxheWxpc3RcIikuc2xpZGVVcCg5MDApO1xuICAkKFwiLnBsYXlsaXN0LW5hbWUtaW5wdXRcIikuc2xpZGVEb3duKDUwMCk7XG4gICQoXCIjY3JlYXRlLWJ1dHRvblwiKS5zbGlkZURvd24oNTAwKTtcbiAgJChcIiNjYW5jZWwtYnV0dG9uXCIpLnNsaWRlRG93big1MDApO1xufSlcblxuJChcIiNjcmVhdGUtYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB2YXIgbmFtZSA9ICQoXCIucGxheWxpc3QtbmFtZS1pbnB1dFwiKS52YWwoKVxuICBwb3N0UGxheWxpc3QobmFtZSk7XG4gICQoXCIucGxheWxpc3QtbmFtZS1pbnB1dFwiKS52YWwoXCJcIik7XG59KVxuXG4kKFwiI2NhbmNlbC1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICQoXCIjY3JlYXRlLW5ldy1wbGF5bGlzdFwiKS5zbGlkZURvd24oOTAwKTtcbiAgJChcIi5wbGF5bGlzdC1uYW1lLWlucHV0XCIpLmhpZGUoNTAwKTtcbiAgJChcIi5wbGF5bGlzdC1uYW1lLWlucHV0XCIpLnZhbChcIlwiKTtcbiAgJChcIiNjcmVhdGUtYnV0dG9uXCIpLmhpZGUoNTAwKTtcbiAgJChcIiNjYW5jZWwtYnV0dG9uXCIpLmhpZGUoNTAwKTtcbn0pXG5cbiQoXCIjcGxheWxpc3QtYmFja1wiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zaW5nbGUtcGxheWxpc3QtY29udGFpbmVyXCIpLmhpZGUoKTtcbiAgJChcIi5wbGF5bGlzdHMtY29udGFpbmVyXCIpLnNsaWRlRG93big1MDApO1xufSlcblxuJChcIi5hZGQtc29uZy1idXR0b25cIikub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgdmFyIHBsYXlsaXN0ID0gZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0udmFsdWVcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9