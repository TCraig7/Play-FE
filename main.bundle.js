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
  $('.favorites-index-table').append("\n    <tr class=\"favorites-table-row\">\n      <td class=\"song-cell\"><button class=\"song-row song-fav-btn\" type=\"button\">Add To Playlist</button></td>\n      <td class=\"song-cell\" id=\"song-cell-id\" style=\"display:none\">".concat(song.id, "</td>\n      <td class=\"song-cell\" id=\"song-cell-title-\">").concat(song.title, "</td>\n      <td class=\"song-cell\" id=\"song-cell-artist\">").concat(song.artist, "</td>\n      <td class=\"song-cell\" id=\"song-cell-genre\">").concat(song.genre, "</td>\n      <td class=\"song-cell\" id=\"song-cell-rating\">").concat(song.rating, "</td>\n    </tr>"));
};

$(".search-button").on("click", function () {
  var q = $(".search-nav-input").val();
  getArtistSongs(q);
  $(".search-nav-input").val("");
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
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
  $('.songs-container').slideDown(600);
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
  $('.favorites-container').hide(500);
});
$(".fas-nav").on("click", function () {
  $(".search-container-input").val("");
  $(".search-nav-input").val("");
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
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
  $('.search-container').hide(500);
  $('.songs-container').hide(500);
  $('.favorites-container').slideDown(900);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGlzdFNvbmdzIiwicSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcnNlZFJlc3BvbnNlIiwiY29tcGlsZUFydGlzdFNvbmdzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJhcnRpc3REYXRhIiwiZm9yRWFjaCIsInNvbmciLCJkaXNwbGF5QXJ0aXN0U29uZ3MiLCIkIiwiYXBwZW5kIiwidGl0bGUiLCJhcnRpc3QiLCJnZW5yZSIsInJhdGluZyIsInBvc3RGYXZvcml0ZSIsInNvbmdEYXRhIiwiaW5uZXJUZXh0IiwiZ2V0RmF2b3JpdGVTb25ncyIsInNvbmdzRGF0YSIsImNvbXBpbGVGYXZvcml0ZVNvbmdzIiwiZGlzcGxheUZhdm9yaXRlU29uZ3MiLCJpZCIsIm9uIiwidmFsIiwicmVtb3ZlIiwic2xpZGVVcCIsInNsaWRlRG93biIsImtleXByZXNzIiwiZSIsImtleSIsIndoaWNoIiwiY2xpY2siLCJoaWRlIiwicGFyZW50RWxlbWVudCIsImNoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCa0IsU0FBMUIsQ0FBb0MsR0FBcEM7QUFDRCxDQVJELEUiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2xpYi9pbmRleC5qc1wiKTtcbiIsImNvbnN0IGdldEFydGlzdFNvbmdzID0gKHEpID0+IHtcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvc2VhcmNoYCwge1xuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICdhcnRpc3QnOiBxXG4gICAgfSlcbiAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4ocGFyc2VkUmVzcG9uc2UgPT4gY29tcGlsZUFydGlzdFNvbmdzKHBhcnNlZFJlc3BvbnNlKSlcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZUFydGlzdFNvbmdzID0gKGFydGlzdERhdGEpID0+IHtcbiAgYXJ0aXN0RGF0YS5mb3JFYWNoKHNvbmcgPT4ge1xuICAgIGRpc3BsYXlBcnRpc3RTb25ncyhzb25nKTtcbiAgfSk7XG59XG5cbmNvbnN0IGRpc3BsYXlBcnRpc3RTb25ncyA9IChzb25nKSA9PiB7XG4gICQoJy5zb25ncy1pbmRleC10YWJsZScpLmFwcGVuZChgXG4gICAgPHRyIGNsYXNzPVwic29uZy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiPjxidXR0b24gY2xhc3M9XCJzb25nLXJvdyBzb25nLWZhdi1idG5cIiB0eXBlPVwiYnV0dG9uXCI+RmF2b3JpdGU8L2J1dHRvbj48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtdGl0bGUtXCI+JHtzb25nLnRpdGxlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1hcnRpc3RcIj4ke3NvbmcuYXJ0aXN0fTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1nZW5yZVwiPiR7c29uZy5nZW5yZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtcmF0aW5nXCI+JHtzb25nLnJhdGluZ308L3RkPlxuICAgIDwvdHI+YClcbn1cblxuY29uc3QgcG9zdEZhdm9yaXRlID0gKHNvbmdEYXRhKSA9PiB7XG4gIGZldGNoKCdodHRwczovL2FwaS1wbGF5Lmhlcm9rdWFwcC5jb20vYXBpL3YxL3NvbmdzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHRpdGxlOiBzb25nRGF0YVszXS5pbm5lclRleHQsXG4gICAgICBhcnRpc3Q6IHNvbmdEYXRhWzVdLmlubmVyVGV4dCxcbiAgICAgIGdlbnJlOiBzb25nRGF0YVs3XS5pbm5lclRleHQsXG4gICAgICByYXRpbmc6IHNvbmdEYXRhWzldLmlubmVyVGV4dFxuICAgIH0pXG4gIH0pO1xufVxuXG5jb25zdCBnZXRGYXZvcml0ZVNvbmdzID0gKCkgPT4ge1xuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9mYXZvcml0ZXMnKVxuICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oKHNvbmdzRGF0YSkgPT4gY29tcGlsZUZhdm9yaXRlU29uZ3Moc29uZ3NEYXRhKSlcbiAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZUZhdm9yaXRlU29uZ3MgPSAoc29uZ3NEYXRhKSA9PiB7XG4gIHNvbmdzRGF0YS5mb3JFYWNoKHNvbmcgPT4ge1xuICAgIGRpc3BsYXlGYXZvcml0ZVNvbmdzKHNvbmcpO1xuICB9KTtcbn1cblxuY29uc3QgZGlzcGxheUZhdm9yaXRlU29uZ3MgPSAoc29uZykgPT4ge1xuICAkKCcuZmF2b3JpdGVzLWluZGV4LXRhYmxlJykuYXBwZW5kKGBcbiAgICA8dHIgY2xhc3M9XCJmYXZvcml0ZXMtdGFibGUtcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIj48YnV0dG9uIGNsYXNzPVwic29uZy1yb3cgc29uZy1mYXYtYnRuXCIgdHlwZT1cImJ1dHRvblwiPkFkZCBUbyBQbGF5bGlzdDwvYnV0dG9uPjwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1pZFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JHtzb25nLmlkfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC10aXRsZS1cIj4ke3NvbmcudGl0bGV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWFydGlzdFwiPiR7c29uZy5hcnRpc3R9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiIGlkPVwic29uZy1jZWxsLWdlbnJlXCI+JHtzb25nLmdlbnJlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1yYXRpbmdcIj4ke3NvbmcucmF0aW5nfTwvdGQ+XG4gICAgPC90cj5gKVxufVxuXG4kKFwiLnNlYXJjaC1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gIHZhciBxID0gJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbCgpXG4gIGdldEFydGlzdFNvbmdzKHEpO1xuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zb25nLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLnNvbmdzLWNvbnRhaW5lcicpLnNsaWRlRG93big2MDApO1xufSlcblxuJCgnLnNlYXJjaC1uYXYtaW5wdXQnKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuIHZhciBrZXkgPSBlLndoaWNoO1xuIGlmKGtleSA9PSAxMylcbiAge1xuICAgICQoJyNzZWFyY2gtbmF2LWJ1dHRvbicpLmNsaWNrKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KTtcblxuJChcIiNzZWFyY2gtY29udGFpbmVyLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgdmFyIHEgPSAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKCk7XG4gIGdldEFydGlzdFNvbmdzKHEpO1xuICAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zb25nLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xuICAkKCcuc2VhcmNoLWNvbnRhaW5lcicpLnNsaWRlVXAoOTAwKTtcbiAgJCgnLnNvbmdzLWNvbnRhaW5lcicpLnNsaWRlRG93big2MDApO1xufSlcblxuJCgnLnNlYXJjaC1jb250YWluZXItaW5wdXQnKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuIHZhciBrZXkgPSBlLndoaWNoO1xuIGlmKGtleSA9PSAxMylcbiAge1xuICAgICQoJyNzZWFyY2gtY29udGFpbmVyLWJ1dHRvbicpLmNsaWNrKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KTtcblxuJChcIi5zcGFuLXRpdGxlXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLW5hdi1pbnB1dFwiKS52YWwoXCJcIilcbiAgJCgnLnNlYXJjaC1jb250YWluZXInKS5zbGlkZURvd24oOTAwKTtcbiAgJCgnLnNvbmdzLWNvbnRhaW5lcicpLmhpZGUoNTAwKTtcbiAgJCgnLnNvbmdzLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xuICAkKCcuZmF2b3JpdGVzLWNvbnRhaW5lcicpLmhpZGUoNTAwKVxufSlcblxuJChcIi5mYXMtbmF2XCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLW5hdi1pbnB1dFwiKS52YWwoXCJcIilcbiAgJCgnLnNlYXJjaC1jb250YWluZXInKS5zbGlkZURvd24oOTAwKTtcbiAgJCgnLnNvbmdzLWNvbnRhaW5lcicpLmhpZGUoNTAwKTtcbiAgJCgnLnNvbmdzLXRhYmxlLXJvdycpLnJlbW92ZSgpO1xufSlcblxuJChcIi5zb25ncy1jb250YWluZXJcIikub24oXCJjbGlja1wiLCBcIi5zb25nLWZhdi1idG5cIiwgZnVuY3Rpb24oKSB7XG4gIHZhciBzb25nRGF0YSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNcbiAgcG9zdEZhdm9yaXRlKHNvbmdEYXRhKTtcbn0pXG5cbiQoXCIjbmF2LWZhdi1idG5cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICQoXCIuZmF2b3JpdGVzLXRhYmxlLXJvd1wiKS5yZW1vdmUoKTtcbiAgZ2V0RmF2b3JpdGVTb25ncygpO1xuICAkKFwiLnNlYXJjaC1jb250YWluZXItaW5wdXRcIikudmFsKFwiXCIpXG4gICQoXCIuc2VhcmNoLW5hdi1pbnB1dFwiKS52YWwoXCJcIilcbiAgJCgnLnNlYXJjaC1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5mYXZvcml0ZXMtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMClcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9