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
  console.log(songData);
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

$(".search-button").on("click", function () {
  var q = $(".search-nav-input").val();
  getArtistSongs(q);
  $(".search-nav-input").val("");
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
});
$("#search-container-button").on("click", function () {
  var q = $(".search-container-input").val();
  getArtistSongs(q);
  $(".search-container-input").val("");
  $('.song-table-row').remove();
  $('.search-container').slideUp(900);
  $('.songs-container').slideDown(600);
});
$(".span-title").on("click", function () {
  $(".search-container-input").val("");
  $(".search-nav-input").val("");
  $('.search-container').slideDown(900);
  $('.songs-container').hide(500);
  $('.songs-table-row').remove();
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldEFydGlzdFNvbmdzIiwicSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcnNlZFJlc3BvbnNlIiwiY29tcGlsZUFydGlzdFNvbmdzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJhcnRpc3REYXRhIiwiZm9yRWFjaCIsInNvbmciLCJkaXNwbGF5QXJ0aXN0U29uZ3MiLCIkIiwiYXBwZW5kIiwidGl0bGUiLCJhcnRpc3QiLCJnZW5yZSIsInJhdGluZyIsInBvc3RGYXZvcml0ZSIsInNvbmdEYXRhIiwibG9nIiwiaW5uZXJUZXh0Iiwib24iLCJ2YWwiLCJyZW1vdmUiLCJzbGlkZVVwIiwic2xpZGVEb3duIiwiaGlkZSIsInBhcmVudEVsZW1lbnQiLCJjaGlsZE5vZGVzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFB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QUFDRCxDQU5EO0FBUUFaLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxlQUFsQyxFQUFtRCxZQUFXO0FBQzVELE1BQUlILFFBQVEsR0FBRyxLQUFLUyxhQUFMLENBQW1CQSxhQUFuQixDQUFpQ0MsVUFBaEQ7QUFDQVgsY0FBWSxDQUFDQyxRQUFELENBQVo7QUFDRCxDQUhELEUiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2xpYi9pbmRleC5qc1wiKTtcbiIsImNvbnN0IGdldEFydGlzdFNvbmdzID0gKHEpID0+IHtcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLXBsYXkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvc2VhcmNoYCwge1xuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICdhcnRpc3QnOiBxXG4gICAgfSlcbiAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4ocGFyc2VkUmVzcG9uc2UgPT4gY29tcGlsZUFydGlzdFNvbmdzKHBhcnNlZFJlc3BvbnNlKSlcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pKTtcbn1cblxuY29uc3QgY29tcGlsZUFydGlzdFNvbmdzID0gKGFydGlzdERhdGEpID0+IHtcbiAgYXJ0aXN0RGF0YS5mb3JFYWNoKHNvbmcgPT4ge1xuICAgIGRpc3BsYXlBcnRpc3RTb25ncyhzb25nKTtcbiAgfSk7XG59XG5cbmNvbnN0IGRpc3BsYXlBcnRpc3RTb25ncyA9IChzb25nKSA9PiB7XG4gICQoJy5zb25ncy1pbmRleC10YWJsZScpLmFwcGVuZChgXG4gICAgPHRyIGNsYXNzPVwic29uZy10YWJsZS1yb3dcIj5cbiAgICAgIDx0ZCBjbGFzcz1cInNvbmctY2VsbFwiPjxidXR0b24gY2xhc3M9XCJzb25nLXJvdyBzb25nLWZhdi1idG5cIiB0eXBlPVwiYnV0dG9uXCI+RmF2b3JpdGU8L2J1dHRvbj48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtdGl0bGUtXCI+JHtzb25nLnRpdGxlfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1hcnRpc3RcIj4ke3NvbmcuYXJ0aXN0fTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJzb25nLWNlbGxcIiBpZD1cInNvbmctY2VsbC1nZW5yZVwiPiR7c29uZy5nZW5yZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwic29uZy1jZWxsXCIgaWQ9XCJzb25nLWNlbGwtcmF0aW5nXCI+JHtzb25nLnJhdGluZ308L3RkPlxuICAgIDwvdHI+YClcbn1cblxuY29uc3QgcG9zdEZhdm9yaXRlID0gKHNvbmdEYXRhKSA9PiB7XG4gIGNvbnNvbGUubG9nKHNvbmdEYXRhKVxuICBmZXRjaCgnaHR0cHM6Ly9hcGktcGxheS5oZXJva3VhcHAuY29tL2FwaS92MS9zb25ncycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB0aXRsZTogc29uZ0RhdGFbM10uaW5uZXJUZXh0LFxuICAgICAgYXJ0aXN0OiBzb25nRGF0YVs1XS5pbm5lclRleHQsXG4gICAgICBnZW5yZTogc29uZ0RhdGFbN10uaW5uZXJUZXh0LFxuICAgICAgcmF0aW5nOiBzb25nRGF0YVs5XS5pbm5lclRleHRcbiAgICB9KVxuICB9KTtcbn1cblxuJChcIi5zZWFyY2gtYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB2YXIgcSA9ICQoXCIuc2VhcmNoLW5hdi1pbnB1dFwiKS52YWwoKVxuICBnZXRBcnRpc3RTb25ncyhxKTtcbiAgJChcIi5zZWFyY2gtbmF2LWlucHV0XCIpLnZhbChcIlwiKVxuICAkKCcuc29uZy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJCgnLnNlYXJjaC1jb250YWluZXInKS5zbGlkZVVwKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5zbGlkZURvd24oNjAwKTtcbn0pXG5cbiQoXCIjc2VhcmNoLWNvbnRhaW5lci1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gIHZhciBxID0gJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbCgpO1xuICBnZXRBcnRpc3RTb25ncyhxKTtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKCcuc29uZy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbiAgJCgnLnNlYXJjaC1jb250YWluZXInKS5zbGlkZVVwKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5zbGlkZURvd24oNjAwKTtcbn0pXG5cbiQoXCIuc3Bhbi10aXRsZVwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbn0pXG5cbiQoXCIuZmFzLW5hdlwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgJChcIi5zZWFyY2gtY29udGFpbmVyLWlucHV0XCIpLnZhbChcIlwiKVxuICAkKFwiLnNlYXJjaC1uYXYtaW5wdXRcIikudmFsKFwiXCIpXG4gICQoJy5zZWFyY2gtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4gICQoJy5zb25ncy1jb250YWluZXInKS5oaWRlKDUwMCk7XG4gICQoJy5zb25ncy10YWJsZS1yb3cnKS5yZW1vdmUoKTtcbn0pXG5cbiQoXCIuc29uZ3MtY29udGFpbmVyXCIpLm9uKFwiY2xpY2tcIiwgXCIuc29uZy1mYXYtYnRuXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgc29uZ0RhdGEgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzXG4gIHBvc3RGYXZvcml0ZShzb25nRGF0YSk7XG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==